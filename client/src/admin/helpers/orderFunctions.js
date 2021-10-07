import axios from "axios";
import settings from "./settings";

const { API_URL } = settings;

const getAllOrders = () => {
    return axios.get(`${API_URL}/order/get-orders`);
}

const getOrderDetails = (id) => {
    return axios.post(`${API_URL}/order/get-order`, { id });
}

const addNewOrder = (payment, shipping, address, postalCode, city, user,
                     comment, sessionId, companyName, nip, companyAddress,
                     companyPostalCode, companyCity, amount,
                     inPostAddress, inPostCode, inPostCity) => {
    console.log("addNewOrder");
    return axios.post(`${API_URL}/order/add`, {
        paymentMethod: payment,
        shippingMethod: shipping,
        address,
        postalCode,
        city,
        user,
        comment,
        sessionId,
        companyName,
        nip,
        companyAddress,
        companyCity,
        companyPostalCode,
        amount,
        inPostAddress,
        inPostCode,
        inPostCity
    })
}

const calculateCartSum = (cart) => {
    let sum = 0;
    cart.forEach(item => {
        const quantity = item.amount;
        const price = item.price;
        sum += quantity * price;
    });
    return sum;
}

const deleteOrderById = (id) => {
    return axios.post(`${API_URL}/order/delete`, { id });
}

const getRibbons = (id) => {
    return axios.post(`${API_URL}/order/get-ribbons`, { id });
}

const checkCouponCode = (code) => {
    return axios.post(`${settings.API_URL}/coupon/verify`, {
        code
    })
}

const changePaymentId = (id, paymentId) => {
    return axios.post(`${API_URL}/order/change-payment-id`, {id, paymentId});
}

const addSell = (orderId, item, paymentMethod) => {
    return  axios.post(`${settings.API_URL}/order/add-sell`, {
        orderId,
        productId: item.id,
        size: item.size,
        quantity: item.amount,
        paymentMethod
    })
}

const updatePaymentStatus = (id, status) => {
    return axios.post(`${API_URL}/order/change-payment-status`, { id, status });
}

const changePaymentLink = (id, link) => {
    return axios.post(`${API_URL}/order/change-payment-link`, {
        id, link
    });
}

const sendOrderInfo = (orderId) => {
    return axios.post(`${API_URL}/order/send-order-info`, {
        orderId
    });
}

export { addSell, getAllOrders, getOrderDetails, calculateCartSum, deleteOrderById, getRibbons, checkCouponCode, addNewOrder, changePaymentId, updatePaymentStatus, changePaymentLink, sendOrderInfo };
