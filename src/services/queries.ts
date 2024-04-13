import {keepPreviousData, useInfiniteQuery, useQueries, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProduct, getProducts, getProjects, getTodo, getTodosIds} from "./api.ts";
import {Product} from "../types";


export function useTodoIds() {
    // useQuery - blocking
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodosIds,
        // refetchOnWindowFocus: false,
        // enabled: true
    })
}

export function useTodo(ids: (number | undefined)[] | undefined) {
    // @TODO Explain this?
    return useQueries({
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: ['todo', {id}],
                queryFn: () => getTodo(id!),
            }
        })
    })
}

export function useProjects(page: number) {
    // keepPreviousData does not fire until after the render, and after the
    // data has success loaded. this prevents the screen from flickering
    return useQuery({
        queryKey: ['projects', {page}],
        queryFn: () => getProjects({page}),
        placeholderData: keepPreviousData
    })
}

export function useProducts() {
    return useInfiniteQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined // return undefined to end the infinite query
            }
            return lastPageParam + 1
        },
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined // return undefined to disable prev page query
            }
            return firstPageParam - 1
        }
    })
}

export function useProduct(id:number|null) {
    const queryClient = useQueryClient()
    return useQuery({
        queryKey: ['product',{id}],
        queryFn: () => getProduct(id!), // ! at the end tells typescript that the id is not null.
        enabled: !! id, // this will prevent NULL from being passed to the getProduct
        placeholderData: () => {
            // this will pull the products from the cache ( array of array )
            // and return the product that matches the id
            const cachedProduct = (
                queryClient.getQueryData(['products']) as {
                    pages: Product[] | undefined
                }
            )?.pages?.flat(2)
            if ( cachedProduct ) {
                return cachedProduct.find((item)=>item.id === id)
            }
        }
    })
}
