import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React from "react";
import VincularUsuario from "./VincularUsuario";

const ModalUsuarios = ({
  isOpen,
  onClose,
  onOpenChange,
  id,
  obtenerListaUsuarios,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Vincular usuario
            </ModalHeader>
            <ModalBody>
              <Card>
                <CardBody>
                  <VincularUsuario
                    onClose={onClose}
                    id={id}
                    obtenerListaUsuarios={obtenerListaUsuarios}
                  />
                </CardBody>
              </Card>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalUsuarios;
