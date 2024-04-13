import {useTodo, useTodoIds} from "../services/queries.ts";

export default function TodoStep2() {
    const todoIdsQuery = useTodoIds();
    const todoQueries = useTodo(todoIdsQuery.data);
    // const isFetching = useIsFetching(); // global
    // if (todoIdsQuery.isPending) {
    //     return <span>Loading..</span>
    // }
    // if (todoIdsQuery.isError) {
    //     return <span>An Error has occured</span>
    // }
    // return <div>{todoIdsQuery.data.map((id)=><p key={id}>{id}</p>)}</div>

    //     <p>Query function status: {todoIdsQuery.fetchStatus}</p>
    //     <p>Query data status: {todoIdsQuery.status}</p>
    //     <p>Number of Global Fetching: {isFetching}</p>
    return <>

{/*        {todoIdsQuery.data?.map((id) => {
            return <p key={id}>id: {id}</p>
        })}
*/}
        <ul>
            {todoQueries.map(({data})=>(
                <li key={data?.id}>
                    <div>id: {data?.id}</div>
                    <span>
                        <strong>Title:</strong> {data?.title},{" "}
                        <strong>Description:</strong> {data?.description}
                    </span>
                </li>
            ))}
        </ul>
    </>
}
