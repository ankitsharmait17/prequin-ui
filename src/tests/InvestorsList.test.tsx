import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import InvestorsList from '../components/InvestorsList/InvestorsList';
import mockInvestorsResponse from './mocks/investors.json';
import { BrowserRouter } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL;
const investorListComponent = (
    <BrowserRouter>
        <InvestorsList />
    </BrowserRouter>
);

// Mocking the API request using Mock Service Worker (msw)
const server = setupServer(
    rest.get(`${BASE_URL}/api/investors`, async (req, res, ctx) => {
        return res(ctx.json(mockInvestorsResponse));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders InvestorsList component', async () => {
    render(investorListComponent);

    // Verify that the loading spinner is displayed initially
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Wait for the API request to be completed
    await waitFor(() => expect(screen.queryByTestId('spinner')).toBeNull());

    // Verify that the table is rendered with the data
    expect(screen.getByText('Mjd Jedi fund')).toBeInTheDocument();
    expect(screen.getByText('Ibx Skywalker ltd')).toBeInTheDocument();
});

test('renders error message when API request fails', async () => {
    // Mocking the API request to simulate an error
    server.use(
        rest.get(`${BASE_URL}/api/investors`, async (req, res, ctx) => {
            return res(ctx.status(500, 'Internal Server Error'));
        })
    );

    render(investorListComponent);

    // Wait for the API request to be completed
    await waitFor(() => expect(screen.getByText(/error occurred/i)).toBeInTheDocument());
});
