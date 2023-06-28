import { CardStackPlusIcon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'
import {
  addCard,
  editCard,
  removeCard,
  selectCards,
} from '../../../store/cardSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { Card, CardForm } from './Components'
import type { ICard } from './types'
import styles from './index.module.scss'
import { Modal } from '../../Modal'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => selectCards(state))

  const [modalOpen, setModalOpen] = useState(false)
  const [editableCard, setEditableCard] = useState<ICard | undefined>(undefined)
  const [formType, setFormType] = useState<'edit' | 'create'>('create')

  const cardContainer = useRef<HTMLDivElement>(null)
  const [cardsGridGapSize, setCardsGridGapSize] = useState('32px')

  useEffect(() => {
    const calculateGapSize = () => {
      if (!cardContainer.current) return

      const cardSize = 200
      const minGap = 20
      const containerWidth = cardContainer.current.clientWidth
      const availableNumberOfCards = Math.floor(
        (containerWidth + minGap) / (cardSize + minGap),
      )
      const availableSpaceForGaps =
        containerWidth - availableNumberOfCards * cardSize
      const singleGapSize = Math.floor(
        availableSpaceForGaps / (availableNumberOfCards - 1),
      )

      setCardsGridGapSize(`${singleGapSize}px`)
    }

    window.addEventListener('resize', calculateGapSize)

    return () => {
      window.removeEventListener('resize', calculateGapSize)
    }
  }, [])

  const openModalForCreatingCard = () => {
    setFormType('create')
    setEditableCard(undefined)
    setModalOpen(true)
  }
  const openModalForEditingCard = (cardId: string) => {
    setFormType('edit')
    setEditableCard(cards.find(e => e.id === cardId))
    setModalOpen(true)
  }

  const createCardHandler = (cardState: ICard) => {
    dispatch(addCard(cardState))
    setEditableCard(undefined)
    setModalOpen(false)
  }

  const editCardHandler = (cardState: ICard) => {
    dispatch(editCard(cardState))
    setEditableCard(undefined)
    setModalOpen(false)
  }

  const removeCardHandler = (cardId: string) => {
    dispatch(removeCard(cardId))
    setEditableCard(undefined)
    setModalOpen(false)
  }

  const mapFormTypeToHandler = {
    create: createCardHandler,
    edit: editCardHandler,
  }

  return (
    <div
      className={styles.cards}
      ref={cardContainer}
      style={{ gap: cardsGridGapSize }}
    >
      {cards.map(
        ({ id, mainHref, mainImageUrl, mainImageSize, dropdownLinks }) => (
          <Card
            id={id}
            key={id}
            mainHref={mainHref}
            mainImageUrl={mainImageUrl}
            mainImageSize={mainImageSize}
            dropdownLinks={dropdownLinks}
            editCardHandler={openModalForEditingCard}
          />
        ),
      )}
      <button className={styles.addNewCard} onClick={openModalForCreatingCard}>
        <CardStackPlusIcon />
        <span>New card</span>
      </button>
      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <CardForm
          cardState={editableCard}
          formType={formType}
          submitHandler={mapFormTypeToHandler[formType]}
          removeCardHandler={removeCardHandler}
        />
      </Modal>
    </div>
  )
}

//TODO
// 1. Можно относительно ширины контейнера менять grid-gap, тогда элементы будут располагаться от края до края, при этом последний ряд будет отображаться по сетке
