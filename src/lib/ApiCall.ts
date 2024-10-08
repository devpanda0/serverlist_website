import {RouteTypes, RouteTypesMap} from "@/types/api/RouteTypes";
import axios from "axios";
import NotifyService from "./NotifyService";

export async function ApiCall<T extends RouteTypes, E extends RouteTypesMap[T]>(
    method: T,
    route: keyof E,
    data: RouteTypesMap[T] extends { [key in keyof E]: infer R } ? R : never
) {
    try {
        const notify = new NotifyService("ApiService");
        const cast = data as Object
        const res = await axios(route as string, {
            method,
            baseURL: '/api',
            headers: { 'Content-Type': 'application/json' },
            data: "body" in cast ? cast.body : {},
            params: "query" in cast ? cast.query : {}
        });
        if (res.data.error) {
            notify.error(res.data.error);
        }
        return res.data;
    } catch (error) {
        console.error('ApiService: ', error);
    }
}
