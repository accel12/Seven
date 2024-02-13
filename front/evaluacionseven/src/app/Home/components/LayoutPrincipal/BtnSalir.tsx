"use client";
import { useRouter } from "next/navigation";
import React from "react";

const BtnSalir = () => {
  const router = useRouter();
  const Salir = () => {
    document.cookie = "Token=";
    router.push("/");
  };
  return (
    <div>
      <button
        type="button"
        className="flex text-sm px-4 py-2 bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 text-white"
        aria-expanded="false"
        data-dropdown-toggle="dropdown-user"
        onClick={Salir}
      >
        Salir
      </button>
    </div>
  );
};

export default BtnSalir;
