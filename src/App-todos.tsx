import React from 'react'
import TodoComponent from "./componets/TodoComponent.tsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

function App() {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <TodoComponent/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </React.StrictMode>
    )
}

export default App
