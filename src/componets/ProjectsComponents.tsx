import {useState} from "react";
import {useProjects} from "../services/queries.ts";
import {Project} from "../types";

export default function ProjectsComponents() {
    const [page, setPage] = useState(1)
    const {
        data,
        error,
        isPending,
        isPlaceholderData,
        isError,
        isFetching
    } = useProjects(page)

    const RenderProject = ({p}: { p: Project }) => (<p>{p.name}</p>)
    const Loading = () => (<div>Loading..</div>)
    const Error = ({e}: { e: Error }) => (<div>Error: {e.message}</div>)
    const RenderProjects = ({d}: { d: Project[] }) => <div>{d.map((p, i) => <RenderProject p={p} key={i}/>)}</div>

    return (
        <div>
            {isPending ? <Loading/> : isError ? <Error e={error}/> : <RenderProjects d={data}/>}
            <span>Current Page: {page}</span>
            {' '}
            <button
                onClick={() => setPage((prevState) => Math.max(prevState - 1, 0))}>Prev
            </button>
            {' '}
            <button
                onClick={() => {
                    if (!isPlaceholderData) {
                        setPage((prevState) => prevState + 1)
                    }
                }}
                disabled={isPlaceholderData}>Next
            </button>
            {' '}
            {isFetching ? <>Loading...</> : null}
        </div>
    )
}
