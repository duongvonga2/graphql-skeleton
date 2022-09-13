export interface IUser {
    id: string;
    username: string;
    password: string;
    name: string;
    status: TUserStatus;
}
export interface IUserCreate extends Omit<IUser, 'id'> {}

export type TUserStatus = 'active' | 'inactive' | 'disabled'