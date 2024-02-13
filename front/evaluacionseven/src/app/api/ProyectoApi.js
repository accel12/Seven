import { SevenApi } from "./ContextApi";
export const obtenerProyectos = async (
  idUser,
  page,
  tamanio,
  status,
  token
) => {
  try {
    console.log("token");
    console.log(token.value);
    const rspta = await SevenApi.get(
      `/Proyectos/${idUser}/${page}/${tamanio}/${status}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const obtenerProyectosTotal = async () => {
  try {
    const rspta = await SevenApi.get(`/Proyectos/ObtenerProyectosCompleto`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const obtenerProyecto = async (id) => {
  try {
    const rspta = await SevenApi.get(`/Proyectos/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const crearProyectoApi = async (proyecto) => {
  try {
    const rspta = await SevenApi.post("/Proyectos", proyecto);

    return rspta.data;
  } catch (error) {
    console.log("mal");
    return "ErrorConexion";
  }
};

export const modificarProyectoApi = async (proyecto, accion) => {
  try {
    console.log(accion);
    const rspta = await SevenApi.put(`/Proyectos/${1}`, proyecto);
    return rspta.data;
  } catch (error) {
    console.log("mal");
    return "ErrorConexion";
  }
};

export const obtenerCantidadProyectos = async (id, token) => {
  try {
    const rspta = await SevenApi.get("/Proyectos/ObtenerCantidadesProyectos", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};
export const obtenerEstados = async () => {
  try {
    console.log("ingreso");
    const rspta = await SevenApi.get("/Proyectos/ObtenerEstados");
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const ObtenerUsuariosVinculados = async (id) => {
  try {
    const rspta = await SevenApi.get(
      `/Proyectos/ObtenerUsuariosVinculados/${id}`
    );
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const AgregarUsuariosVinculados = async (idProyecto, idUsuario) => {
  console.log(idProyecto);
  console.log(idUsuario);
  try {
    const rspta = await SevenApi.post(
      `/Proyectos/AgregarUsuariosVinculados/${idProyecto}/${idUsuario}`
    );
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const EliminarUsuariosVinculados = async (id) => {
  try {
    const rspta = await SevenApi.delete(
      `/Proyectos/EliminarUsuariosVinculados/${id}`
    );
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const EliminarProyecto = async (id) => {
  try {
    const rspta = await SevenApi.delete(`/Proyectos/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};
