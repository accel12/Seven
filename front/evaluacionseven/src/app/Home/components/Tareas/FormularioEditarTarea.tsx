"use client";
import { obtenerEstados } from "@/app/api/ProyectoApi";
import { modificarTareaApi, obtenerTarea } from "@/app/api/TareaApi";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const FormularioEditarTarea = ({ onClose, id, obtenerDetalle }) => {
  const [listaEstados, setlistaEstados] = useState([]);
  const [tarea, setTarea] = useState({
    id: 0,
    nombre: "",
    estado: "0",
    fechaCreacion: "",
  });
  const router = useRouter();
  const listaEstado = () => {
    obtenerEstados().then((res) => {
      console.log(res);
      setlistaEstados(res);
    });
  };
  const detallesTarea = () => {
    obtenerTarea(id).then((res) => {
      console.log(res);
      setTarea({
        id: res.id,
        nombre: res.nombre,
        estado: `${res.estado}`,
        fechaCreacion: res.fechaCreacion,
      });
    });
  };
  useEffect(() => {
    listaEstado();
    detallesTarea();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modificarTarea = async () => {
    if (tarea.nombre == "") {
      enqueueSnackbar("Falta ingresar nombre", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      return;
    }
    const rspta = await modificarTareaApi(tarea);
    if (rspta == "TareaExiste") {
      enqueueSnackbar("Ya existe un tarea con ese nombre", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }
    if (rspta == "OK") {
      enqueueSnackbar("Se creo el tarea correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      obtenerDetalle();
      onClose();
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
            Nombre de tarea
          </label>
          <input
            type="text"
            id="name"
            value={tarea.nombre}
            onChange={(e) => {
              setTarea((prevState) => ({
                ...prevState,
                nombre: e.target.value,
              }));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nombre de tarea"
            required
          />
        </div>
        <div className="mb-5">
          <label
            form="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Estado
          </label>
          <Select
            label="Seleccionar estado"
            className="max-w-xs"
            selectedKeys={[tarea.estado]}
            onChange={(e) => {
              setTarea((old) => ({ ...old, estado: e.target.value }));
            }}
          >
            {listaEstados.map((estado) => (
              <SelectItem key={estado.id} value={estado.id}>
                {estado.nombre}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={modificarTarea}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Modificar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioEditarTarea;
