import React, { useState } from 'react'
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

const Card = styled.div`
  cursor: pointer;
  width: 200px;
  height: 200px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
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
  url: string;
}

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [currentIndex, setCurrentIndex] = useState(0) 
  function openModal() {
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
  }
  function handlePrevious() {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }
  function handleNext() {
    setCurrentIndex((prev) => Math.min(prev + 1, photos.length - 1))
  }
  function PhotoModal({ onClose }: { onClose: () => void }) {
    if (photos.length === 0) return null
    const currentPhoto = photos[currentIndex]
    return ReactDOM.createPortal(
      <ModalOverlay>
        <ModalContent>
          <Image src={currentPhoto.url} alt="Photo" />
          <Pagination>
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </button>
            <span>{currentIndex + 1} of {photos.length}</span>
            <button onClick={handleNext} disabled={currentIndex === photos.length - 1}>
              Next
            </button>
          </Pagination>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalContent>
      </ModalOverlay>,
      document.getElementById('portal')!
    )
  }

  function toggleModal(data: Photo[], photoId: string) {
    const initialIndex = data.findIndex(photo => photo.id === photoId)
    setPhotos([...data])
    setCurrentIndex(initialIndex)
    openModal()
  }

  function Photo() {
    if (!isModalOpen) return null
    return <PhotoModal onClose={closeModal} />
  }

  return { Photo, toggleModal }
}

export default useModal;