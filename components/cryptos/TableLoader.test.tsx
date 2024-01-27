import { render, screen } from '@testing-library/react';
import TableLoader from './TableLoader';
import { MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

describe('TableLoader', () => {
    const renderWithProvider = (component: ReactNode) => {
        return render(
            <MantineProvider>
                {component}
            </MantineProvider>
        );
    };
    it('renders the correct number of skeletons', () => {
        const skeletonCount = 1;
        renderWithProvider(<TableLoader skeletonCount={skeletonCount} />);

        const skeletons = screen.getAllByTestId('skeleton');
        expect(skeletons).toHaveLength(skeletonCount);
    });
});