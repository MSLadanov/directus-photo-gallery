import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"
import Photo from "../hooks/useModal"
import useModal from "../hooks/useModal"
import { observer } from "mobx-react-lite"
import albumStore from "../../store/AlbumStore"
import { toJS } from "mobx"

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
    gap: 15px;
    padding: 16px;
    justify-content: center; 
`

const PhotoCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: auto;
    height: 300px;
    box-sizing: border-box;
    
    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
`

const PhotoImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: contain;
    border-radius: 4px;
`

const PhotoTitle = styled.p`
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

interface Photo {
    album_id: string;
    id: string;
    description: string;
    title: string;
    image: string;
}

const Album : React.FC = observer(() => {
    const {getCurrentAlbumId, setCurrentAlbumId, photos, fetchStatePhotos} = albumStore
    const location = useLocation()
    const navigate = useNavigate()
    const { Photo, toggleModal } = useModal()
    const [currentPage, setCurrentPage] = useState(1)
    const [photoToShow, setPhotoToShow] = useState<Photo | null>(null)
    const itemsPerPage = 10
    let locationArray = location.pathname.split('/').filter(item => item.length !== 0)
    let albumId = locationArray.length === 2 ? locationArray[1] : locationArray[locationArray.length - 2]
    let photoId = locationArray.length > 2 ? locationArray[locationArray.length - 1] : ''
    
    useEffect(() => {
        if(!getCurrentAlbumId()){
            setCurrentAlbumId(albumId)
        }
        fetchStatePhotos()
    },[])

    useEffect(() => {
        if (photoId) {
            const photo = photos.find((item: Photo) => Number(item.id) === Number(photoId))
            if (photo) {
                setPhotoToShow(photo)
                navigate(`/albums/${albumId}/${photo.id}`)
            } else {
                console.log('No photo with this id')
                navigate(`/albums/${albumId}/`)
            }
        }
    }, [photoId, photos, navigate])

    useEffect(() => {
        if (photoToShow) {
            const photoIndex = photos.indexOf(photoToShow);
            const page = Math.ceil((photoIndex + 1) / itemsPerPage)
            if (page !== currentPage) {
                setCurrentPage(page)
            }
            const paginatedPhotos = photos.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            toggleModal(paginatedPhotos, photoToShow.id, albumId)
        }
    }, [photoToShow])

    // if (isLoading) return <p>Loading...</p>
    // if (isError) return <p>Error loading photos.</p>
    // if (!data || !isSuccess) return <p>No photos found.</p>

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedPhotos = toJS(photos).slice(startIndex, endIndex)
    const totalPages = Math.ceil(toJS(photos).length / itemsPerPage)

    return (
        <>
            <GridContainer>
                {paginatedPhotos.map((photo: Photo) => (
                    <PhotoCard
                        onClick={() => {
                            toggleModal(paginatedPhotos, photo.id, albumId)
                            navigate(`/albums/${albumId}/${photo.id}`)
                        }}
                        key={photo.id}
                    >
                        <PhotoImage src={`/directus/assets/${photo.image}?fit=cover&height=150&quality=75`} />
                        <PhotoTitle>{photo.title}</PhotoTitle>
                    </PhotoCard>
                ))}
            </GridContainer>
            <Pagination>
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                    Next
                </button>
            </Pagination>
            <Photo />
        </>
    )
})

export default Album
