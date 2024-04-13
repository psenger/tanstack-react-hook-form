import React from 'react'
import ProjectsComponents from "./componets/ProjectsComponents"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

function App() {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ProjectsComponents />
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </React.StrictMode>
    )
}

export default App
