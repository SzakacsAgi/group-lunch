'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import React, { FunctionComponent, ReactElement } from 'react'
import { SupportedModalButtonTypes } from '../../../interface'
import { useFileOperations } from '../../api/useFileOperations'
import { useRecoilState } from 'recoil'
import { uploadedImageTrash } from '../../../utils/atoms'

interface ModalButtonProps {
  buttonPurpose: SupportedModalButtonTypes
  buttonText: string
  modalContent: ReactElement
  modalHeaderText?: string
  withButtons?: boolean
  submitText?: string
  cancelText?: string
  onSubmit?: () => void
}

const ModalButton: FunctionComponent<ModalButtonProps> = ({
  buttonText,
  modalHeaderText,
  withButtons,
  submitText,
  cancelText,
  modalContent,
  buttonPurpose,
  onSubmit,
  handleOnClose,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { deleteFile } = useFileOperations()
  const [uploadedImageId, setUploadedImageId] = useRecoilState(uploadedImageTrash)

  const detectContent = () => {
    switch (buttonPurpose) {
      case SupportedModalButtonTypes.EDIT_RESTAURANT:
      case SupportedModalButtonTypes.CREATE_RESTAURANT:
        return React.cloneElement(modalContent, { onClose: onClose })
      case SupportedModalButtonTypes.DELETE_RESTAURANT:
        return modalContent
      default:
        return modalContent
    }
  }

  const deleteUploadedFileOnClose = async () => {
    try {
      if (uploadedImageId) {
        await deleteFile(uploadedImageId)
      }
      setUploadedImageId(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = async () => {
    onClose()
    await deleteUploadedFileOnClose()
  }

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        {buttonText}
      </Button>
      <Modal backdrop='blur' isOpen={isOpen} onClose={handleClose} hideCloseButton onOpenChange={() => onClose()}>
        <ModalContent>
          <ModalHeader>{modalHeaderText}</ModalHeader>
          <ModalBody>{detectContent()}</ModalBody>
          {withButtons && (
            <ModalFooter>
              <Button color='primary' variant='flat' onClick={onSubmit}>
                {submitText}
              </Button>
              <Button color='primary' onPress={onClose}>
                {cancelText}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalButton
