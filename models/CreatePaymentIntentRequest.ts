export interface CreatePaymentIntentRequest {
    amount: number;
    currency_code: string;
    message: string;
    success_url: string;
    cancel_url: string;
    failure_url: string;
    test: boolean;
    transaction_source: string;
    expiry: string
}