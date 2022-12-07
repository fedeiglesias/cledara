import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import style from './styles.module.css'

type ButtonProps<T extends ElementType> = {
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>({
  className = '',
  children,
  ...rest
}: ButtonProps<T>) => {
  return (
    <button className={`${style.btn} ${className}`} {...rest}>
    { children }
    </button>
  )
}
