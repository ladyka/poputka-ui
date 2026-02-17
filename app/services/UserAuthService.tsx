import {apiInstance, instance} from "@/app/services/ApiInstance";
import {SignUpRequest} from "@/app/dti/SignUpRequest";
import {UserInfo} from "@/app/dti/UserInfo";
import {useCallback} from "react";

export function useLoginService() {
    return useCallback((data: FormData) => {
        return instance.post('/login', data, {maxRedirects: 0})
    }, [])
}

export function useSignUpService() {
    return useCallback((data: SignUpRequest) => {
        return apiInstance.post('/user/signup', data)
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