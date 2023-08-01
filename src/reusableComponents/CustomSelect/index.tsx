import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'
import type { MouseEventHandler } from 'react'
import { TCustomSelectProps, TOption } from './types'
import styles from './index.module.scss'
import Option from './Option'

const Select = (props: TCustomSelectProps) => {
  const {
    name,
    options,
    placeholder,
    status = 'default',
    selected,
    onChange,
    onClose,
  } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node

      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.()
        setIsOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [onClose])

  useEffect(() => {
    const placeholderEl = placeholderRef.current
    if (!placeholderEl) return

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setIsOpen(prev => !prev)
      }
    }
    placeholderEl.addEventListener('keydown', handleEnterKeyDown)

    return () => {
      placeholderEl.removeEventListener('keydown', handleEnterKeyDown)
    }
  }, [])

  const handleOptionClick = (value: TOption['value']) => {
    setIsOpen(false)
    onChange?.(name, value)
  }
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div
      className={styles.selectWrapper}
      ref={rootRef}
      data-is-active={isOpen}
      data-testid="selectWrapper"
    >
      <div className={styles.arrow}>
        <ChevronDownIcon />
      </div>
      <div
        className={styles.placeholder}
        data-status={status}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        role="button"
        tabIndex={0}
        ref={placeholderRef}
      >
        {selected?.title || placeholder}
      </div>
      {isOpen && (
        <ul className={styles.select} data-testid="selectDropdown">
          {options.map(option => (
            <Option
              key={option.value}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
