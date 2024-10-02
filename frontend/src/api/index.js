import axios from "axios";

const api = axios.create({ 
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

export default {
    getSearchFlights: (params) => api.get("/search", { params }),
    getUserById: (id) => api.get(`/user/${id}`),
    getuserByName: (name) => api.get(`/user/name/${name}`),
    createUser: (data) => api.post("/user", data),
    updateUserById: (id, data) => api.put(`/user/${id}`, data),
    deleteUserById: (id) => api.delete(`/user/${id}`),
}