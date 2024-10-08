import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import albumStore from "../../store/AlbumStore";
import { toJS } from "mobx";
import Loader from "../Loader/Loader";

const GridContainer = styled.div`
  display: grid;
  margin-top: 45px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 60px;
  padding: 16px;
  justify-content: center;
`;

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
  height: 260px;
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
`;

interface Album {
  id: string;
  title: string;
  description: string;
  album_cover: string;
}

const Albums: React.FC = observer(() => {
  const { albums, fetchStateAlbums, isLoading, isError, setCurrentAlbumId } =
    albumStore;
  let location = useLocation();
  let path = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = toJS(albums!).slice(startIndex, endIndex);
  const totalPages = Math.ceil(toJS(albums!).length / itemsPerPage);
  useEffect(() => {
    fetchStateAlbums();
  }, []);
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && <GridContainer>
        {paginatedData.map((album: Album) => (
          <Link to={`${path}/${album.id}`} key={album.id}>
            <AlbumCard onClick={() => setCurrentAlbumId(album.id)}>
              <AlbumImage
                src={`/directus/assets/${album.album_cover}?fit=cover&height=150&quality=75`}
              />
              <AlbumTitle>{album.title}</AlbumTitle>
            </AlbumCard>
          </Link>
        ))}
      </GridContainer>}
      {albums && !isLoading && (
        <Pagination>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </Pagination>
      )}
    </div>
  );
});

export default Albums;
