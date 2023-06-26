import { Pencil2Icon } from '@radix-ui/react-icons'
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
  return (
    <>
      <div
        className={styles.card}
        style={{
          backgroundImage: `url(${mainImageUrl})`,
          backgroundSize: mainImageSize ? `${mainImageSize}%` : 'cover',
        }}
      >
        {mainHref ? (
          <a className={styles.cardLink} href={mainHref} />
        ) : (
          <div className={styles.cardLink} />
        )}
        <button
          className={styles.editButton}
          onClick={() => {
            editCardHandler(id)
          }}
        >
          <Pencil2Icon className={styles.editIcon} />
        </button>
        <ol className={styles.dropdown}>
          {dropdownLinks.map(e => (
            <li key={e.link} className={styles.dropdownItem}>
              {e.iconUrl && <img src={e.iconUrl} />}
              <a href={e.link}>{e.title}</a>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
