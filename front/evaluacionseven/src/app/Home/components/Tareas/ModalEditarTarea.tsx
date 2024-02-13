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
import FormularioEditarTarea from "./FormularioEditarTarea";

const ModalEditarTarea = ({
  isOpen,
  onOpenChange,
  onClose,
  id,
  obtenerDetalle,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar Tarea
            </ModalHeader>
            <ModalBody>
              <FormularioEditarTarea
                onClose={onClose}
                id={id}
                obtenerDetalle={obtenerDetalle}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalEditarTarea;
