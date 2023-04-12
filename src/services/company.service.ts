import axios from "axios";
import ICompany from "../models/Company";
export const companyService = { getAll, create, remove };

async function getAll() {
  return axios
    .get(`${import.meta.env.VITE_MOCK_API_URL}/companies`)
    .then((reponse) => reponse.data)
    .catch((error) => console.error(error));
}

async function create(company: ICompany) {
  return axios.post(`${import.meta.env.VITE_MOCK_API_URL}/companies`, company);
}

async function remove(id: string) {
  return axios.delete(`${import.meta.env.VITE_MOCK_API_URL}/companies/${id}`);
}
