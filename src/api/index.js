import axios from '../config/axios';

const register = (body) => {
  return axios.post('/user/register', body)
}

const getUser = (uid) => {
  return axios.get(`/user/${uid}`)
}

const getAllPhoto = () => {
  return axios.get('photo')
}

const getPhotoByUserId = (ownerId) => {
  return axios.get(`/photo/owner/${ownerId}`)
}

export {
  register,
  getUser,
  getAllPhoto,
  getPhotoByUserId
}
