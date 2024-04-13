import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/todos")
            .then((response) => {
                setData(response.data)
            }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <pre>
        {JSON.stringify(data, null, 4)}
    </pre>
    )
}

export default App
