import { Box, Input, Pagination } from '@mantine/core';
import styled from 'styled-components';

type TableFooterProps = {
    currentPage: number;
    itemsPerPage: number;
    pageCount: number;
    onPageChange: (page: number) => void;
}

const TableFooter: React.FC<TableFooterProps> = ({ currentPage, itemsPerPage, pageCount, onPageChange }: TableFooterProps) => (
    <Container>
        <Box>
            {`Showing ${currentPage} of ${itemsPerPage} of ${pageCount}`}
        </Box>
        <Pagination value={currentPage} onChange={onPageChange} total={pageCount} size={'sm'} />
        <NumOfRows>
            <Box>Show</Box>
            <InputContainer>
                <Input disabled placeholder={`${itemsPerPage} rows`} size='xs' />
            </InputContainer>
        </NumOfRows>
    </Container>
);

const Container = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

const NumOfRows = styled(Box)`
    display: flex;
`;

const InputContainer = styled(Box)`
    width: 5rem;
    margin-top: -0.2rem;
    margin-left: 0.5rem;
`;

export default TableFooter