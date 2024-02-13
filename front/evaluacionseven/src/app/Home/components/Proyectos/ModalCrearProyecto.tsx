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

const ModalCrearProyecto = ({ isOpen, onOpenChange, onClose }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Proyecto
            </ModalHeader>
            <ModalBody>
              <FormularioCrearProyecto onClose={onClose} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCrearProyecto;
