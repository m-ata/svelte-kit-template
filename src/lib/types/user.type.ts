export type TUser = {
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
  userPassword?: string;
  isSelected?: boolean
};
export type TUserArgs = {
  fetchFunction: any;
};
export type TUserActivity = {
    lastUserActivity: number;
}