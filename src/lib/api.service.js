import axios from 'axios';

const BASE_URL = "https://graphcommunity.vercel.app/"
// const BASE_URL = "http://localhost:3000/"

export function getRequest(url, headers) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + url, { headers: headers }).then((response) => {
            console.log(response);
            resolve(response)
        }).catch(err => {
            reject(err);
        });
    });
};

export const postRequest = (url, payload, headers) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post(BASE_URL + url, payload, { headers: headers }).then((response) => {
                console.log(response);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        } catch (error) {
            console.log(error);
        }
    })
}

export function putRequest(url, payload, headers) {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + url, payload, { headers: headers }).then((response) => {
            console.log(response);
            resolve(response)
        }).catch(err => {
            reject(err);
        });
    });
};

export function deleteRequest(url, headers) {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + url, payload, { headers: headers }).then((response) => {
            console.log(response);
            resolve(response)
        }).catch(err => {
            reject(err);
        });
    });
};
