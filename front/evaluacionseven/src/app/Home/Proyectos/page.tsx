import React from "react";
import SeccionTickets from "../ui/SeccionTickets";
import TablaProyectos from "../components/Proyectos/TablaProyectos";
import {
  obtenerCantidadProyectos,
  obtenerProyectos,
} from "../../api/ProyectoApi";
import { useSearchParams } from "next/navigation";
import { cookies } from "next/headers";
import { SevenApi } from "@/app/api/ContextApi";

const page = async ({ searchParams }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("Token");
  const pagina = Number(searchParams?.page) || 1;
  const status = Number(searchParams?.status) || 1;
  const listaProyectos = await obtenerProyectos(0, pagina, 5, status, token);
  const cantidades = await obtenerCantidadProyectos(1, token);
  const cantidadPaginas = () => {
    if (status == 1) {
      return cantidades[0].cantidad;
    }
    if (status == 2) {
      return cantidades[3].cantidad;
    }
    if (status == 3) {
      return cantidades[2].cantidad;
    }
    if (status == 4) {
      return cantidades[1].cantidad;
    }
    return 0;
  };
  return (
    <div className="flex flex-col">
      <label className="text-4xl font-bold mb-5">Proyectos</label>
      <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-7">
        <SeccionTickets
          colorFondo={"blue"}
          titulo={cantidades[0].estado}
          subtitulo={"Tickets"}
          cantidad={cantidades[0].cantidad}
          estado={1}
        />
        <SeccionTickets
          colorFondo={"green"}
          titulo={cantidades[3].estado}
          subtitulo={"Tickets"}
          cantidad={cantidades[3].cantidad}
          estado={2}
        />
        <SeccionTickets
          colorFondo={"red"}
          titulo={cantidades[2].estado}
          subtitulo={"Tickets"}
          cantidad={cantidades[2].cantidad}
          estado={3}
        />
        <SeccionTickets
          colorFondo={"grey"}
          titulo={cantidades[1].estado}
          subtitulo={"Tickets"}
          cantidad={cantidades[1].cantidad}
          estado={4}
        />
      </div>
      <div>
        <TablaProyectos
          listaProyectos={listaProyectos}
          cantidad={cantidadPaginas()}
        />
      </div>
    </div>
  );
};

export default page;
