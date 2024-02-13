"use client";
import {
  Button,
  Chip,
  Pagination,
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModalCrearProyecto from "./ModalCrearTarea";
import ModalCrearTarea from "./ModalCrearTarea";
import { eliminarTarea } from "@/app/api/TareaApi";
import { enqueueSnackbar } from "notistack";

const TablaTareas = ({ listaTareas, cantidad }) => {
  const { refresh } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const modalCrear = useDisclosure();
  const params = new URLSearchParams(searchParams);
  const abrirTarea = (id) => {
    window.open(`/Home/Tareas/${id}`);
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
      refresh();
      return;
    }
  };
  const cambiarPagina = (e) => {
    if (e > 1) {
      params.set("page", e);
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (listaTareas.length == 0) {
    console.log("vacio");
    return (
      <div>
        <div className="flex justify-end mb-4">
          <Button onClick={modalCrear.onOpen}>Crear Tarea</Button>
        </div>
        <label>No tienes tareas</label>
        <ModalCrearProyecto
          isOpen={modalCrear.isOpen}
          onOpenChange={modalCrear.onOpenChange}
          onClose={modalCrear.onClose}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={modalCrear.onOpen}>Crear Tarea</Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nombre de proyecto</TableColumn>
          <TableColumn>Descripcion</TableColumn>
          <TableColumn>Fecha de creación</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {listaTareas.map((proyecto) => (
            <TableRow key={proyecto.id}>
              <TableCell>{proyecto.nombre}</TableCell>
              <TableCell> </TableCell>
              <TableCell>{proyecto.fechaCreacion}</TableCell>
              <TableCell>{proyecto.estado}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar Tarea">
                    <div onClick={() => abrirTarea(proyecto.id)}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </div>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar tarea">
                    <div onClick={() => eliminarTareas(proyecto.id)}>
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
      <div className="mt-4 flex ">
        <Pagination
          total={Math.ceil(cantidad / 5)}
          initialPage={Number(searchParams.get("page") || 1)}
          onChange={(e) => cambiarPagina(e)}
        />
      </div>
      <ModalCrearTarea
        isOpen={modalCrear.isOpen}
        onOpenChange={modalCrear.onOpenChange}
        onClose={modalCrear.onClose}
      />
    </div>
  );
};

export default TablaTareas;
