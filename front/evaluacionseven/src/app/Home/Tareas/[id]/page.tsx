"use client";
import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import TablaTareas from "../../components/Tareas/TablaTareas";
import { EditIcon } from "../../components/EditIcon";
import { useParams } from "next/navigation";
import { obtenerTarea } from "@/app/api/TareaApi";
import ModalEditarTarea from "../../components/Tareas/ModalEditarTarea";
import TablaComentarios from "../../components/Tareas/TablaComentarios";

const Page = () => {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tarea, setTarea] = useState({
    id: 0,
    nombre: "",
    estado: "",
    fechaCreacion: "",
    idProyecto: "0",
  });
  const { id } = useParams();
  const modalTarea = useDisclosure();
  const obtenerDetalle = () => {
    obtenerTarea(id).then((res) => {
      console.log(res);
      setTarea({
        id: res.id,
        nombre: res.nombre,
        estado: res.estado,
        fechaCreacion: res.fechaCreacion,
        idProyecto: res.idProyecto,
      });
    });
  };
  useEffect(() => {
    obtenerDetalle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col ">
          <div className="flex gap-3">
            <label className="text-4xl mr-3 font-semibold">
              {tarea.nombre}
            </label>
            <div className="hover:cursor-pointer" onClick={modalTarea.onOpen}>
              <EditIcon height={50} color={"grey"} />
            </div>
          </div>
          <label>Estado: {tarea.estado}</label>
          <label>Fecha creación: {tarea.fechaCreacion}</label>
          <label>Proyecto: {tarea.idProyecto}</label>
        </div>
      </div>
      <div>
        <TablaComentarios id={id} />
      </div>
      <ModalEditarTarea
        isOpen={modalTarea.isOpen}
        onOpenChange={modalTarea.onOpenChange}
        onClose={modalTarea.onClose}
        id={id}
        obtenerDetalle={obtenerDetalle}
      />
    </div>
  );
};

export default Page;
