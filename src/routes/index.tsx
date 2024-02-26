import { Navigate, RouteObject } from 'react-router-dom';
import InvestorDetails from '../components/InvestorDetails/InvestorDetails';
import InvestorsList from '../components/InvestorsList/InvestorsList';
import NotFound from '../components/Common/NotFound/NotFound';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <InvestorsList />,
    },
    {
        path: '/investor/:investorId',
        element: <InvestorDetails />,
    },
    { path: 'not-found', element: <NotFound /> },
    { path: '*', element: <Navigate to='/not-found' /> },
];
