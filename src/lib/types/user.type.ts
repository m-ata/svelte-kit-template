export type TUserResponse =
    {
        camps: string[];
        configuration: Object;
        createDate: number;
        email: string;
        emailVerificationCode: string;
        emailVerified: boolean;
        firstName: string;
        initialUser: boolean;
        lastName: string;
        lastUpdateDate: number;
        name: string;
        organisationId: number;
        phoneNumber: string;
        userId: string;
        userName: string;
    }
export type TUserArgs = {
    fetchFunction: any,

}
export type TUserDataTable = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
}