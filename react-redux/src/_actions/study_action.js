import axios from 'axios';
import {
    REGISTER_STUDY
} from './types';

export function registStudy(dataToSubmit) {
    const request = axios.post('http://localhost:5000/api/studies/register', dataToSubmit)
    .then(response => response.data)
    return {
        type: REGISTER_STUDY,
        payload: request
    }
}