import axios from "axios";
import ICompany from "../models/Company";

export const companyService = {
  getAll,
  create,
  remove,
  get,
  update,
  getAsDropdown,
};

async function getAll() {
  return axios
    .get(`${import.meta.env.VITE_MOCK_API_URL}/companies`)
    .then((reponse) => reponse.data);
}

async function create(company: ICompany) {
  return axios.post(`${import.meta.env.VITE_MOCK_API_URL}/companies`, company);
}

async function remove(id: string) {
  return axios.delete(`${import.meta.env.VITE_MOCK_API_URL}/companies/${id}`);
}

async function get(id: string) {
  return axios
    .get(`${import.meta.env.VITE_MOCK_API_URL}/companies/${id}`)
    .then((reponse) => reponse.data);
}

async function update(company: ICompany) {
  return axios.put(
    `${import.meta.env.VITE_MOCK_API_URL}/companies/${company.id}`,
    company
  );
}

async function getAsDropdown() {
  const companies: ICompany[] = await getAll();
  const companiesDropdown = [
    ...new Set(
      companies.map((company) => {
        return { label: company.name, value: company.id };
      })
    ),
  ].sort();

  return companiesDropdown;
}
