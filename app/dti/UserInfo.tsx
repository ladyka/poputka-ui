import {Dayjs} from "dayjs";

export interface UserInfo {
    email: string
    name: string
    surname: string
    birthday: Dayjs
    music: string
    businessActivity: string
    description: string
    car: string
}
