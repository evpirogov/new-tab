import { Pencil2Icon } from '@radix-ui/react-icons'
import { selectMode } from '../../../../../store/modeSlice'
import { useAppSelector } from '../../../../../hooks'
import { ICard } from '../../types'
import styles from './index.module.scss'

interface IProps extends ICard {
  editCardHandler: (cardId: string) => void
}

export const Card = ({
  id,
  mainHref,
  mainImageUrl,
  mainImageSize,
  dropdownLinks,
  editCardHandler,
}: IProps) => {
  const { editMode } = useAppSelector(state => selectMode(state))

  const editCard = () => {
    editCardHandler(id)
  }

  const cardStyle = {
    backgroundImage: `url(${mainImageUrl})`,
    backgroundSize: mainImageSize ? `${mainImageSize}%` : 'cover',
  }

  return (
    <div className={styles.card} style={cardStyle}>
      {
        // prettier-ignore
        mainHref
        ? (<a className={styles.cardLink} href={mainHref} />) 
        : (<div className={styles.cardLink} />)
      }
      {editMode && (
        <button className={styles.editButton} onClick={editCard}>
          <Pencil2Icon className={styles.editIcon} />
        </button>
      )}
      <ol className={styles.dropdown}>
        {dropdownLinks.map(e => (
          <li key={e.link} className={styles.dropdownItem}>
            {e.iconUrl && <img src={e.iconUrl} />}
            <a href={e.link}>{e.title}</a>
          </li>
        ))}
      </ol>
    </div>
  )
}
