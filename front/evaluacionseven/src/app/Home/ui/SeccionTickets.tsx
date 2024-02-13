"use client";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";

const SeccionTickets = ({
  colorFondo,
  titulo,
  subtitulo,
  cantidad,
  estado,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();
  const cambiarEstado = () => {
    const params = new URLSearchParams(searchParams);
    console.log(params);
    console.log(estado);
    if (estado > 1) {
      params.set("status", estado);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
    refresh();
  };
  return (
    <Button
      style={{ backgroundColor: colorFondo, height: 80 }}
      onClick={cambiarEstado}
    >
      <div className="flex w-full flex-row text-white">
        <div className="flex flex-col justify-start text-start">
          <h3 className="font-bold text-sm">{titulo}</h3>
          <h4 className="font-bold text-opacity-40 text-white text-xs">
            {subtitulo}
          </h4>
        </div>
        <div className="flex justify-end flex-1 items-center text-3xl font-bold">
          {cantidad}
        </div>
      </div>
    </Button>
    // <Button
    //   type="button"
    //   className=""
    //   style={{ backgroundColor: colorFondo, height: 80 }}
    // >
    //   <div className="flex w-full flex-row text-white">
    //     <div className="flex flex-col justify-start text-start">
    //       <h3 className="font-bold text-sm">{titulo}</h3>
    //       <h4 className="font-bold text-opacity-40 text-white text-xs">
    //         {subtitulo}
    //       </h4>
    //     </div>
    //     <div className="flex justify-end flex-1 items-center text-3xl font-bold">
    //       {cantidad}
    //     </div>
    //   </div>
    // </Button>
  );
};

export default SeccionTickets;
