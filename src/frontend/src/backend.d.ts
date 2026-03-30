import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type CatalogIndex = bigint;
export interface Rating {
    stars: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Product {
    id: bigint;
    name: string;
    sold: bigint;
    description: string;
    category: Category;
    imageKeyword: string;
    rating: Rating;
    price: bigint;
}
export enum Category {
    groceries = "groceries",
    petCare = "petCare",
    personalCare = "personalCare",
    household = "household",
    electronics = "electronics"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProductById(id: CatalogIndex): Promise<Product>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    subscribeEmail(email: string): Promise<boolean>;
}
