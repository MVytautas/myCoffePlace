import axios, { AxiosResponse } from 'axios';
import { url } from 'inspector';
import { ICoffee } from '../models/coffee';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Coffees = {
    list: (): Promise<ICoffee[]> => requests.get('/coffies'),
    details: (id: string) => requests.get(`/coffies/${id}`),
    create: (coffee: ICoffee) => requests.post('/coffies/', coffee),
    update: (coffee: ICoffee) => requests.put(`/coffies/${coffee.id}`, coffee),
    delete: (id: string) => requests.delete(`/coffies/${id}`)
}

export default {
    Coffees
}