import { useLocation } from "react-router-dom"

function Album() {
    const location = useLocation()
    return (
        <div>
            <h1>Album</h1>
            <h1>{location.pathname.split('/').at(-1)}</h1>
        </div>
    )
}

export default Album