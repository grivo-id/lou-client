"use server";
import { AddOns, Cake, CakeDetails, Variants } from "@/types/data-types";
import { api } from "../api-config";

type SuccessResponse = {
  success: true;
  data: {
    cake: Cake;
    aboutCake: CakeDetails;
    variants: Variants[];
  };
  error: null;
};

type ErrorResponse = {
  success: false;
  data: {};
  error: any;
};

type ResultType = SuccessResponse | ErrorResponse;

export const getServerCakeByName = async (cakeName: string): Promise<ResultType> => {
  try {
    const response = await api.get(`/cakes/name/${cakeName}`);
    return {
      success: true,
      data: response.data.data,
      error: null,
    };
  } catch (error: any) {
    // console.error(error);
    return {
      success: false,
      data: {},
      error: error.response?.data?.message || error.message || "Failed to fetch cake",
    };
  }
};

type AddOnsSuccessResponse = {
  success: true;
  data: AddOns[];

  error: null;
};

type AddOnsErrorResponse = {
  success: false;
  data: [];
  error: any;
};

type AddOnsResultType = AddOnsSuccessResponse | AddOnsErrorResponse;

export const getServerAllAddOns = async (): Promise<AddOnsResultType> => {
  try {
    const response = await api.get("/add-ons");
    return {
      success: true,
      data: response.data.data,
      error: null,
    };
  } catch (error: any) {
    // console.error(error);
    return {
      success: false,
      data: [],
      error: error.response?.data?.message || error.message || "Failed to fetch add-ons",
    };
  }
};
