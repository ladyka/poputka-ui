import {apiInstance, instance} from "@/app/services/ApiInstance";
import {SingUpRequest} from "@/app/dti/SingUpRequest";
import {UserInfo} from "@/app/dti/UserInfo";

export default function useLoginService() {
    return (data: FormData) => {
        return instance.post('/login', data)
    }
}

export function useSingUpService() {
    return (data: SingUpRequest) => {
        return apiInstance.post('/user/singup', data)
    }
}

export function useSaveProfileService() {
    return (data: UserInfo) => {
        return apiInstance.post('/user/update', data)
    }
}

export function useUserInfoService() {
    return () => {
        return apiInstance.get('/user/info')
    }
}