import axios from 'axios';

class Client {
    constructor(config) {
        const instance = axios.create(config);
        instance.interceptors.response.use( (response)=> {
           return JSON.parse(JSON.stringify(response.data || null));
        });
        this.client = instance;
    }

    async get(path) {
        try {
            return await this.client.get(path);
        }catch (error) {
            console.log(error)
        }
    }

    async put(path, data) {
        try {
            return await this.client.put(path, data);
        }catch (error) {
            console.log(error);
        }
    }

    async delete(path) {
        try {
            return await this.client.delete(path);
        }catch (error) {
            console.log(error);
        }
    }

    async create(path, data) {
        try{
            return await this.client.post(path, data);
        }catch (error){
            console.log(error);
        }
    }
}

export default Client;