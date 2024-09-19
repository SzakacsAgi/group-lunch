'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import React, { FunctionComponent, ReactNode } from 'react'
import { SupportedModalButtonTypes } from '../../../interface'

interface ModalButtonProps {
  buttonPurpose: SupportedModalButtonTypes
  buttonText: string
  modalContent: ReactNode
  modalHeaderText?: string
  withButtons?: boolean
  submitText?: string
  cancelText?: string
  onSubmit?: () => void
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
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const detectContent = () => {
    switch (buttonPurpose) {
      case SupportedModalButtonTypes.EDIT_RESTAURANT:
      case SupportedModalButtonTypes.CREATE_RESTAURANT:
        return React.cloneElement(modalContent, { onClose })
      default:
        return modalContent
    }
  }
  const handleSubmit = () => {
    onSubmit!()
    onClose()
  }

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        {buttonText}
      </Button>
      <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{modalHeaderText}</ModalHeader>
              <ModalBody>{detectContent()}</ModalBody>
              {withButtons && (
                <ModalFooter>
                  <Button color='primary' variant='flat' onPress={handleSubmit}>
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
