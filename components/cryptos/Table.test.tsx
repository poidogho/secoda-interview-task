import { render, screen } from '@testing-library/react';
import Table from './Table';
import { MantineProvider } from '@mantine/core';

jest.mock('../../hooks/useCryptocurrencies');

const mockCryptos = {
    status: {
        total_count: 100,
    },
    data: [
        {
            id: 1,
            name: 'Bitcoin',
            symbol: 'BTC',
            logo: 'path/to/bitcoin-logo.png',
            circulating_supply: 18500000,
            quote: {
                USD: {
                    price: 50000,
                    market_cap: 1000000000,
                    percent_change_24h: 5.5,
                    volume_24h: 3000000,
                },
            },
        },
    ],
};


describe('Table', () => {
    it('displays the loader when data is loading', () => {
        require('../../hooks/useCryptocurrencies').useCryptosQuery.mockReturnValue({
            data: {
                status: null,
                data: null
            },
            isLoading: true,
            isError: false,
        });

        render(
            <MantineProvider>
                <Table />
            </MantineProvider>
        );

        expect(screen.getByTestId('table-loader')).toBeInTheDocument();
    });

    it('displays the table with data', () => {
        require('../../hooks/useCryptocurrencies').useCryptosQuery.mockReturnValue({
            data: mockCryptos,
            isLoading: false,
            isError: false,
        });

        render(
            <MantineProvider>
                <Table />
            </MantineProvider>
        );

        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.getByText('$50.00K')).toBeInTheDocument();
    });
});
