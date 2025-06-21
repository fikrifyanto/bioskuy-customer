declare global {
    interface LoginResponse {
        token: string;
        tokenType: string;
        customer: Customer;
        expiresAt: string;
    }
}

export {}