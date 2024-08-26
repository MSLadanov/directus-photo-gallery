import { useLocation } from "react-router-dom"

function Album() {
    const location = useLocation()
    console.log(location.pathname)
    return (
        <div>
            <h1>Album</h1>
            <h1>{location.pathname}</h1>
        </div>
    )
}

export default Album