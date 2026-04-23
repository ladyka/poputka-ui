import { Dayjs } from "dayjs";

export interface UserDocumentDto {
    id: string;
    type: string;
    description: string;
    expirationDate: Dayjs;
    status: string;
}