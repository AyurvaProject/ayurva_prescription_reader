import axios from "axios";
import { API_URL } from "../../constants/keys";
import { GetCurrentUser } from "../auth/Auth";

export const GetAllPendingPrs = async () => {
    const response = await axios.get(`${API_URL}/prescriptions/get/pending-prescriptions`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    console.log("Prescription Data: ", response.data.data);
    return response.data.data;
}

export const GetPendingPrsById = async () => {
    const response = await axios.get(`${API_URL}/prescriptions/get/pending-prescriptions/${GetCurrentUser()?.id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    return response.data.data;
}

export const GetReadPrsById = async () => {
    const response = await axios.get(`${API_URL}/prescriptions/get/read-prescriptions/${GetCurrentUser()?.id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    return response.data.data;
}

export const GetRejectedPrsById = async () => {
    const response = await axios.get(`${API_URL}/prescriptions/get/rejected-prescriptions/${GetCurrentUser()?.id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    return response.data.data;
}

export const AssignPrForPrescriptiption = async (presId) => {
    await axios.post(`${API_URL}/prescriptions/assign-pr/${presId}/${GetCurrentUser()?.id}`,{},{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export const GetOnePres = async (id) => {
    const response = await axios.get(`${API_URL}/prescriptions/${id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const ChangePrescriptionStatus = async(id, status) => {
    await axios.post(`${API_URL}/prescriptions/change-prescription-status/${id}/${status}`,{},{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
}
