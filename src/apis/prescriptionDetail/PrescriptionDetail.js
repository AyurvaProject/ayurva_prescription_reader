import axios from "axios";
import { API_URL } from "../../constants/keys";

export const CreatePrescriptionDetail = async (data) => {
    const response = await axios.post(`${API_URL}/prescription-detail`, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const UpdatePrescriptionDetail = async (id, data) => {
    const response = await axios.patch(`${API_URL}/prescription-detail/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const GetPrescriptionDetail = async (id) => {
    const response = await axios.get(`${API_URL}/prescription-detail/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const DeletePrescriptionDetail = async (id) => {
    const response = await axios.delete(`${API_URL}/prescription-detail/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const GetPrescriptionDetailsByPrescriptionId = async (id) => {
    const response = await axios.get(`${API_URL}/prescription-detail/get/pres-details-by-prescription/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}