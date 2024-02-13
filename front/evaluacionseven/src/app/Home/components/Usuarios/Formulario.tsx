"use client";
import { crearUsuarioAPI } from "@/app/api/UsuarioApi";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

const Formulario = () => {
  const { refresh } = useRouter();
  const [usuario, setUsuario] = useState({ usuario: "", password: "" });
  const crearUsuario = async () => {
    const rspta = await crearUsuarioAPI(usuario);
    if (rspta == "OK") {
      enqueueSnackbar("Se creo el usuario correctamente", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
    setUsuario({ usuario: "", password: "" });
    refresh();
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
          onClick={crearUsuario}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
