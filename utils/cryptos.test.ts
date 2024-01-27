import { formatCurrency } from './cryptos';

describe('formatCurrency', () => {
    test('formats currency with symbol by default', () => {
        const result = formatCurrency(1234.56);
        expect(result).toBe('$1.23K');
    });

    test('formats currency without symbol', () => {
        const result = formatCurrency(1234.56, false);
        expect(result).toBe('1.23K');
    });

    test('formats large numbers with denominations (K, M, B, T)', () => {
        expect(formatCurrency(1234, true)).toBe('$1.23K');
        expect(formatCurrency(1e6, true)).toBe('$1.00M');
        expect(formatCurrency(1e9, true)).toBe('$1.00B');
        expect(formatCurrency(1e12, true)).toBe('$1.00T');
    });

    test('formats exact thresholds with denominations (K, M, B, T)', () => {
        expect(formatCurrency(1e3, true)).toBe('$1.00K');
        expect(formatCurrency(1e6, true)).toBe('$1.00M');
        expect(formatCurrency(1e9, true)).toBe('$1.00B');
        expect(formatCurrency(1e12, true)).toBe('$1.00T');
    });

    test('handles values less than 1000 correctly', () => {
        expect(formatCurrency(999, true)).toBe('$999.00');
        expect(formatCurrency(10.5, true)).toBe('$10.50');
        expect(formatCurrency(0.123, true)).toBe('$0.12');
    });
});
