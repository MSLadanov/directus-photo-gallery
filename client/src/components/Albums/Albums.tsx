import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link, useLocation } from "react-router-dom"
import albumImg from '../../assets/album.png'
import styled from "styled-components"

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
    gap: 16px;
    padding: 16px;
`

const AlbumCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    height: 300px; 
    box-sizing: border-box; 
    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
`

const AlbumImage = styled.img`
    height: 150px;
    object-fit: cover; 
    border-radius: 4px;
`

const AlbumTitle = styled.p`
    margin: 16px 0 0; 
`

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin: 16px 0;
    
    button {
        margin: 0 8px;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        
        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }

    span {
        margin: 0 16px;
    }
`
interface Album {
    id: string, 
    userId: string,
    title: string
}

function Albums() {
    let location = useLocation()
    let path = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
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
    const { data, isLoading, isError, isSuccess } = useQuery({ queryKey: ['albums'], queryFn: getAlbums })
    // async function fetchAlbums () {
    //     try {
    //         const response = await fetch('http://localhost/directus/items/albums');
    //         const data = await response.json()
    //         return data
    //     } catch (error) {
    //       console.error('Error fetching albums', error);
    //     }
    //   };
    // console.log(fetchAlbums())
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading albums</p>
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = data.slice(startIndex, endIndex)
    const totalPages = Math.ceil(data.length / itemsPerPage)
    return (
        <div>
            <GridContainer>
                {paginatedData.map((album: Album) => (
                    <Link to={`${path}/${album.id}`} key={album.id}>
                        <AlbumCard>
                            <AlbumImage src={albumImg} />
                            <AlbumTitle>{album.title}</AlbumTitle>
                        </AlbumCard>
                    </Link>
                ))}
            </GridContainer>
            <Pagination>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                    Next
                </button>
            </Pagination>
        </div>
    )
}

export default Albums;
