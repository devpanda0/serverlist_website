export interface GetRouteTypes {
    '/v1/utils/locale': any
}

export interface PostRouteTypes {

}

export interface PutRouteTypes {
}

export interface DeleteRouteTypes {

}

export interface RouteTypesMap {
    "GET": GetRouteTypes
    "POST": PostRouteTypes
    "PUT": PutRouteTypes
    "DELETE": DeleteRouteTypes
}

export type RouteTypes = "GET" | "POST" | "PUT" | "DELETE"