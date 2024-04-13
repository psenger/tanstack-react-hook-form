export interface Todo {
    checked: boolean;
    title: string;
    description: string;
    id?: number;
}
export interface Project {
    id?: number;
    name: string;
}
export interface Product {
    id: number | null;
    name: string;
}
