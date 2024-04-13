import axios from "axios";
import {Product, Project, Todo} from "../types";

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({baseURL: BASE_URL})

export const getTodosIds = async () => {
    return (await axiosInstance.get<Todo[]>('todos')).data.map((todo) => todo.id)
}
export const getTodo = async (id: number) => {
    return (await axiosInstance.get<Todo>(`todos/${id}`)).data
}

export const createTodo = async (data: Todo) => {
    await axiosInstance.post('todos', data);
}

export const updateTodo = async (data: Todo) => {
    await axiosInstance.put(`todos/${data.id}`, data);
}

export const deleteTodo = async (id: number) => {
    await axiosInstance.delete(`todos/${id}`);
}

export const getProjects = async ({page = 1, limit = 3}: { page?: number, limit?: number }) => {
    return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_per_page=${limit}`)).data
}

export const getProducts = async ({pageParam}: {pageParam: number}) => {
    const limit = 10
    return (await  axiosInstance.get<Product[]>(`products?_page=${pageParam}&_per_page=${limit}}`)).data
}
export const getProduct = async (id: number) => {
    return (await  axiosInstance.get<Product>(`products/${id}`)).data
}
