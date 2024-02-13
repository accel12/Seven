import { obtenerProyectosTotal } from "@/app/api/ProyectoApi";
import { agregarComentario, crearTareaApi } from "@/app/api/TareaApi";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const FormularioCrearComentario = ({
  onClose,
  id,
  obtenerListaComentarios,
}) => {
  const router = useRouter();
  const [comentario, setComentario] = useState({
    id: "",
    comentarioTarea: "",
    idTarea: id,
  });

  const crearComentario = async () => {
    if (comentario.comentarioTarea == "") {
      enqueueSnackbar("Falta ingresar comentario", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      return;
    }
    const rspta = await agregarComentario(comentario);
    if (rspta == "OK") {
      enqueueSnackbar("Se creo el comentario correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      onClose();
      obtenerListaComentarios();
      router.refresh();
      return;
    }
  };
  return (
    <div>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            form="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Comentario
          </label>
          <input
            type="text"
            id="name"
            value={comentario.comentarioTarea}
            onChange={(e) => {
              setComentario((prevState) => ({
                ...prevState,
                comentarioTarea: e.target.value,
              }));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Comentario"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={crearComentario}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCrearComentario;
