import axios from "axios";
import settings from "./settings";

const { API_URL } = settings;

const getPaymentData = () => {
    return axios.get(`${API_URL}/payment/get-data`);
}

const changePaymentData = ({marchantId, crc, apiKey}) => {
    return axios.post(`${API_URL}/payment/change-data`, {
       marchantId,
       crc,
       apiKey
    });
}

const getPaymentStatus = (paymentId = 'NO27-5N2-NHH-WW2') => {
    return axios.post(`${API_URL}/payment/get-payment-status`, { paymentId });
}



export { getPaymentData, changePaymentData, getPaymentStatus };
