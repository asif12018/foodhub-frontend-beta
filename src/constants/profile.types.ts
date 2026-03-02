


interface CustomerProfile {
    id: string;
    userId:string;
    address: string | null;
    city: string | null;
}


export interface ProfileData {
    id: string;
    name: string;
    email:string;
    emailVerified: boolean;
    phone: string | null;
    image: string | null;
    roles: string;
    status: string;
    customerProfile:CustomerProfile;
    createdAt:string;
    updatedAt:string;

}