import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import React, { useState } from "react";
import FormularioEditarUsuario from "./FormularioEditarUsuario";
import { editarUsuarioAPI } from "@/app/api/UsuarioApi";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const ModalEditarUsuario = ({ id, isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar Usuario
            </ModalHeader>
            <ModalBody>
              <FormularioEditarUsuario onClose={onClose} id={id} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalEditarUsuario;
