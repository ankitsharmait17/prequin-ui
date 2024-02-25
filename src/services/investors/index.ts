import { Firm, Commitment, GetCommitmentsRequest } from './types';

export class InvestorsService {
    constructor(private config: any) {}

    getInvestors(): Promise<Firm[]> {
        const headers = {
            'Content-Type': 'application/json',
        };
        return fetch(`${this.config.baseUrl}/api/investors`, {
            method: 'GET',
            headers,
        })
            .then((response) => {
                if (response.ok) return response.json();
                return Promise.reject(new Error('Error while fetching investors'));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getCommitments(request: GetCommitmentsRequest): Promise<Commitment[]> {
        const headers = {
            'Content-Type': 'application/json',
        };

        const { asset_class, investor_id } = request;

        return fetch(`${this.config.baseUrl}/api/investor/commitment/${asset_class}/${investor_id}`, {
            method: 'GET',
            headers,
        })
            .then((response) => {
                if (response.ok) return response.json();
                return Promise.reject(new Error('Error while fetching commitments'));
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
