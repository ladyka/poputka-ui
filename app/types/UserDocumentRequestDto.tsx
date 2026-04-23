import { Dayjs } from "dayjs";

export interface UserDocumentRequestDto{
    type: string;
    description: string;
    expirationDate: Dayjs;
}