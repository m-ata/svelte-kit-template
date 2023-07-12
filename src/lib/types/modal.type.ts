export type ModalOptions = {
    heading?: string;
    icon?: string;
    content: string;
    onConfirm: any;
    onCancel: any;
    cancelBtnText?: string;
    confirmBtnText?: string;
    style?: string;
}

export type FormModalOptions = {
    heading?: string;
    icon?: string;
    form: FormType[];
    onApply: any;
    onCancel: any;
    cancelBtnText?: string;
    confirmBtnText?: string;
    style?: string;
}

export type FormType = {
    label: string;
    type: string;
    field: string;
    value?: any;
    icon: string;
    options?: DropdownOptions[]
}

export type DropdownOptions = {
    label: string;
    value?: number | string;
}