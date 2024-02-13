import { SevenApi } from "./ContextApi";

export const obtenerTareas = async (idUser, page, tamanio, status) => {
  try {
    const rspta = await SevenApi.get(
      `/Tareas/${idUser}/${page}/${tamanio}/${status}`
    );

    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const obtenerTareasCompleto = async (id) => {
  try {
    const rspta = await SevenApi.get(`/Tareas/ObtenerTareasCompleto/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const obtenerTarea = async (id) => {
  try {
    const rspta = await SevenApi.get(`/Tareas/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const crearTareaApi = async (tarea) => {
  try {
    const rspta = await SevenApi.post("/Tareas", tarea);

    return rspta.data;
  } catch (error) {
    console.log("mal");
    return "ErrorConexion";
  }
};

export const modificarTareaApi = async (tarea) => {
  try {
    console.log(tarea);
    const rspta = await SevenApi.put(`/Tareas`, tarea);
    return rspta.data;
  } catch (error) {
    console.log("mal");
    return "ErrorConexion";
  }
};

export const obtenerCantidadTareas = async () => {
  try {
    const rspta = await SevenApi.get("/Tareas/ObtenerCantidadesTareas");
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const obtenerComentarios = async (id) => {
  try {
    const rspta = await SevenApi.get(`/Tareas/ObtenerListaComentarios/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const agregarComentario = async (comentario) => {
  console.log(comentario);
  try {
    const rspta = await SevenApi.post("/Tareas/AgregarComentario", comentario);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};
export const editarComentario = async (comentario) => {
  try {
    const rspta = await SevenApi.put("/Tareas/EditarComentario", comentario);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const eliminarComentario = async (id) => {
  try {
    const rspta = await SevenApi.delete(`/Tareas/EliminarComentario/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const eliminarTarea = async (id) => {
  try {
    const rspta = await SevenApi.delete(`/Tareas/EliminarTarea/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};
