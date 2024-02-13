import { SevenApi } from "./ContextApi";

export const iniciarSesionApi = async (usuario) => {
  console.log(usuario);
  try {
    const rspta = await SevenApi.post("/Usuario/IniciarSesion", usuario);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const obtenerUsuarios = async () => {
  try {
    const rspta = await SevenApi.get("/Usuario");
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const obtenerUsuarioAPI = async (id) => {
  try {
    const rspta = await SevenApi.get(`/Usuario/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const obtenerUsuariosProyecto = async (id) => {
  try {
    const rspta = await SevenApi.get(`/Usuario/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const obtenerUsuariosLibres = async (id) => {
  try {
    const rspta = await SevenApi.get(
      `/Usuario/ObtenerUsuariosLibresProyecto/${id}`
    );
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const crearUsuarioAPI = async (usuario) => {
  console.log(usuario);
  try {
    const rspta = await SevenApi.post("/Usuario", usuario);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const editarUsuarioAPI = async (usuario) => {
  try {
    const rspta = await SevenApi.put("/Usuario", usuario);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};

export const eliminarUsuarioAPI = async (id) => {
  try {
    const rspta = await SevenApi.delete(`/Usuario/${id}`);
    return rspta.data;
  } catch (error) {
    return "ErrorConexion";
  }
};
