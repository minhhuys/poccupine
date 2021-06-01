import { fetchAPI } from "@/api";
import * as constants from "@/mixins/constants";


export const login = (params) => {
    const url = process.env.VUE_APP_API_URL;
    const endpoint = constants.API_ENDPOINT.login;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
  return fetchAPI(url, endpoint, '', options);
};

export const places = (token) => {
    const url = process.env.VUE_APP_API_URL;
    const endpoint = constants.API_ENDPOINT.places;
    const options = {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }
  return fetchAPI(url, endpoint, '', options);
};