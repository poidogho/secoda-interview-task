type QuoteCurrency = {
    price: number;
    market_cap: number;
    percent_change_24h: number;
    volume_24h: number
}

type Quote = {
    USD: QuoteCurrency
}
export type CryptoCurrency = {
    id: number;
    name: string;
    symbol: string;
    logo: string;
    circulating_supply: number;
    quote: Quote
}

type FormatterOption = {
    minimumFractionDigits: number;
    maximumFractionDigits: number;
    style: string;
    currency: string
}

export const formatCurrency = (value: number, includeSymbol = true) => {
    //@ts-ignore
    const options: FormatterOption = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    if (includeSymbol) {
        options.style = 'currency';
        options.currency = 'USD';
    }
    const formatter = new Intl.NumberFormat('en-US', options);

    const denominations = [
        { threshold: 1e12, suffix: 'T' },
        { threshold: 1e9, suffix: 'B' },
        { threshold: 1e6, suffix: 'M' },
        { threshold: 1e3, suffix: 'K' },
    ];

    const denomination = denominations.find(d => value >= d.threshold);
    if (denomination) {
        return formatter.format(value / denomination.threshold) + denomination.suffix;
    }

    return formatter.format(value);
}
