import { Avatar, Badge, Box, Table } from "@mantine/core";
import { CryptoCurrency, formatCurrency } from '@/utils/cryptos';
import styled from "styled-components";

type TableRowProps = {
    crypto: CryptoCurrency
}

const TableRow: React.FC<TableRowProps> = ({ crypto }) => (
    <Table.Tr key={crypto.id}>
        <Table.Td>
            <CryptoInfoContainer>
                <CryptoLogoContainer>
                    <Avatar src={crypto.logo} alt={crypto.name} />
                </CryptoLogoContainer>
                <CryptoDetailsContainer>
                    <CryptoName>{crypto.name}</CryptoName> {`(${crypto.symbol})`}
                </CryptoDetailsContainer>
            </CryptoInfoContainer>
        </Table.Td>
        <Table.Td>{formatCurrency(crypto.quote.USD.price)}</Table.Td>
        <Table.Td>{formatCurrency(crypto.quote.USD.market_cap)}</Table.Td>
        <Table.Td>{formatCurrency(Number(crypto.circulating_supply.toFixed(3)), false)}</Table.Td>
        <Table.Td>
            <Badge color={crypto.quote.USD.percent_change_24h > 0 ? 'green' : 'red'} variant="light">
                {crypto.quote.USD.percent_change_24h.toFixed(2)}%
            </Badge>
        </Table.Td>
        <Table.Td>{crypto.quote.USD.volume_24h}</Table.Td>
    </Table.Tr>
);

const CryptoInfoContainer = styled(Box)`
    display: flex;
`;

const CryptoLogoContainer = styled(Box)`
    padding: 0.3rem;
`;

const CryptoDetailsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
`;

const CryptoName = styled(Box)`
    font-weight: bold;
`;

export default TableRow