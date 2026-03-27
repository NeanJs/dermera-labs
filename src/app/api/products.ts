import { apiFetch } from "./client";

export const getProducts = async () => {
  return apiFetch("/products");
};

export const getCategories = async () => {
  return apiFetch("/products/categories");
};
