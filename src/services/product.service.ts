import axios from "axios";
import IProduct from "../models/Product";

export const productService = {
  getAll,
  create,
  get,
  remove,
  update,
  getProductQuantity,
};

async function getAll() {
  return axios
    .get(`${import.meta.env.VITE_PRODUCT_MOCK_API_URL}/product`)
    .then((reponse) => reponse.data);
}

async function create(product: IProduct) {
  return axios.post(
    `${import.meta.env.VITE_PRODUCT_MOCK_API_URL}/product`,
    product
  );
}

async function remove(id: string) {
  return axios.delete(
    `${import.meta.env.VITE_PRODUCT_MOCK_API_URL}/product/${id}`
  );
}

async function get(id: string) {
  return axios
    .get(`${import.meta.env.VITE_PRODUCT_MOCK_API_URL}/product/${id}`)
    .then((reponse) => reponse.data);
}

async function update(product: IProduct) {
  return axios.put(
    `${import.meta.env.VITE_PRODUCT_MOCK_API_URL}/product/${product.id}`,
    product
  );
}

async function getProductQuantity() {
  const products: IProduct[] = await getAll();

  return products.length;
}
