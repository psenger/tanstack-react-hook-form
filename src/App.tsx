import React from 'react'
import ProductsComponents from "./componets/ProductsComponents"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

function App() {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ProductsComponents />
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </React.StrictMode>
    )
}

export default App
