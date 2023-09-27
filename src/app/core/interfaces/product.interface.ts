export interface Product {
    _id: string;
    name: string;
    description: string;
    sku: string;
    image: string;
    tags: string;
    price: number;
    stock: number;
    priceHistory: HistoricalData[];
    stockHistory: HistoricalData[];
    created: Date
}

export interface HistoricalData {
    vale: number;
    date: Date
}