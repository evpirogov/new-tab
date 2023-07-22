import { Pencil2Icon } from '@radix-ui/react-icons'
import { selectMode } from '../../../../store/modeSlice'
import { useAppSelector } from '../../../../hooks'
import { IBookmark } from '../types'
import styles from './index.module.scss'

interface IProps extends IBookmark {
  editBookmarkHandler: (bookmarkId: string) => void
}

export const Bookmark = ({
  id,
  mainHref,
  mainImageUrl,
  mainImageSize,
  dropdownLinks,
  editBookmarkHandler,
}: IProps) => {
  const { editMode } = useAppSelector(state => selectMode(state))

  const editBookmark = () => {
    editBookmarkHandler(id)
  }

  const bookmarkStyle = {
    backgroundImage: `url(${mainImageUrl})`,
    backgroundSize: mainImageSize ? `${mainImageSize}%` : 'cover',
  }

  console.log(id)

  return (
    <div className={styles.bookmark} style={bookmarkStyle}>
      {
        // prettier-ignore
        mainHref
        ? (<a className={styles.bookmarkLink} href={mainHref} />) 
        : (<div className={styles.bookmarkLink} />)
      }
      {editMode && (
        <button className={styles.editButton} onClick={editBookmark}>
          <Pencil2Icon className={styles.editIcon} />
        </button>
      )}
      {dropdownLinks && (
        <ol className={styles.dropdown}>
          {dropdownLinks.map(e => (
            <li key={e.link} className={styles.dropdownItem}>
              {e.iconUrl && <img src={e.iconUrl} />}
              <a href={e.link}>{e.title}</a>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
