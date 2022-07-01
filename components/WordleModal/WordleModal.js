import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
export default function WordleModal({
  isCorrect,
  turn,
  solution,
  closeModal,
  showModal,
}) {
  const { isOpen } = useDisclosure();
  return (
    <>
      {isCorrect && (
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Congratulations!!!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h1>{solution}</h1>
              <p>You found the solution in {turn} guesses :)</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {!isCorrect && (
        <Modal>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Nevermind</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h1>{solution}</h1>
              <p>Try again :)</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
