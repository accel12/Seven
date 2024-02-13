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
import FormularioCrearComentario from "./FormularioCrearComentario";

const ModalCrearComentario = ({
  isOpen,
  onOpenChange,
  onClose,
  obtenerListaComentarios,
  idTarea,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Comentario
            </ModalHeader>
            <ModalBody>
              <FormularioCrearComentario
                onClose={onClose}
                id={idTarea}
                obtenerListaComentarios={obtenerListaComentarios}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCrearComentario;
