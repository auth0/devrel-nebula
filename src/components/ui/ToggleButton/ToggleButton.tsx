import React from 'react'
import clsx from 'clsx'
import {useToggleState} from '@react-stately/toggle'
import {useToggleButton} from '@react-aria/button'
import {AriaButtonProps} from '@react-types/button'

import ButtonBase, {ButtonBaseProps} from '../ButtonBase'

interface ToggleButtonProps extends ButtonBaseProps {
  isSelected: boolean
}

const ToggleButton: React.FC<ToggleButtonProps> = props => {
  const {
    color = 'primary',
    children,
    className,
    onPress,
    isSelected,
    ...otherProps
  } = props
  const ref = React.useRef()
  const state = useToggleState(props)
  const {buttonProps} = useToggleButton(
    {...props, isDisabled: props.loading || props.disabled},
    state,
    ref,
  )

  return (
    <ButtonBase
      {...(buttonProps as AriaButtonProps<'button'>)}
      {...otherProps}
      color={color}
      variant="outlined"
      ref={ref}
      className={clsx(
        {
          'bg-opacity-20 bg-flamingo-500 text-flamingo-500 border-flamingo-500':
            state.isSelected && color === 'primary',
        },
        className,
      )}
    >
      {children}
    </ButtonBase>
  )
}

export default ToggleButton
