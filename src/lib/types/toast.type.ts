export type Toast = {
    id?: number;
    message: string;
    type: 'success' | 'error' | 'warning';
    dismissible: boolean;
    timeout?: number;
}