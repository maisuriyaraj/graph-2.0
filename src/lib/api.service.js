import axios from 'axios';


export function getRequest(url, headers) {
    return new Promise((resolve, reject) => {
        axios.get(url, { headers:headers }).then((response) => {
            console.log(response);
            resolve(response)
        }).catch(err => {
            reject(err);
        });
    });
};

export const  postRequest = (url,payload,headers) => {
    return new Promise((resolve,reject)=>{
         try {
             axios.post(url,payload,{headers:headers}).then((response)=>{
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
        axios.put(url, payload, { headers }).then((response) => {
            console.log(response);
            resolve(response)
        }).catch(err => {
            reject(err);
        });
    });
};

export function deleteRequest(url, headers) {
    return new Promise((resolve, reject) => {
        axios.delete(url, payload, { headers }).then((response) => {
            console.log(response);
            resolve(response)
        }).catch(err => {
            reject(err);
        });
    });
};
