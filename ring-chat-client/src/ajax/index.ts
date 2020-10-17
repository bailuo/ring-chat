import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    function(config: any) {
        config.dataType =  config.dataType || 'json';
        return config;
    },
    function(error: any) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function(response: any) {
        if (response && response.data) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject('response does not exist');
        }
    },
    function(error: any) {
        return Promise.reject(error);
    }
);

export default instance as any;
