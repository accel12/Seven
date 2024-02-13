import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React from "react";
import FormularioCrearTarea from "./FormularioCrearTarea";

const ModalCrearTarea = ({ isOpen, onOpenChange, onClose }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Tarea
            </ModalHeader>
            <ModalBody>
              <FormularioCrearTarea onClose={onClose} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCrearTarea;
