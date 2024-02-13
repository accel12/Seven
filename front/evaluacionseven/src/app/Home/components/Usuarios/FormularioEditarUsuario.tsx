"use client";
import { editarUsuarioAPI, obtenerUsuarioAPI } from "@/app/api/UsuarioApi";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const FormularioEditarUsuario = ({ onClose, id }) => {
  const { refresh } = useRouter();
  const [usuario, setUsuario] = useState({
    id: id,
    estado: 0,
    usuario: "",
    password: "",
  });
  const obtenerUsuario = async () => {
    const resultado = await obtenerUsuarioAPI(id);
    console.log(resultado);
    setUsuario({
      id: id,
      estado: resultado.estado,
      usuario: resultado.usuario,
      password: resultado.password,
    });
  };
  useEffect(() => {
    obtenerUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editarUsuario = async () => {
    console.log(usuario);
    const rspta = await editarUsuarioAPI(usuario);
    if (rspta == "OK") {
      enqueueSnackbar("Se edito el usuario correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
    refresh();
    onClose();
  };
  return (
    <div>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            form="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={usuario.usuario}
            disabled
            onChange={(e) => {
              setUsuario((user) => ({ ...user, usuario: e.target.value }));
            }}
            placeholder="Usuario"
            required
          />
        </div>
        <div className="mb-5">
          <label
            form="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={usuario.password}
            onChange={(e) => {
              setUsuario((user) => ({ ...user, password: e.target.value }));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="button"
          onClick={editarUsuario}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Editar
        </button>
      </form>
    </div>
  );
};

export default FormularioEditarUsuario;
