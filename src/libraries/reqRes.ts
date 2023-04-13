import { Axios, AxiosResponse } from 'axios'
import { bodyHeader } from "./bodyHeader";
import { Request } from './types';

export class reqResApi {
    client: Axios    
    constructor(client: Axios) {
        this.client = client
    }

    public async getAllUsers(): Promise<AxiosResponse>{
        const client  = this.client
        const request = await client.get('/users')
        return await request.data
    }

    public async getUserId(id: number): Promise<AxiosResponse> {
        const client = this.client
        const request = await client.get(`/users/${id}`)
        return await request.data
    }

    public async createUser(userData: Request.createUser): Promise<AxiosResponse>{
        const client = this.client
        const request = await client.post('/users')
        return await request.data
    }
    
    //create method to retrieve avatar by url
}