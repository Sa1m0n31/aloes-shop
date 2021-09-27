import axios from "axios";
import settings from "./settings";

const { API_URL } = settings;

const addUser = (email, password, fullName, phoneNumber, address, postalCode, city, companyName, nip, companyAddress, companyPostalCode, companyCity) => {
    return axios.post(`${API_URL}/auth/add-user`, {
        email, password, fullName, phoneNumber, address, postalCode, city,
        companyName, nip, companyAddress, companyPostalCode, companyCity
    });
}

const loginUser = (username, password) => {
    return axios.post(`${API_URL}/auth/login-user`, {
        username, password
    });
}

export { addUser, loginUser }
