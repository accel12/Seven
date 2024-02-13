import {
  AgregarUsuariosVinculados,
  obtenerProyectosTotal,
} from "@/app/api/ProyectoApi";
import { crearTareaApi } from "@/app/api/TareaApi";
import {
  obtenerUsuarioAPI,
  obtenerUsuariosLibres,
  obtenerUsuariosProyecto,
} from "@/app/api/UsuarioApi";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const VincularUsuario = ({ onClose, id, obtenerListaUsuarios }) => {
  const router = useRouter();
  const [usuario, setTarea] = useState({ nombre: "", IdUsuario: "0" });
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const listaProyecto = () => {
    obtenerUsuariosLibres(id).then((res) => {
      console.log(res);
      setListaUsuarios(res);
    });
  };
  useEffect(() => {
    listaProyecto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const crearProyecto = async () => {
    const rspta = await AgregarUsuariosVinculados(id, usuario.IdUsuario);
    if (rspta == "ProyectoExiste") {
      enqueueSnackbar("Ya existe una usuario con ese nombre", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return;
    }
    if (rspta == "OK") {
      enqueueSnackbar("Se creo la usuario correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      onClose();
      obtenerListaUsuarios();
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
            Usuario
          </label>
          <Select
            label="Seleccionar usuario"
            className="max-w-xs"
            selectedKeys={[usuario.IdUsuario]}
            onChange={(e) => {
              setTarea((old) => ({ ...old, IdUsuario: e.target.value }));
            }}
          >
            {listaUsuarios.map((usuario) => (
              <SelectItem key={usuario.id} value={usuario.id}>
                {usuario.usuario}
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

export default VincularUsuario;
