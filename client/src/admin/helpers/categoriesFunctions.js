import axios from "axios";
import settings from "./settings";

const { API_URL } = settings;

const getAllCategories = () => {
    return axios.get(`${API_URL}/category/get-all`);
}

const deleteCategory = (id) => {
    return axios.post(`${API_URL}/category/delete`, {
        id
    });
}

const getCategory = (id) => {
    return axios.post(`${API_URL}/category/category-details`, { id });
}

const getAllParentCategories = () => {
    return axios.get(`${API_URL}/category/get-all-parent-categories`);
}

const getCategoryBySlug = (categorySlug) => {
    return axios.post(`${settings.API_URL}/category/get-category-by-slug`, { slug: categorySlug, parent: null });
}

export { getAllCategories, deleteCategory, getCategory, getAllParentCategories, getCategoryBySlug };
