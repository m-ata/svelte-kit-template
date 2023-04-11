export type TokenPayload = {
    username: string;
    password: string;
};

export type FetchUnProtectedPayload = {
    fetchFunction?: any;
    url: string;
    method?: string;
    headers?: any;
    body?: Object
};

export type UserToken = {
    token: BackendToken;
    loggedIn: boolean;
}

type BackendToken = {
    access_token?: string;
    expires_in?: string;
    refresh_expires_in?: string;
    refresh_token?: string;
}

export type Toast = {
    id?: number;
    message: string;
    type: 'success' | 'error' | 'warning';
    dismissible: boolean;
    timeout?: number;
}
