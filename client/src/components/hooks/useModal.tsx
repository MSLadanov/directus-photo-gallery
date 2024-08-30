import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  position: relative;
`

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`

const Image = styled.img`
  width: 100%;
  max-height: 70vh;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  id: string;
  image: string;
  title: string;
  description: string;
  album_id: string;
}

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [currentPhotoId, setCurrentPhotoId] = useState<string | null>(null)
  const [albumId, setAlbumId] = useState('') 
  const navigate = useNavigate()

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function handlePrevious() {
    if (currentPhotoId) {
      const currentIndex = photos.findIndex(photo => photo.id === currentPhotoId)
      if (currentIndex > 0) {
        const previousPhotoId = photos[currentIndex - 1].id
        navigate(`/albums/${albumId}/${previousPhotoId}`)
        setCurrentPhotoId(previousPhotoId)
      }
    }
  }

  function handleNext() {
    if (currentPhotoId) {
      const currentIndex = photos.findIndex(photo => photo.id === currentPhotoId)
      if (currentIndex < photos.length - 1) {
        const nextPhotoId = photos[currentIndex + 1].id
        navigate(`/albums/${albumId}/${nextPhotoId}`)
        setCurrentPhotoId(nextPhotoId)
      }
    }
  }

  function PhotoModal({ onClose }: { onClose: () => void }) {
    if (photos.length === 0 || !currentPhotoId) return null
    const currentPhoto = photos.find(photo => photo.id === currentPhotoId)!
    return ReactDOM.createPortal(
      <ModalOverlay>
        <ModalContent>
          <Image src={`/directus/assets/${currentPhoto.image}`} alt="Photo" />
          <div>{currentPhoto.title}</div>
          <div>{currentPhoto.description}</div>
          <Pagination>
            <button onClick={handlePrevious} disabled={photos.findIndex(photo => photo.id === currentPhotoId) === 0}>
              Previous
            </button>
            <span>{photos.findIndex(photo => photo.id === currentPhotoId) + 1} of {photos.length}</span>
            <button onClick={handleNext} disabled={photos.findIndex(photo => photo.id === currentPhotoId) === photos.length - 1}>
              Next
            </button>
            <CloseButton onClick={() => { onClose(); navigate(`/albums/${albumId}`); }}>Close</CloseButton>
          </Pagination>
        </ModalContent>
      </ModalOverlay>,
      document.getElementById('portal')!
    )
  }

  function toggleModal(data: Photo[], photoId: string, albumId: string) {
    setPhotos([...data])
    setAlbumId(albumId)
    setCurrentPhotoId(photoId)
    openModal()
  }

  function Photo() {
    if (!isModalOpen) return null
    return <PhotoModal onClose={closeModal} />
  }

  return { Photo, toggleModal }
}

export default useModal
