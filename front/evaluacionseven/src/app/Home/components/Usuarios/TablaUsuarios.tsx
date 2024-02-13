"use client";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EditIcon } from "../EditIcon";
import { DeleteIcon } from "../DeleteIcon";
import ModalEditarUsuario from "./ModalEditarUsuario";
import { eliminarUsuarioAPI, obtenerUsuarios } from "@/app/api/UsuarioApi";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const TablaUsuarios = () => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [idUsuarioSelect, setIdUsuarioSelect] = useState(0);
  const { refresh } = useRouter();
  const obtenerListaUsuarios = async () => {
    const rspta = await obtenerUsuarios();
    setListaUsuarios(rspta);
  };
  const eliminarUsuario = async (id) => {
    const rspta = await eliminarUsuarioAPI(id);
    if (rspta == "OK") {
      enqueueSnackbar("Se elimino el usuario correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      refresh();
    }
  };
  const modalEditar = useDisclosure();
  const abrirModal = (id) => {
    setIdUsuarioSelect(id);
    modalEditar.onOpen();
  };
  useEffect(() => {
    obtenerListaUsuarios();
  }, []);

  if (listaUsuarios.length == 0) {
    return <div>No hay usuarios</div>;
  }
  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Fecha de creación</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {listaUsuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.usuario}</TableCell>
              <TableCell>{usuario.estado}</TableCell>
              <TableCell>{usuario.fechaCreacion}</TableCell>

              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar usuario">
                    <div onClick={() => abrirModal(usuario.id)}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </div>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar usuario">
                    <div onClick={() => eliminarUsuario(usuario.id)}>
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                      </span>
                    </div>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalEditarUsuario
        id={idUsuarioSelect}
        isOpen={modalEditar.isOpen}
        onOpenChange={modalEditar.onOpenChange}
      />
    </div>
  );
};

export default TablaUsuarios;
