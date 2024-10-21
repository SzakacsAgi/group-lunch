'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import React, { FunctionComponent, ReactElement } from 'react'
import { SupportedModalButtonTypes } from '../../../interface'

interface ModalButtonProps {
  buttonPurpose: SupportedModalButtonTypes
  buttonText: string
  modalContent: ReactElement
  modalHeaderText?: string
  withButtons?: boolean
  submitText?: string
  cancelText?: string
  onSubmit?: () => void
  handleOnClose?: (() => void) | (() => Promise<void>)
}

const ModalButton: FunctionComponent<ModalButtonProps> = ({
  buttonPurpose,
  buttonText,
  modalHeaderText,
  withButtons,
  submitText,
  cancelText,
  modalContent,
  onSubmit,
  handleOnClose,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const detectContent = () => {
    switch (buttonPurpose) {
      case SupportedModalButtonTypes.EDIT_RESTAURANT:
      case SupportedModalButtonTypes.CREATE_RESTAURANT:
        return React.cloneElement(modalContent, { onClose: handleCancel })
      default:
        return modalContent
    }
  }
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit()
      onClose()
    } else {
      console.warn('onSubmit is not defined')
    }
  }

  const handleCancel = async () => {
    handleOnClose && (await handleOnClose())
    onClose()
  }

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        {buttonText}
      </Button>
      <Modal backdrop='blur' isOpen={isOpen} onOpenChange={handleCancel} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{modalHeaderText}</ModalHeader>
              <ModalBody>{detectContent()}</ModalBody>
              {withButtons && (
                <ModalFooter>
                  <Button color='primary' variant='flat' onClick={handleSubmit}>
                    {submitText}
                  </Button>
                  <Button color='primary' onPress={onClose}>
                    {cancelText}
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalButton
