export interface IUser {
    id?: number;
    name: string;
    email: string;
    paswd: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    deletedBy: number;
}