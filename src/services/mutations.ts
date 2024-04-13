import {useMutation, useQueryClient} from "@tanstack/react-query"
import {Todo} from "../types"
import {createTodo, deleteTodo, updateTodo} from "./api.ts"

export function userCreateTodo() {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const useClient = useQueryClient();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: (variables:Todo) =>  createTodo(variables),
        // interceptors for the lifecycle
        onMutate: ()=> {
            // before
            console.log('onMutate')
        },
        onError: ()=> {
            console.log('onError')
        },
        onSuccess: ()=> {
            // if on run success
            console.log('onSuccess')
        },
        onSettled: async (data,error,variables, context)=> {
            // Will run after a promise is settled ( regardless if result or error ).
            console.log('onSettled',data, error, variables, context)
            if ( error ) {
                console.error( error )
            } else {
                // @TODO: This might not be the best way to do invalidate a record,
                //  this invalidates the whole thing!
                await useClient.invalidateQueries({queryKey:['todos']})
            }
        },
    })
}
export function useUpdateTodo () {
    const useClient = useQueryClient();
    return useMutation({
        mutationFn: (data:Todo) => updateTodo(data),
        onSettled: async (data,error,variables, context)=> {
            console.log('onSettled',data, error, variables, context)
            if (error) {
                console.error(error);
            } else if (!variables) {
                console.error(error);
            } else {
                await useClient.invalidateQueries({queryKey:['todos']})
                // @ts-ignore
                await useClient.invalidateQueries(['todos', {id: variables.id}]);
            }
        }
    })
}
export function useDeleteTodo () {
    const useClient = useQueryClient();
    return useMutation({
        mutationFn: (id:number) => deleteTodo(id),
        onSuccess: () => {
            console.log('deleted successfully')
        },
        onSettled: async (data,error,variables, context)=> {
            console.log('onSettled',data, error, variables, context)
            if (error) {
                console.error(error);
            } else {
                await useClient.invalidateQueries({queryKey:['todos']})
            }
        }
    })
}
