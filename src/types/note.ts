export interface Note {
    id: number;
    body : string;
    shareable? : boolean;
    owner : number;
    createdAt?: Date;
    updatedAt? : Date;
}