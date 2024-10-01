import { Button as NextButton } from '@nextui-org/react'
import { FunctionComponent } from 'react'
import { IconComponentType } from '../../../interface'

interface ButtonProps {
  onClick?: () => void
  endContent?: IconComponentType
  startContent?: IconComponentType
  buttonText?: string
  iconClass?: string
  size?: 'sm' | 'md' | 'lg'
}

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  buttonText,
  size,
  endContent: EndContent,
  startContent: StartContent,
  iconClass = 'w-3 text-black',
}) => {
  return (
    <NextButton
      onClick={onClick}
      className='bg-transparent border border-black'
      size={size}
      endContent={EndContent && <EndContent className={iconClass} />}
      startContent={StartContent && <StartContent className={iconClass} />}>
      {buttonText}
    </NextButton>
  )
}

export default Button
