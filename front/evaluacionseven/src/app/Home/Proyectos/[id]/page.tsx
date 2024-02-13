"use client";
import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import ModalTareas from "../../components/Proyectos/ModalTareas";
import ModalUsuarios from "../../components/Proyectos/ModalUsuarios";
import TablaTareas from "../../components/Proyectos/TablaTareas";
import TablaUsuarios from "../../components/Proyectos/TablaUsuarios";
import { EditIcon } from "../../components/EditIcon";
import ModalEditarProyecto from "../../components/Proyectos/ModalEditarProyecto";
import { useParams } from "next/navigation";
import { obtenerProyecto } from "@/app/api/ProyectoApi";

const Page = () => {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [proyecto, setProyecto] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    estado: "",
    creadoPor: "",
    fechaCreacion: "",
  });
  const { id } = useParams();
  const modalTareas = useDisclosure();

  const modalProyecto = useDisclosure();
  const obtenerDetalle = () => {
    obtenerProyecto(id).then((res) => {
      setProyecto({
        id: res.id,
        nombre: res.nombre,
        descripcion: "",
        estado: res.estado,
        creadoPor: "",
        fechaCreacion: res.fechaCreacion,
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
              {proyecto.nombre}
            </label>
            <div
              className="hover:cursor-pointer"
              onClick={modalProyecto.onOpen}
            >
              <EditIcon height={50} color={"grey"} />
            </div>
          </div>
          <label>Descripción: {proyecto.descripcion}</label>
          <label>Estado: {proyecto.estado}</label>
          <label>Fecha creación: {proyecto.fechaCreacion}</label>
        </div>
      </div>
      <div className="mt-3 grid grid-flow-row sm:grid-cols-1 xl:grid-cols-2 gap-7 ">
        <div>
          <div className="flex mb-4">
            <label className="text-2xl flex-1">Tareas vinculadas</label>
          </div>

          <TablaTareas id={id} />
        </div>
        <div>
          <TablaUsuarios id={id} />
        </div>
      </div>
      <ModalTareas
        isOpen={modalTareas.isOpen}
        onOpenChange={modalTareas.onOpenChange}
      />

      <ModalEditarProyecto
        isOpen={modalProyecto.isOpen}
        onOpenChange={modalProyecto.onOpenChange}
        onClose={modalProyecto.onClose}
        id={id}
        obtenerDetalle={obtenerDetalle}
      />
    </div>
  );
};

export default Page;
