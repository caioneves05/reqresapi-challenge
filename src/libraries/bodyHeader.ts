import { Axios } from "axios";

export const bodyHeader = () => new Axios({
    baseURL: 'https://reqres.in/api',
    headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json; charset=utf-8'
    },
    transformRequest: (data) => JSON.stringify(data),
    transformResponse: (data) => {
        try{
            return JSON.parse(data)
        } catch(err){
            return data
        }
    }
})