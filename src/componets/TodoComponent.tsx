import {SubmitHandler, useForm} from "react-hook-form";
import {useTodo, useTodoIds} from "../services/queries.ts";
import {useDeleteTodo, userCreateTodo, useUpdateTodo} from "../services/mutations.ts";
import {Todo} from "../types"

export default function TodoComponent() {
    const todoIdsQuery = useTodoIds();
    const todoQueries = useTodo(todoIdsQuery.data);
    const createTodoMutation = userCreateTodo()
    const updateTodoMutation = useUpdateTodo()
    const deleteTodoMutation = useDeleteTodo()

    const { register, handleSubmit} = useForm<Todo>({})

    const handleTodoSubmit: SubmitHandler<Todo> = (data) => {
        createTodoMutation.mutate(data)
    }
    const handleMarkAsDone  = (data: Todo | undefined) => {
        if (data) {
            updateTodoMutation.mutate({...data, checked: true})
        }
    }
    const handleDeleteTodo  = async ( id:number) => {
        await deleteTodoMutation.mutateAsync(id)
        // do something else await
    }

    return <>
        <form onSubmit={handleSubmit(handleTodoSubmit)}>
            <h2>New:</h2>
            <input placeholder="Title" {...register('title')} />
            <br/>
            <input placeholder="Description" {...register('description')} />
            <br/>
            <button type="submit" disabled={createTodoMutation.isPending}>Submit</button>
        </form>
        <ul>
        {todoQueries.map(({data}) => (
                <li key={data?.id}>
                    <div>id: {data?.id}</div>
                    <span>
                        <strong>Title:</strong> {data?.title},{" "}
                        <strong>Description:</strong> {data?.description}
                    </span>
                    <div>
                        <button onClick={() => handleMarkAsDone(data)} disabled={data?.checked}>
                            {data?.checked ? "Done" : "Mark as done"}
                        </button>
                        {data && data?.id && (<button onClick={() => handleDeleteTodo(data.id!)} >
                            Delete
                        </button>)}
                    </div>
                </li>
        ))}
        </ul>
    </>
}
