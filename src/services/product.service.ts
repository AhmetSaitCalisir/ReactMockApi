import axios from "axios";

export const productService = { getAll };

async function getAll() {
  return axios
    .get(`${import.meta.env.VITE_PRODUCT_MOCK_API_URL}/product`)
    .then((reponse) => reponse.data);
}
