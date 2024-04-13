import {useProduct, useProducts} from "../services/queries.ts";
import {Fragment, useState} from "react";

export default function ProductsComponents() {
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null)

    const productsQuery = useProducts()
    const productQuery = useProduct(selectedProductId)

    return (
        <>
            {productsQuery.data?.pages.map((group, outerIndex) => {
                return (
                    <Fragment key={outerIndex}>
                        {
                            group.map((product, innerIndex) => {
                                return (
                                    <Fragment key={innerIndex}>
                                        <button key={innerIndex}
                                                onClick={() => setSelectedProductId(product.id)}>{product.name}</button>
                                        <br/>
                                    </Fragment>
                                )
                            })
                        }
                    </Fragment>
                )
            })}
            <br/>
            <div>
                <button
                    onClick={()=>{
                        return productsQuery.fetchNextPage()
                    }}
                    disabled={
                        !productsQuery.hasNextPage || productsQuery.isFetching
                    }
                >
                    {productsQuery.isFetching ? 'Loading...':  productsQuery.hasNextPage ? 'Load More' : 'Nothing more to load'}
                </button>
            </div>
            <div>Selected Product:</div>
            <pre>{JSON.stringify(productQuery.data,null,4)}</pre>
        </>
    )
}
