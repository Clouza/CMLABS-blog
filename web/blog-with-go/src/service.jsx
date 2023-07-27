import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/v1";

async function getRecords() {
    return await axios.get(`${BASE_URL}/records`);
}

async function getRecord(slug) {
    return await axios.get(`${BASE_URL}/record/${slug}`);
}

async function createRecord(paper) {
    return await axios.post(`${BASE_URL}/record`, paper);
}

async function updateRecord(paper) {
    return await axios.put(`${BASE_URL}/record`, paper);
}

async function deleteRecord(slug) {
    await validateKey(sessionStorage.getItem("key"))
        .catch(() => {
            sessionStorage.clear();
            window.location.href = "/login";
            return;
        });

    return await axios.delete(`${BASE_URL}/record/${slug}`);
}

async function validateKey(key) {
    return await axios.get(`${BASE_URL}/validate-key?key=${key}`);
}

export const api = {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
    validateKey
};