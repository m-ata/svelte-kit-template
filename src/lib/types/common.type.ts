export type TApiArgs = {
    fetchFunction: any;
    payload?: any;
    endpoint: string
}

export type TDrawerMenu = {
    label: string;
    icon: string;
    route: string;
    onClick: any;
}

export type TActiveTabConfig = {
    tab: string;
    total: number;
    tabName: string;
}