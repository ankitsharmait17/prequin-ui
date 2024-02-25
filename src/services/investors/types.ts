export interface Firm {
    firm_id: number;
    firm_name: string;
    firm_type: string;
    city: string;
    country: string;
    AUM: number;
    date_added: string;
    last_updated: string;
    established_at: string;
    address: string;
    postal_code: string;
}

export interface Commitment {
    id: number;
    firm_id: number;
    asset_class: string;
    amount: string;
    currency: string;
}

export interface GetCommitmentsRequest {
    asset_class: string;
    investor_id: number;
}
