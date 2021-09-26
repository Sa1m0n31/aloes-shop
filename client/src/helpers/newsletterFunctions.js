import axios from "axios";
import settings from "./settings";

const { API_URL } = settings;

const addEmailToNewsletter = (email) => {
    return axios.post(`${settings.API_URL}/newsletter/add`, { email });
}

export { addEmailToNewsletter }
