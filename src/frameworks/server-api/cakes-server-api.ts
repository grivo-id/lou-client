'use server'
import { api } from "../api-config";

export const getCakeByName = async (cakeName: string) => {
  try {
    const response = await api.get(`/cakes/name/${cakeName}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
