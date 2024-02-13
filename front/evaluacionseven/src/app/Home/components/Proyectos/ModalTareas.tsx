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
import VincularTarea from "./VincularTarea";
import FormularioAgregarTarea from "../FormularioAgregarTarea";

const ModalTareas = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Tareas</ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-col">
                <Tabs aria-label="Options">
                  <Tab key="Vincular" title="Vincular Tarea">
                    <Card>
                      <CardBody>
                        <VincularTarea />
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="Agregar" title="Agregar">
                    <Card>
                      <CardBody>
                        <FormularioAgregarTarea />
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalTareas;
