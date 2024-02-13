"use client";
import { eliminarComentario, obtenerComentarios } from "@/app/api/TareaApi";
import React, { useEffect, useState } from "react";
import ModalCrearComentario from "./ModalCrearComentario";
import { Button, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from "../DeleteIcon";
import { enqueueSnackbar } from "notistack";

const TablaComentarios = ({ id }) => {
  const modalCrearComentario = useDisclosure();
  const [listaComentarios, setListaComentarios] = useState([]);
  const obtenerListaComentarios = async () => {
    const rspta = await obtenerComentarios(id);
    console.log(rspta);
    setListaComentarios(rspta);
  };
  const eliminarComentarios = async (id) => {
    const rspta = await eliminarComentario(id);
    if (rspta == "OK") {
      enqueueSnackbar("Se creo el comentario correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      obtenerListaComentarios();
      return;
    }
  };
  useEffect(() => {
    obtenerListaComentarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (listaComentarios.length == 0) {
    return (
      <div>
        <div className="flex mb-4">
          <label className="text-2xl mr-8">Comentarios</label>
          <Button onClick={modalCrearComentario.onOpen}>Agregar</Button>
        </div>
        <div>No tienes comentarios</div>
        <ModalCrearComentario
          isOpen={modalCrearComentario.isOpen}
          onOpenChange={modalCrearComentario.onOpenChange}
          onClose={modalCrearComentario.onClose}
          obtenerListaComentarios={obtenerListaComentarios}
          idTarea={id}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="flex mb-4">
        <label className="text-2xl mr-8">Comentarios</label>
        <Button onClick={modalCrearComentario.onOpen}>Agregar</Button>
      </div>
      {listaComentarios.map((comentario) => (
        <div key={comentario.id} className="flex">
          <div className=" mr-8">{comentario.comentarioTarea}</div>
          <div
            className="cursor-pointer"
            onClick={() => eliminarComentarios(comentario.id)}
          >
            <DeleteIcon color={"red"} />
          </div>
        </div>
      ))}
      <ModalCrearComentario
        isOpen={modalCrearComentario.isOpen}
        onOpenChange={modalCrearComentario.onOpenChange}
        onClose={modalCrearComentario.onClose}
        obtenerListaComentarios={obtenerListaComentarios}
        idTarea={id}
      />
    </div>
  );
};

export default TablaComentarios;
