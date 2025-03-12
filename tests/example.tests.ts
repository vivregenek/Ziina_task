import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {CreatePaymentIntentRequest} from "../models/CreatePaymentIntentRequest";
import {CreatePaymentIntentResponse} from "../models/CreatePaymentIntentResponse";
describe('positive validation', () => {
    let axiosInstance: AxiosInstance;
    const token = 'blahblahblah';
    beforeAll(async () => {
        axiosInstance = axios.create();
        axiosInstance.defaults.baseURL = 'https://api-v2.ziina.com/api';
        axiosInstance.defaults.validateStatus = function (status) {
            return status === 201;
        };
        axiosInstance.defaults.headers['Content-Type'] =
            'application/json';
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    })
    test('', async () => {
        const date = Date.now().toString();
        const request: CreatePaymentIntentRequest = {
            amount: 1050,
            currency_code: 'AED',
            message: 'test message',
            success_url: 'https://successurl.de',
            cancel_url: 'https://cancelurl.de',
            failure_url: 'https://failureurl.de',
            test: true,
            transaction_source: 'directApi',
            expiry: date,
        }
        const response = (await axiosInstance.post('/payment_intent', request)).data as CreatePaymentIntentResponse;
        const expectedResponse: CreatePaymentIntentResponse = {
            id: expect.any(String),
            account_id: expect.any(String),
            amount: request.amount,
            currency_code: request.currency_code,
            message: request.message,
            created_at: expect.any(String),
            status: 'requires_payment_instrument',
            operation_id: expect.any(String),
            redirect_url: `https://pay.ziina.com/payment_intent/${response.id}`,
            success_url: 'https://successurl.de',
            cancel_url: 'https://cancelurl.de',

        }
        expect(response).toBe(expectedResponse);
    });
})

describe('negative validation', () => {
    let axiosInstance: AxiosInstance;
    const token = 'f1GrMf1OrPxb+f7LqCpmsiGpZSz+Pnhbu2WHl5QryTW3C/KU9xQpnZRhe2NtGkfU';
    beforeAll(async () => {
        axiosInstance = axios.create();
        axiosInstance.defaults.baseURL = 'https://api-v2.ziina.com/api';
        axiosInstance.defaults.validateStatus = function (status) {
            return status === 400;
        };
        axiosInstance.defaults.headers['Content-Type'] =
            'application/json';
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    })
    test('', async () => {
        const date = Date.now().toString();
        const request: CreatePaymentIntentRequest = {
            amount: 123,
            currency_code: 'AED',
            message: 'test message',
            success_url: 'success_url',
            cancel_url: 'cancel_url',
            failure_url: 'failure_url',
            test: true,
            transaction_source: 'directApi',
            expiry: date,
        }
        const response = await axiosInstance.post('/payment_intent', request);
        expect(1).toBe(3);
    });
})