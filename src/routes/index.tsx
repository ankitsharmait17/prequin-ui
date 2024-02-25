import { RouteObject } from 'react-router-dom';
import InvestorDetails from '../components/InvestorDetails/InvestorDetails';
import InvestorsList from '../components/InvestorsList/InvestorsList';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <InvestorsList />,
    },
    {
        path: '/investor/:id',
        element: <InvestorDetails />,
    },
];
