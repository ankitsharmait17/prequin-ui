import { InvestorsService } from './investors';

const investorsServiceManager = new InvestorsService({
    baseUrl: process.env.REACT_APP_SERVICE_BASE_URL,
});

export { investorsServiceManager };
