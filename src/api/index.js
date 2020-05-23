import axios from '../config/axios';

const register = (body) => {
  return axios.post('/user/register', body)
}

const getUser = (id) => {
  return axios.get(`/user/${id}`)
}

//Photo api
const getAllPhoto = () => {
  return axios.get('photo')
}

const getPhotoByUserId = (ownerId) => {
  return axios.get(`/photo/owner/${ownerId}`)
}

const editPhotoDescription = (id, body) => {
  return axios.put(`/photo/edit/${id}`, body)
}

const deletePhoto = (id) => {
  return axios.delete(`/photo/delete/${id}`)
}

const uploadPhoto = (body) => {
  return axios.post(`/photo/upload`, body)
}

export {
  register,
  getUser,
  getAllPhoto,
  getPhotoByUserId,
  editPhotoDescription,
  deletePhoto,
  uploadPhoto
}
