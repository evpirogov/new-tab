import { TrashIcon } from '@radix-ui/react-icons'
import { ChangeEvent, MouseEvent, useReducer } from 'react'
import { ValidActionTypes, reducer } from './store'
import { ICard } from '../../types'
import styles from '../../index.module.scss'

type TProps = {
  cardState?: ICard
  formType: 'edit' | 'create'
  submitHandler: (cardState: ICard) => void
  removeCardHandler: (cardId: string) => void
}

export const CardForm = ({
  cardState,
  formType,
  submitHandler,
  removeCardHandler,
}: TProps) => {
  const initialState: ICard = cardState || {
    // Формировать id на клиенте не очень хорошо.
    // Но в противном случае придется делать отжельный тип Omit<iCard, 'id'> - что не кайф
    // Чтобы не бвло путанницы: тут добавил префикс 'tempId', а в reducers.addCard перезаписываю id
    id: `tempId_${Math.random().toString(32).substring(2)}`,
    mainHref: '',
    mainImageUrl: '',
    mainImageSize: '',
    dropdownLinks: [],
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChangeCardMainValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    dispatch({
      type: ValidActionTypes.ChangeCardMainValues,
      name,
      value,
    })
  }

  const handleAddDropdownItem = () => {
    dispatch({
      type: ValidActionTypes.AddDropdownItem,
    })
  }

  const handleChangeDropdownItem = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ValidActionTypes.ChangeDropdownItem,
      id: Number(e.target.getAttribute('data-item-order-id')),
      name: e.target.name,
      value: e.target.value,
    })
  }

  const handleDeleteDropdownItem = (e: MouseEvent<HTMLButtonElement>) => {
    if (!(e.target instanceof Element)) return

    dispatch({
      type: ValidActionTypes.DeleteDropdownItem,
      id: Number(e.target.getAttribute('data-item-order-id')),
    })
  }

  const handleDeleteCard = () => {
    removeCardHandler(state.id)
  }

  return (
    <div className={styles.cardEditModal}>
      <h2 className={styles.cardHeader}>Карточка</h2>
      <form
        className={styles.cardForm}
        onSubmit={e => {
          e.preventDefault()
          submitHandler(state)
        }}
        autoComplete="off"
      >
        <div className={styles.inputSection}>
          <input
            name="mainHref"
            value={state.mainHref}
            type="text"
            placeholder="Ссылка на вкладку"
            onChange={handleChangeCardMainValues}
          />
          <input
            name="mainImageUrl"
            value={state.mainImageUrl}
            type="text"
            placeholder="Ссылка на картинку (желательно *.png)"
            onChange={handleChangeCardMainValues}
          />
          <input
            name="mainImageSize"
            value={state.mainImageSize}
            type="text"
            placeholder="Размер картинки в процентах"
            onChange={handleChangeCardMainValues}
          />
        </div>
        <p className={styles.info}>
          ⓘ Если у вас нет картинки и нужно вставить текст, вы можете создать
          картинку с нужным текстом на сайте:<span> </span>
          <a href="http://online-letters.ru" target="_blank">
            online-letters.ru
          </a>
        </p>
        <div className={styles.dropdownLinks}>
          <h3 className={styles.dropdownLinksHeader}>Выпадающий список</h3>
          <ol className={styles.dropdownList}>
            {state.dropdownLinks.map((e, i) => (
              <li
                key={i}
                className={`${styles.dropdownItem} ${styles.inputSection}`}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Название"
                  value={e.title}
                  data-item-order-id={i}
                  onChange={handleChangeDropdownItem}
                />
                <input
                  type="text"
                  name="link"
                  placeholder="Ссылка"
                  value={e.link}
                  data-item-order-id={i}
                  onChange={handleChangeDropdownItem}
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  data-item-order-id={i}
                  onClick={handleDeleteDropdownItem}
                >
                  <TrashIcon className={styles.removeIcon} />
                </button>
              </li>
            ))}
          </ol>
          <div className={styles.handlerSection}>
            <button
              type="button"
              className={styles.addItemButton}
              onClick={handleAddDropdownItem}
            >
              + Добавить пункт
            </button>
            <div className={styles.dropdownItemChangeButtons}>
              {formType === 'edit' ? (
                <button
                  type="button"
                  className={styles.removeItemButton}
                  onClick={e => {
                    e.preventDefault()
                    handleDeleteCard()
                  }}
                >
                  Удалить карточку
                </button>
              ) : (
                <div></div>
              )}
              <button type="submit" className={styles.applyItemButton}>
                Применить
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
