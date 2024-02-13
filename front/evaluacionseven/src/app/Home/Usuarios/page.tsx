import React from "react";
import Formulario from "../components/Usuarios/Formulario";
import TablaUsuarios from "../components/Usuarios/TablaUsuarios";
import { obtenerUsuarios } from "@/app/api/UsuarioApi";

const page = () => {
  return (
    <div>
      <label className="text-4xl font-bold">Usuarios</label>
      <div className="grid gap-7 grid-flow-row sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 mt-6">
        <div>
          <Formulario />
        </div>
        <div>
          <TablaUsuarios />
        </div>
      </div>
    </div>
  );
};

export default page;
