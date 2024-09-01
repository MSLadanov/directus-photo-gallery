import { useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    bottom: -100px;
    opacity: 0;
  }
  to {
    bottom: 90px;
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    bottom: 90px;
    opacity: 1;
  }
  to {
    bottom: -100px;
    opacity: 0;
  }
`;

const StyledPopup = styled.div<{ isVisible: boolean; bgColor: string }>`
  display: flex;
  background-color: ${({ bgColor }) => bgColor};
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: 45px;
  padding: 8px 16px;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  color: #000;
  text-align: center;
  overflow: none;
  animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)} 0.5s ease-in-out forwards;
`;

function usePopup() {
  const colors = {
    error: 'rgba(255, 205, 210, 0.8)',
    warning: 'rgba(255, 243, 205, 0.8)',
    success: 'rgba(200, 230, 201, 0.8)',
  };

  const [showPopup, setShowPopup] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'warning' | 'error'>('success');

  function togglePopup(message: string, type: 'success' | 'warning' | 'error') {
    setMessage(message);
    setType(type);
    setIsMounted(true);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setTimeout(() => {
        setIsMounted(false);
      }, 500); 
    }, 3000); 
  }

  function Popup() {
    if (!isMounted) return null;

    return ReactDOM.createPortal(
      <StyledPopup bgColor={colors[type]} isVisible={showPopup}>
        <p>{message}</p>
      </StyledPopup>,
      document.getElementById('popup')!
    );
  }

  return { togglePopup, Popup };
}

export default usePopup;
