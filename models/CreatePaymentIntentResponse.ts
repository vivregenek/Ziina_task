export interface CreatePaymentIntentResponse {
    id: string;
    account_id: string;
    amount: number;
    currency_code: string;
    created_at: string;
    status: "requires_payment_instrument";
    operation_id: string;
    message: string;
    redirect_url: string;
    success_url: string;
    cancel_url: string;
    latest_error?: {
        message: string;
        code: string
    }
}