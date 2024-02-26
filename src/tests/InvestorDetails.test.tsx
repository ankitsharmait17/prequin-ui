import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import InvestorDetails from '../components/InvestorDetails/InvestorDetails';
import mockCommitmentData from './mocks/commitments.json';

const BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL;

// Mocking the API request using Mock Service Worker (msw)
const server = setupServer(
    rest.get(`${BASE_URL}/api/investor/commitment/:asset_class/:investor_id`, (req, res, ctx) => {
        const investorId = req.params.investor_id;
        if (investorId === '1') {
            return res(ctx.json(mockCommitmentData));
        } else if (investorId === '2') {
            return res(ctx.json([])); // Empty commitments
        } else {
            return res(ctx.status(500, 'Internal Server Error'));
        }
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders InvestorDetails component with initial state', () => {
    render(<InvestorDetails />, { wrapper: MemoryRouter });
    expect(screen.getByText('Investors Details')).toBeInTheDocument();
    expect(screen.getByLabelText('Asset Class :')).toBeInTheDocument();
});

test('fetches and renders commitments for a selected asset class', async () => {
    render(
        <MemoryRouter initialEntries={['/investors/1']}>
            <Routes>
                <Route path='/investors/:investorId' element={<InvestorDetails />}></Route>
            </Routes>
        </MemoryRouter>
    );

    // Verify that the base investor data is displayed
    expect(screen.getByText('Investor #1')).toBeInTheDocument();
});

test('handles empty commitments data', async () => {
    render(
        <MemoryRouter initialEntries={['/investors/2']}>
            <Routes>
                <Route path='/investors/:investorId' element={<InvestorDetails />}></Route>
            </Routes>
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Asset Class :'), { target: { value: 're' } });

    // Wait for the commitments to be fetched and loaded
    await waitFor(() => expect(screen.getByText('No data available.')).toBeInTheDocument());
});

test('handles error while fetching commitments', async () => {
    render(
        <MemoryRouter initialEntries={['/investors/3']}>
            <Routes>
                <Route path='/investors/:investorId' element={<InvestorDetails />}></Route>
            </Routes>
        </MemoryRouter>
    );

    // Change the selected asset class
    fireEvent.change(screen.getByLabelText('Asset Class :'), { target: { value: 're' } });

    // Wait for the error message to be displayed
    await waitFor(() =>
        expect(
            screen.getByText(
                'Some error occurred while fetching the commitment details. Please try again after some time.'
            )
        ).toBeInTheDocument()
    );
});

test('handles selected asset change', async () => {
    render(
        <MemoryRouter initialEntries={['/investors/1']}>
            <Routes>
                <Route path='/investors/:investorId' element={<InvestorDetails />}></Route>
            </Routes>
        </MemoryRouter>
    );

    // Change the selected asset class
    fireEvent.change(screen.getByLabelText('Asset Class :'), { target: { value: 're' } });
    // Wait for the commitments to be fetched and loaded
    await waitFor(() => expect(screen.getByText('Amount')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('EUR 76M')).toBeInTheDocument());
});
