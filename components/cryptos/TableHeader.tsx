import { Table } from "@mantine/core";
import styled from "styled-components";

interface TableHeaderProps {
    columnNames: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columnNames }) => (
    <Thead>
        <Table.Tr>
            {columnNames.map((field) => (
                <Table.Td key={field}>{field}</Table.Td>
            ))}
        </Table.Tr>
    </Thead>
);

const Thead = styled(Table.Thead)`
    background-color: '#DEE2E6';
`;

export default TableHeader