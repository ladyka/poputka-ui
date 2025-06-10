import {apiInstance, instance} from "@/app/services/ApiInstance";
import {SingUpRequest} from "@/app/dti/SingUpRequest";
import {UserInfo} from "@/app/dti/UserInfo";
import { useCallback } from "react";

export default function useLoginService() {
    return useCallback((data: FormData) => {
        return instance.post('/login', data)
    }, [])
}

export function useSingUpService() {
    return useCallback((data: SingUpRequest) => {
        return apiInstance.post('/user/singup', data)
    }, [])
}

export function useSaveProfileService() {
    return useCallback((data: UserInfo) => {
        return apiInstance.post('/user/update', data)
    }, [])
}

export function useUserInfoService() {
    return useCallback(() => {
        return apiInstance.get('/user/info')
    }, [])
}