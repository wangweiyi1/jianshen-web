import axios from 'axios';

let base = '';

// base = 'https://apicem.pepsico.com.cn';
base = 'http://10.1.6.214:8081';

//http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     let user = JSON.parse(localStorage.getItem('user'));
//     if (user != null && user.token != "") {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = user.token;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );
//
// //响应拦截器
// axios.interceptors.response.use(
//   response => {
//     if (response.data.retCode != null && response.data.retCode == 401) {
//       localStorage.removeItem('user');
//       location.replace('/');
//     } else {
//       return response;
//     }
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           localStorage.removeItem('user');
//           location.replace('/login');
//         // case 403:
//         //     location.replace('/404');
//       }
//     }
//     return Promise.reject(error.response.data);
//   });

export const login = params => axios.post(`${base}/security/login`, params);
export const createFitnessRoom = params => axios.post(`${base}/fitnessRoom/createFitnessRoom`, params);
export const removedFitnessRoomById = params => axios.post(`${base}/fitnessRoom/removedFitnessRoomById`, params);
export const queryFitnessRoomById = params => axios.post(`${base}/fitnessRoom/queryFitnessRoomById`, params);
export const creatCards = params => axios.post(`${base}/fitnessRoom/creatCards`, params);
export const removedCard = params => axios.post(`${base}/fitnessRoom/removedCard`, params);
export const creatSport = params => axios.post(`${base}/fitnessRoom/creatSport`, params);
export const removedSport = params => axios.post(`${base}/fitnessRoom/removedSport`, params);
