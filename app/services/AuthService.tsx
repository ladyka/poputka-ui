import {instance} from "@/app/services/ApiInstance";

export default function useLoginService() {
    return (data: FormData) => {
        return instance.post('/login', data)
    }
}