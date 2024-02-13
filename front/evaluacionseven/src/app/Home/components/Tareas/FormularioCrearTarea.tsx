import { obtenerProyectosTotal } from "@/app/api/ProyectoApi";
import { crearTareaApi } from "@/app/api/TareaApi";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const FormularioCrearTarea = ({ onClose }) => {
  const router = useRouter();
  const [tarea, setTarea] = useState({ nombre: "", IdProyecto: "0" });
  const [listaProyectos, setListaProyectos] = useState([]);
  const listaProyecto = () => {
    obtenerProyectosTotal().then((res) => {
      console.log(res);
      setListaProyectos(res);
    });
  };
  useEffect(() => {
    listaProyecto();
  }, []);
  const crearProyecto = async () => {
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
    const rspta = await crearTareaApi(tarea);
    if (rspta == "ProyectoExiste") {
      enqueueSnackbar("Ya existe una tarea con ese nombre", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }
    if (rspta == "OK") {
      enqueueSnackbar("Se creo la tarea correctamente", {
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
            Proyecto
          </label>
          <Select
            label="Seleccionar estado"
            className="max-w-xs"
            selectedKeys={[tarea.IdProyecto]}
            onChange={(e) => {
              setTarea((old) => ({ ...old, IdProyecto: e.target.value }));
            }}
          >
            {listaProyectos.map((proyecto) => (
              <SelectItem key={proyecto.id} value={proyecto.id}>
                {proyecto.nombre}
              </SelectItem>
            ))}
          </Select>
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

export default FormularioCrearTarea;
