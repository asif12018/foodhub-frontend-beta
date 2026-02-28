

export interface ProfileData {
    id: string;
    name: string;
    email:string;
    emailVerified: boolean;
    phone: string | null;
    image: string | null;
    roles: string;
    status: string;
    city: string | null;
    address: string | null;
    createdAt:string;
    updatedAt:string;

}