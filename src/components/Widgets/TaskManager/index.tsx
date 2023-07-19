import { useAppSelector } from '../../../hooks'
import styles from './index.module.scss'
import { Board } from './Board'

export const TaskManager = () => {
  const { cards } = useAppSelector(state => state.board)
  return (
    <div className={styles.container}>
      <p className={styles.widgetHeader}>Task manager / Kanban board</p>
      <Board>
        <Board.Column>
          <Board.Card data={cards[0]} />
          <button className={styles.addNewCardButton}>+ add card</button>
        </Board.Column>
        <Board.Column>
          <Board.Card data={cards[0]} />
        </Board.Column>
        <Board.Column>
          <Board.Card data={cards[0]} />
          <Board.Card data={cards[0]} />
        </Board.Column>
        <Board.Column>
          <Board.Card data={cards[0]} />
        </Board.Column>
      </Board>
    </div>
  )
}
