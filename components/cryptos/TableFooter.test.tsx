import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import TableFooter from './TableFooter';
import { ReactNode } from 'react';

describe('TableFooter', () => {
    const mockOnPageChange = jest.fn();
    const props = {
        currentPage: 1,
        itemsPerPage: 10,
        pageCount: 50,
        onPageChange: mockOnPageChange,
    };

    const renderWithProvider = (component: ReactNode) => {
        return render(
            <MantineProvider>
                {component}
            </MantineProvider>
        );
    };

    it('renders correctly', () => {
        renderWithProvider(<TableFooter {...props} />);
        expect(screen.getByText(/showing/i)).toBeInTheDocument();
    });

    it('displays the correct text based on props', () => {
        renderWithProvider(<TableFooter {...props} />);
        expect(screen.getByText(`Showing ${props.currentPage} of ${props.itemsPerPage} of ${props.pageCount}`)).toBeInTheDocument();
    });

    it('calls onPageChange with the right page when pagination is clicked', () => {
        renderWithProvider(<TableFooter {...props} />);
        const page2Button = screen.getByRole('button', { name: /2/i });
        fireEvent.click(page2Button);
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });


});
