import {useTodoIds} from "../services/queries.ts";
import {useIsFetching} from "@tanstack/react-query";

export default function TodoStep1() {
    const todoIdsQuery = useTodoIds();
    const globalFetchingCount = useIsFetching();

    if (todoIdsQuery.isError) {
        return <span>An Error has occurred</span>
    }
    return <>
        <p>Query function status: {todoIdsQuery.fetchStatus}</p>
        <p>Query function Pending: {todoIdsQuery.isPending ? <span>Loading..</span> : <span>done</span>}</p>
        <p>Query data status: {todoIdsQuery.status}</p>
        <p>Number of Global Fetching: {globalFetchingCount}</p>
        <div>{todoIdsQuery?.data?.map((id) => <p key={id}>{id}</p>)}</div>
    </>
}
