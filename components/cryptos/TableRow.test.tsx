import { render, screen } from '@testing-library/react';
import { MantineProvider, Table } from '@mantine/core';
import TableRow from './TableRow';

describe('TableRow', () => {
    const mockCrypto = {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        logo: 'path/to/bitcoin-logo.png',
        quote: {
            USD: {
                price: 50000,
                market_cap: 1000000000,
                percent_change_24h: 5.5,
                volume_24h: 3000000,
            },
        },
        circulating_supply: 21000000,
    };

    it('renders crypto information correctly', () => {
        render(
            <MantineProvider>
                <Table>
                    <TableRow crypto={mockCrypto} />
                </Table>
            </MantineProvider>
        );

        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.getByText('$50.00K')).toBeInTheDocument();
        expect(screen.getByText('$1.00B')).toBeInTheDocument();
        expect(screen.getByText('21.00M')).toBeInTheDocument();
        expect(screen.getByText('5.50%')).toBeInTheDocument();
        expect(screen.getByText('3000000')).toBeInTheDocument();
    });
});
