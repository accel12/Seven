import { crearProyectoApi } from "@/app/api/ProyectoApi";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

const FormularioCrearProyecto = ({ onClose }) => {
  const router = useRouter();
  const [proyecto, setProyecto] = useState({ nombre: "" });
  const crearProyecto = async () => {
    if (proyecto.nombre == "") {
      enqueueSnackbar("Falta ingresar nombre", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      return;
    }
    const rspta = await crearProyectoApi(proyecto);
    if (rspta == "ProyectoExiste") {
      enqueueSnackbar("Ya existe un proyecto con ese nombre", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }
    if (rspta == "OK") {
      enqueueSnackbar("Se creo el proyecto correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      onClose();
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
            Nombre de proyecto
          </label>
          <input
            type="text"
            id="name"
            value={proyecto.nombre}
            onChange={(e) => {
              setProyecto((prevState) => ({
                ...prevState,
                nombre: e.target.value,
              }));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nombre de proyecto"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={crearProyecto}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCrearProyecto;
