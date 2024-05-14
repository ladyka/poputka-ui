export interface TripCompanionView {
    id: string;
    from: string;
    to: string;
    startDateTimeGMT: Date;
    price: number;
    currency: string;
    description: string;
    driverName: string;
}