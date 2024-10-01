import React from 'react'
import { FunctionComponent } from 'react'

interface LabelProps {
  labelText: string
  htmlFor?: string
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
}

const Label: FunctionComponent<LabelProps> = ({ labelText, htmlFor, size }) => {
  const className = `text-${size}`
  return (
    <>
      {htmlFor ? (
        <label htmlFor={htmlFor} className={className}>
          {labelText}
        </label>
      ) : (
        <h2 className={className}>{labelText}</h2>
      )}
    </>
  )
}

export default Label
