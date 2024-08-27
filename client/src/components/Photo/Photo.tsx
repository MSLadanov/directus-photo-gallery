import ReactDOM from 'react-dom';

  
  function Photo() {
    return ReactDOM.createPortal(
      <div>
        <h1>Popup</h1>
      </div>,
      document.getElementById('portal')!
    );
  }

export default Photo;
