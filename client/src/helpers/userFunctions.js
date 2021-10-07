import axios from "axios";
import settings from "./settings";

const { API_URL } = settings;

const addUser = (email, password, fullName, phoneNumber, address, postalCode, city, companyName, nip, companyAddress, companyPostalCode, companyCity) => {
    return axios.post(`${API_URL}/auth/add-user`, {
        email, password, fullName, phoneNumber, address, postalCode, city,
        companyName, nip, companyAddress, companyPostalCode, companyCity
    });
}

const getUserData = (id) => {
    return axios.post(`${API_URL}/user/get-user`, { id });
}

const getUserOrders = (id) => {
    return axios.post(`${API_URL}/user/get-user-orders`, { id });
}

const getOrderSells = (id) => {
    return axios.get(`${API_URL}/order/get-order-sells`, {
        params: {
            id
        }
    });
}

const loginUser = (username, password) => {
    return axios.post(`${API_URL}/auth/login-user`, {
        username, password
    });
}

const changeUserPassword = (id, oldPassword, newPassword) => {
    return axios.post(`${API_URL}/user/change-user-password`, { id, oldPassword, newPassword });
}

const updateUser = (id, fullName, phoneNumber, address, postalCode, city) => {
    return axios.post(`${API_URL}/user/update-user`, {
        id, fullName, phoneNumber, postalCode, address, city
    });
}

const updateCompany = (id, companyName, nip, companyAddress, companyPostalCode, companyCity) => {
    return axios.post(`${API_URL}/user/update-company-data`, {
        id, companyName, nip, companyAddress, companyPostalCode, companyCity
    });
}

const userLogout = (sessionKey) => {
    return axios.post(`${API_URL}/auth/logout`, { sessionKey });
}

export { addUser, loginUser, changeUserPassword, getUserData, getUserOrders, updateUser, userLogout, updateCompany, getOrderSells }
