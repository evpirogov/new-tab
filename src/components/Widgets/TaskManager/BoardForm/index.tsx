import { ChangeEvent, useEffect, useState } from 'react'
import { addCard, deleteCard, editCard } from '../../../../store/bordSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import CustomSelect from '../../../../reusableComponents/CustomSelect'
import styles from './index.module.scss'
import { generateRandomId } from '../../../../utils'

export type TBoardCard = {
  id: string
  status: string
  priority: string
  epic: string | null
  description: string
}

type TBoardFormProps = { closeModal: () => void } & (
  | {
      formType: 'create'
      initialStatus: string
    }
  | {
      formType: 'edit'
      card: TBoardCard
    }
)

export const BoardForm = (props: TBoardFormProps) => {
  const { formType, closeModal } = props
  const dispatch = useAppDispatch()
  const { statuses, priorities, epics } = useAppSelector(state => state.board)
  const initialState = (): TBoardCard => {
    if (formType === 'edit') return props.card

    return {
      id: generateRandomId(),
      status: props.initialStatus,
      priority: 'normal',
      epic: '',
      description: '',
    }
  }
  const [card, setCard] = useState(initialState)
  const [validationError, setValidationError] = useState<string | null>(null)

  const statusOptions = statuses.map(e => ({ title: e.label, value: e.value }))
  const selectedStatus = statusOptions.find(e => e.value === card.status)

  const priorityOptions = priorities.map(e => ({
    title: e.label,
    value: e.value,
  }))
  const selectedPriority = priorityOptions.find(e => e.value === card.priority)

  const epicOptions = epics.map(e => ({ title: e.label, value: e.value }))
  const selectedEpic = epicOptions.find(e => e.value === card.epic)

  const handleOptionSelect = (option: string, value: string) => {
    setValidationError(null)
    setCard({
      ...card,
      [option]: value,
    })
  }

  const handleDescriptionSelect = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValidationError(null)
    const description = e.target.value
    if (description.length > 400) return

    setCard({
      ...card,
      description,
    })
  }

  const submitHandler = () => {
    if (card.description.trim().length === 0) {
      setValidationError('Описание не может быть пустым')
      return
    }

    if (formType === 'edit') {
      dispatch(editCard(card))
    } else {
      dispatch(addCard(card))
    }

    closeModal()
  }

  const deledeHandler = () => {
    dispatch(deleteCard(card.id))
    closeModal()
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.formHeader}>
        {formType === 'create' ? 'Новая карточка' : 'Карточка'}
      </h2>
      <CustomSelect
        name="status"
        options={statusOptions}
        selected={selectedStatus || null}
        onChange={handleOptionSelect}
        placeholder="Статус"
      />
      <CustomSelect
        name="priority"
        options={priorityOptions}
        selected={selectedPriority || null}
        onChange={handleOptionSelect}
        placeholder="Приоритет"
      />
      <CustomSelect
        name="epic"
        options={epicOptions}
        selected={selectedEpic || null}
        onChange={handleOptionSelect}
        placeholder="Эпик"
      />
      <textarea
        maxLength={400}
        value={card.description}
        onChange={handleDescriptionSelect}
        placeholder="Описание"
        className={styles.description}
      />
      {validationError && (
        <div style={{ color: 'red', fontSize: 12 }}>
          Ошибка: <span style={{ color: 'black' }}>{validationError}</span>
        </div>
      )}
      <div className={styles.dropdownItemChangeButtons}>
        {formType === 'edit' ? (
          <button
            type="button"
            className={styles.removeItemButton}
            onClick={deledeHandler}
          >
            Удалить карточку
          </button>
        ) : (
          <div></div>
        )}
        <button
          type="button"
          className={styles.applyItemButton}
          onClick={submitHandler}
        >
          Применить
        </button>
      </div>
    </div>
  )
}
