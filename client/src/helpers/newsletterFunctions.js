import axios from "axios";
import settings from "./settings";

const { API_URL } = settings;

const addEmailToNewsletter = (email) => {
    return axios.post(`${API_URL}/newsletter/add`, { email }, {
        headers: {
            'Authorization': process.env.REACT_APP_AUTH_HEADER
        }
    });
}

export { addEmailToNewsletter }
