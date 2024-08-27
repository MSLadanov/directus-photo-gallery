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
function useModal(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    function openModal () {
        setIsModalOpen(true)
    }
    function closeModal () {
       setIsModalOpen(false) 
    } 
    const [content, setContent] = useState('')
    function PhotoModal({ onClose } : any){
        return ReactDOM.createPortal(
          <ModalOverlay>
            <ModalContent>
                <Card onClick={openModal}>
                  <Image src={content} alt="Photo" />
                </Card>
              <CloseButton onClick={onClose}>Close</CloseButton>
            </ModalContent>
          </ModalOverlay>,
          document.getElementById('portal')!
        )
      }
      function toggleModal(content : string){
        openModal()
        setContent(content)
      }
      function Photo () {
        if (!isModalOpen) return null;
        return (
          <div>
            {isModalOpen && <PhotoModal onClose={closeModal} />}
          </div>
        )
      }
      return {Photo, toggleModal}
}
export default useModal;