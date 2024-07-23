import {useCookies} from "@vueuse/integrations/useCookies";


export const useFetchUtility = async (url: string, method? : string, body?: any) => {
    const {get} = useCookies();
    const token : string = get('note_user_token');
    let headers: any = {'Content-Type': 'application/json'};
    if (token)headers['Authorization'] = `Token ${token}`;
    return await fetch(import.meta.env.VITE_APP_BACKEND_HOST + url,
        {method: method ? method : 'GET',
            body: body ? body : undefined ,headers: headers});
}