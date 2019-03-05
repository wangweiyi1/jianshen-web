import axios from 'axios';

let base = '';

//线上地址
base = 'https://www.dabaojianshen.com';

// base = 'http://10.1.6.218:8081';
// base = 'http://10.1.6.70:8088';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null && user.token != "") {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = user.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.retCode != null && response.data.retCode == 401) {
      localStorage.removeItem('user');
      location.replace('/');
    } else {
      return response;
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('user');
          location.replace('/login');
        // case 403:
        //     location.replace('/404');
      }
    }
    return Promise.reject(error.response.data);
  });

export const login = params => axios.post(`${base}/security/login`, params);
export const createFitnessRoom = params => axios.post(`${base}/fitnessRoom/createFitnessRoom`, params);
export const updateFitnessRoom = params => axios.post(`${base}/fitnessRoom/updateFitnessRoom`, params);
export const queryFitnessRoomByType = params => axios.post(`${base}/fitnessRoom/queryFitnessRoomByType`, params);
export const removedFitnessRoomById = params => axios.post(`${base}/fitnessRoom/removedFitnessRoomById`, params);
export const uploadprofilePhoto = params => axios.post(`${base}/fitnessRoom/uploadprofilePhoto`, params);
export const uploadDetailsPhoto = params => axios.post(`${base}/fitnessRoom/uploadDetailsPhoto`, params);
export const removedPhoto = params => axios.post(`${base}/fitnessRoom/removedPhoto`, params);
export const queryFitnessRoomById = params => axios.post(`${base}/fitnessRoom/queryFitnessRoomById`, params);
export const creatCards = params => axios.post(`${base}/fitnessRoom/creatCards`, params);
export const updateCards = params => axios.post(`${base}/fitnessRoom/updateCards`, params);
export const removedCard = params => axios.post(`${base}/fitnessRoom/removedCard`, params);
export const creatSport = params => axios.post(`${base}/fitnessRoom/creatSport`, params);
export const updateSport = params => axios.post(`${base}/fitnessRoom/updateSport`, params);
export const removedSport = params => axios.post(`${base}/fitnessRoom/removedSport`, params);
export const listAccount = params => axios.post(`${base}/fitnessRoom/listAccount`, params);
export const updateFitnessRoomActive = params => axios.post(`${base}/fitnessRoom/updateFitnessRoomActive`, params);
export const getOrderListByFitnessId = params => axios.post(`${base}/order/getOrderListByFitnessId`, params);
export const updateOrderByFitnessId = params => axios.post(`${base}/order/updateOrderByFitnessId`, params);

export const queryCoachList = params => axios.post(`${base}/front/list/`, params);
export const listCondition = params => axios.post(`${base}/back/coach/listCondition/`, params);
export const createCoach = params => axios.post(`${base}/back/coach/create/`, params);
export const getSchedule = params => axios.post(`${base}/back/schedule/list/`, params);
export const updateCoach = params => axios.post(`${base}/back/coach/update/`, params);
export const deleteCoach = params => axios.post(`${base}/back/coach/delete/`, params);

export const createUser = params => axios.post(`${base}/user/create`, params);
