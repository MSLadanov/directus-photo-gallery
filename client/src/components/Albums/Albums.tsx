import { useQuery } from "@tanstack/react-query"

function Albums() {
    async function getAlbums() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/albums')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Failed to fetch albums:', error)
        }
    }
    const albums = useQuery({ queryKey: ['albums'], queryFn: getAlbums})
    console.log(albums.data)
    return(
        <div>
            <h1>Albums</h1>
        </div>
    )
}

export default Albums