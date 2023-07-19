import { CardStackPlusIcon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'
import {
  addBookmark,
  editBookmark,
  removeBookmark,
  selectBookmarks,
} from '../../../store/bookmarkSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { Bookmark, BookmarkForm } from './Components'
import type { IBookmark } from './types'
import styles from './index.module.scss'
import { Modal } from '../../Modal'

export const Bookmarks = () => {
  const dispatch = useAppDispatch()
  const bookmarks = useAppSelector(state => selectBookmarks(state))

  const [modalOpen, setModalOpen] = useState(false)
  const [editableBookmark, setEditableBookmark] = useState<
    IBookmark | undefined
  >(undefined)
  const [formType, setFormType] = useState<'edit' | 'create'>('create')

  const bookmarkContainer = useRef<HTMLDivElement>(null)
  const [bookmarksGridGapSize, setBookmarksGridGapSize] = useState('32px')

  useEffect(() => {
    const calculateGapSize = () => {
      if (!bookmarkContainer.current) return
      const bookmarkSize = 200
      const minGap = 20
      const maxRowGap = 40

      const containerWidth = bookmarkContainer.current.clientWidth
      const availableNumberOfBookmarks = Math.floor(
        (containerWidth + minGap) / (bookmarkSize + minGap),
      )
      const availableSpaceForGaps =
        containerWidth - availableNumberOfBookmarks * bookmarkSize
      const singleGapSize = Math.floor(
        availableSpaceForGaps / (availableNumberOfBookmarks - 1),
      )

      const rowGap = singleGapSize > maxRowGap ? maxRowGap : singleGapSize
      const colGap = singleGapSize

      setBookmarksGridGapSize(`${rowGap}px ${colGap}px`)
    }

    calculateGapSize()
    window.addEventListener('resize', calculateGapSize)

    return () => {
      window.removeEventListener('resize', calculateGapSize)
    }
  }, [])

  const openModalForCreatingBookmark = () => {
    setFormType('create')
    setEditableBookmark(undefined)
    setModalOpen(true)
  }
  const openModalForEditingBookmark = (bookmarkId: string) => {
    setFormType('edit')
    setEditableBookmark(bookmarks.find(e => e.id === bookmarkId))
    setModalOpen(true)
  }

  const createBookmarkHandler = (bookmarkState: IBookmark) => {
    dispatch(addBookmark(bookmarkState))
    setEditableBookmark(undefined)
    setModalOpen(false)
  }

  const editBookmarkHandler = (bookmarkState: IBookmark) => {
    dispatch(editBookmark(bookmarkState))
    setEditableBookmark(undefined)
    setModalOpen(false)
  }

  const removeBookmarkHandler = (bookmarkId: string) => {
    dispatch(removeBookmark(bookmarkId))
    setEditableBookmark(undefined)
    setModalOpen(false)
  }

  const mapFormTypeToHandler = {
    create: createBookmarkHandler,
    edit: editBookmarkHandler,
  }

  return (
    <div
      className={styles.bookmarks}
      ref={bookmarkContainer}
      style={{ gap: bookmarksGridGapSize }}
    >
      {bookmarks.map(
        ({ id, mainHref, mainImageUrl, mainImageSize, dropdownLinks }) => (
          <Bookmark
            id={id}
            key={id}
            mainHref={mainHref}
            mainImageUrl={mainImageUrl}
            mainImageSize={mainImageSize}
            dropdownLinks={dropdownLinks}
            editBookmarkHandler={openModalForEditingBookmark}
          />
        ),
      )}
      <button
        className={styles.addNewBookmark}
        onClick={openModalForCreatingBookmark}
      >
        <CardStackPlusIcon />
        <span>New bookmark</span>
      </button>
      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <BookmarkForm
          initialState={editableBookmark}
          formType={formType}
          submitHandler={mapFormTypeToHandler[formType]}
          removeBookmarkHandler={removeBookmarkHandler}
        />
      </Modal>
    </div>
  )
}
