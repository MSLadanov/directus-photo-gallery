import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Photo from "../hooks/useModal";
import useModal from "../hooks/useModal";


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
    gap: 16px;
    padding: 16px;
`;

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
    height: 300px; 
    box-sizing: border-box; 
    
    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
`;

const PhotoImage = styled.img`
    width: 100%;
    height: 150px; 
    object-fit: cover; 
    border-radius: 4px;
`;

const PhotoTitle = styled.p`
    margin: 16px 0 0; 
`;

interface Photo{
    albumId: string,
    id: string,
    thumbnailUrl: string,
    title: string,
    url: string
}

function Album() {
    const location = useLocation()
    const {Photo, toggleModal} = useModal()
    let locationArray = location.pathname.split('/').filter((item) => item.length !== 0)
    let albumId = ''
    if(locationArray.length === 2){
        albumId = locationArray[locationArray.length - 1]
    } else {
        albumId = locationArray[locationArray.length - 2]
    }
    async function getPhotos() {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch photos:', error);
        }
    }
    const photos = useQuery({ queryKey: ['photos'], queryFn: getPhotos });
    return (
        <>
            <GridContainer>
                {photos.data?.map((photo : Photo) => (
                    <PhotoCard onClick={() => toggleModal('Hey!')} key={photo.id}>
                        <PhotoImage src={photo.url} />
                        <PhotoTitle>{photo.title}</PhotoTitle>
                    </PhotoCard>
                ))}
            </GridContainer>
            <Photo />
        </>
    );
}

export default Album;