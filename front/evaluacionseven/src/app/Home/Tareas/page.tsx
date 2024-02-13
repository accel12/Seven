import React from "react";
import SeccionTickets from "../ui/SeccionTickets";
import TablaTareas from "../components/Tareas/TablaTareas";
import { obtenerCantidadTareas, obtenerTareas } from "@/app/api/TareaApi";
import { useSearchParams } from "next/navigation";
const page = async ({ searchParams }) => {
  const pagina = Number(searchParams?.page) || 1;
  const status = Number(searchParams?.status) || 1;
  const listaTareas = await obtenerTareas(0, pagina, 5, status);
  const cantidades = await obtenerCantidadTareas();
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
      <label className="text-4xl font-bold mb-5">Tareas</label>
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
        <TablaTareas listaTareas={listaTareas} cantidad={cantidadPaginas()} />
      </div>
    </div>
  );
};

export default page;
