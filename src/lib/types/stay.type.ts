export type TStay = {
    allowExportDocumentDownload?: boolean;
    auditLog?: any[];
    auditScore?: number;
    boatId?: string;
    campId: string;
    code?: string;
    createDate?: number;
    deleted?: boolean;
    endDate: number;
    guestNames?: string[];
    guestNamesModifiable?: boolean;
    lastUpdateDate?: number;
    numberOfFishers?: number;
    organisationId?: number;
    overrideAudit?: boolean;
    startDate: number;
    stayDescription?: string;
    stayId?: string;
    isSelected?: boolean;
}

export type TStayArgs = {
    fetchFunction: any;
    stayPayload: TStay;
    endpoint: string
}

export type TStayDataTable = {
    startDate: string;
    endDate: string;
    stayDescription: string;
    code: string;
    numberOfFishers: number;
}