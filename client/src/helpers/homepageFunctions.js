import axios from "axios";
import settings from "./settings";

const { API_URL } = settings;

const getBanners = () => {
    return axios.get(`${API_URL}/homepage/get-all`, {
        params: {
            test: "test"
        }
    });
}

export { getBanners }
