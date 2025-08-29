import axios from "axios";
import { API_URL } from "../../constants/keys";

export const GetAllProducts = async () => {
    const response = await axios.get(`${API_URL}/products/get/all-products`)

    return response.data.data;
}