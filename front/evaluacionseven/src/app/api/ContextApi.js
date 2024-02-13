import axios from "axios";
const SevenApi = axios.create({
  baseURL: "http://localhost:5143/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// const interceptor = (token) => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   // SevenApi.interceptors.request.use(
//   //   (config) => {
//   //     // const cookieStore = cookies();
//   //     // const token = 123;
//   //     console.log(config);
//   //     if (token != "" || token != null) {
//   //       console.log("ingreso");
//   //       config.headers["Authorization"] = `Bearer ${token}`;
//   //     }

//   //     return config;
//   //   },
//   //   (error) => {
//   //     console.log(error);
//   //     return Promise.reject(error);
//   //   }
//   // );
// };

export { SevenApi };
// export const actualizarTokenHeader = async (token) => {
//   SevenApi.defaults.headers.common = { Authorization: `bearer ${token}` };
//   return "OK";
// };
// export const actualizarTokenHeader = async (token) => {
//   SevenApi.interceptors.request.use(
//     (config) => {
//       // Do something before request is sent

//       config.headers["Authorization"] = "bearer " + token();
//       return config;
//     },
//     (error) => {
//       Promise.reject(error);
//     }
//   );
// };
