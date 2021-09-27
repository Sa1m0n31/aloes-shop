import axios from "axios";
import settings from "./settings";

const { API_URL } = settings;

const getAllProducts = () => {
    return axios.get(`${API_URL}/product/get-all-products`);
}

const getSingleProduct = (id) => {
    return axios.post(`${API_URL}/product/single-product`, { id });
}

const getProductById = (id) => {
    return axios.post(`${API_URL}/product/get-product-by-id`, { id });
}

const getProductByName = (name) => {
    return axios.post(`${API_URL}/product/get-product-by-name`, { name });
}

const getProductsByCategory = (id) => {
    return axios.post(`${API_URL}/product/get-products-by-category`, { id });
}

const getProductByCategories = (categoriesIds) => {
    return axios.post(`${API_URL}/product/get-products-by-categories`, { ids: categoriesIds });
}

const getImageById = (id) => {
    return axios.post(`${API_URL}/product/get-image`, { id });
}

const getRecommendations = () => {
    return axios.get(`${API_URL}/product/get-recommendations`);
}

const getDiscounts = () => {
    return axios.get(`${API_URL}/product/get-discounts`);
}

const showAddedToCartModal = () => {
    document.querySelector(".addedToCart").style.opacity = "1";
    document.querySelector(".addedToCart").style.zIndex = "100";
}

const hideAddedToCartModal = () => {
    document.querySelector(".addedToCart").style.opacity = "0";
    setTimeout(() => {
        document.querySelector(".addedToCart").style.zIndex = "02";
    }, 500);
}

export { getAllProducts, getSingleProduct, getProductByName, getProductsByCategory, getImageById, getProductById, getRecommendations, getDiscounts, showAddedToCartModal, hideAddedToCartModal };
