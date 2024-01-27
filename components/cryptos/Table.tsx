'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { useCryptosQuery } from '@/hooks/useCryptocurrencies';
import { ScrollArea, Table as MantineTable, Box } from '@mantine/core';
import { CryptoCurrency } from '@/utils/cryptos';
import TableLoader from './TableLoader';
import TableFooter from './TableFooter';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

const Table = () => {
    const ColumnNames = [
        'Name',
        'Price',
        'Market Cap',
        'Circulating Supply',
        'Change %',
        'Last (24h)',
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const start = ((currentPage - 1) * itemsPerPage + 1)
    const { data: cryptos, isLoading, isError } = useCryptosQuery(itemsPerPage, start);
    console.log({ cryptos })

    const pageCount = Math.ceil(cryptos?.status?.total_count / itemsPerPage);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    if (isError) {
        return <Box>Error Loading Page</Box>;
    }

    return (
        <ScrollArea>
            <Container>
                {isLoading ? (
                    <TableLoader skeletonCount={15} />
                ) : (
                    <>
                        <MantineTable striped withTableBorder captionSide="bottom">
                            <TableHeader columnNames={ColumnNames} />
                            {cryptos?.data?.map((crypto: CryptoCurrency) => (
                                <TableRow key={crypto.id} crypto={crypto} />
                            ))}
                        </MantineTable>
                        <TableFooter
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                        />

                    </>
                )}
            </Container>
        </ScrollArea>
    );
}


const Container = styled(Box)`
    margin: 3rem;
`;

export default Table