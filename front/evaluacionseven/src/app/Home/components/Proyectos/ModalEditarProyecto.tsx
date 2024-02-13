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
import VincularTarea from "./VincularTarea";
import FormularioAgregarTarea from "../FormularioAgregarTarea";
import FormularioCrearProyecto from "./FormularioCrearProyecto";
import FormularioEditarProyecto from "./FormularioEditarProyecto";

const ModalEditarProyecto = ({
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
              Editar Proyecto
            </ModalHeader>
            <ModalBody>
              <FormularioEditarProyecto
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

export default ModalEditarProyecto;
