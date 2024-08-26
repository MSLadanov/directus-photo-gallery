import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import albumImg from '../../assets/album.png';
import styled from "styled-components";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
    gap: 16px;
    padding: 16px;
`;

const AlbumCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

const AlbumImage = styled.img`
    height: 150px;
    object-fit: cover; 
    border-radius: 4px;
`;

const AlbumTitle = styled.p`
    margin: 16px 0 0; 
`;

interface Album {
    id: string, 
    userId: string,
    title: string
}

function Albums() {
    let location = useLocation();
    let path = '';
    if (location.pathname.endsWith('/')){
        path = location.pathname.substring(0, location.pathname.length - 1);
    } else {
        path = location.pathname;
    }
    async function getAlbums() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/albums');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch albums:', error);
        }
    }
    const albums = useQuery({ queryKey: ['albums'], queryFn: getAlbums });
    return (
        <GridContainer>
            {albums.data?.map((album: Album) => (
                <Link to={`${path}/${album.id}`} key={album.id}>
                    <AlbumCard>
                        <AlbumImage src={albumImg} alt={album.title} />
                        <AlbumTitle>{album.title}</AlbumTitle>
                    </AlbumCard>
                </Link>
            ))}
        </GridContainer>
    );
}

export default Albums;
