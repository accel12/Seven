"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EditIcon } from "../EditIcon";
import { DeleteIcon } from "../DeleteIcon";
import {
  EliminarUsuariosVinculados,
  ObtenerUsuariosVinculados,
} from "@/app/api/ProyectoApi";
import { enqueueSnackbar } from "notistack";
import { Button } from "flowbite-react";
import ModalUsuarios from "./ModalUsuarios";

const TablaUsuarios = ({ id }) => {
  const modalUsuarios = useDisclosure();
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const obtenerListaUsuarios = async () => {
    const rspta = await ObtenerUsuariosVinculados(id);
    console.log(rspta);
    setListaUsuarios(rspta);
  };
  const desvincularUsuario = async (id) => {
    const rspta = await EliminarUsuariosVinculados(id);
    if (rspta == "OK") {
      enqueueSnackbar("Se elimino la tarea correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      obtenerListaUsuarios();
      return;
    }
  };
  useEffect(() => {
    obtenerListaUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (listaUsuarios.length == 0) {
    return (
      <div>
        <div className="flex mb-4">
          <label className="text-2xl flex-1">Usuarios vinculados</label>
          <Button onClick={modalUsuarios.onOpen}>Agregar</Button>
        </div>
        No hay usuarios vinculados
      </div>
    );
  }
  return (
    <div>
      <div className="flex mb-4">
        <label className="text-2xl flex-1">Usuarios vinculados</label>
        <Button onClick={modalUsuarios.onOpen}>Agregar</Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {listaUsuarios.map((usuario) => (
            <TableRow key={usuario.proyectoUsuarioId}>
              <TableCell>{usuario.usuario}</TableCell>
              <TableCell>
                <div className="relative flex items-center">
                  <Tooltip color="danger" content="Desvincular usuario">
                    <div
                      onClick={() =>
                        desvincularUsuario(usuario.proyectoUsuarioId)
                      }
                    >
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
      <ModalUsuarios
        id={id}
        onClose={modalUsuarios.onClose}
        isOpen={modalUsuarios.isOpen}
        onOpenChange={modalUsuarios.onOpenChange}
        obtenerListaUsuarios={obtenerListaUsuarios}
      />
    </div>
  );
};

export default TablaUsuarios;
