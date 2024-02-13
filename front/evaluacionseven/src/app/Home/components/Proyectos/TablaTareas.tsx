"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EditIcon } from "../EditIcon";
import { DeleteIcon } from "../DeleteIcon";
import {
  eliminarTarea,
  obtenerTareas,
  obtenerTareasCompleto,
} from "@/app/api/TareaApi";
import { enqueueSnackbar } from "notistack";

const TablaTareas = ({ id }) => {
  const [listaTareas, setListaTareas] = useState([]);
  const abrirTarea = (id) => {
    window.open(`/Home/Tareas/${id}`);
  };
  const obtenerListaTareas = async () => {
    const rspta = await obtenerTareasCompleto(id);
    setListaTareas(rspta);
  };
  const eliminarTareas = async (id) => {
    const rspta = await eliminarTarea(id);
    if (rspta == "OK") {
      enqueueSnackbar("Se elimino la tarea correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      obtenerListaTareas();
      return;
    }
  };
  useEffect(() => {
    obtenerListaTareas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (listaTareas.length == 0) {
    return <div>No hay tareas vinculadas</div>;
  }
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Estado</TableColumn>
        <TableColumn>Fecha de creación</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {listaTareas.map((tarea) => (
          <TableRow key={tarea.id}>
            <TableCell>{tarea.nombre}</TableCell>
            <TableCell>{tarea.estado}</TableCell>
            <TableCell>{tarea.fechaCreacion}</TableCell>

            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Editar tarea">
                  <div onClick={() => abrirTarea(tarea.id)}>
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </div>
                </Tooltip>
                <Tooltip color="danger" content="Eliminar tarea">
                  <div onClick={() => eliminarTareas(tarea.id)}>
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
  );
};

export default TablaTareas;
