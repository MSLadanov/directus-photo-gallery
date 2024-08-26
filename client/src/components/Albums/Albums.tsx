import { useQuery } from "@tanstack/react-query"
import { Link, useLocation } from "react-router-dom"
import albumImg from '../../assets/album.png'

interface Album{
    userId: string,
    id: string,
    title: string,
}

function Albums() {
    let location = useLocation();
    let path = ''
    if (location.pathname.endsWith('/')){
        path = location.pathname.substring(0, location.pathname.length - 1)
    } else {
      path = location.pathname
  }
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
            {albums.data?.map((album : Album) => 
            <Link to={`${path}/${album.id}`} key={album.id}>
                <div>
                    <img src={albumImg} alt="" />
                    <p>{album.title}</p>
                </div> 
          </Link>)}
        </div>
    )
}

export default Albums