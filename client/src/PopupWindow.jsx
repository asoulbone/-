import React, { useState } from 'react';

const PopupWindow = ({ onClose, recommendedPhotos }) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
    onClose();
  };

  return (
    showPopup && (
      <div className="popup-window">
        <div className="popup-content">
          <h2>Recommended Photos</h2>
          {recommendedPhotos.map((photo, index) => (
            <div key={index} className="recommended-photo">
              <img src={photo.imageUrl} alt={`Recommended Photo ${index}`} />
              <p>{photo.title}</p>
            </div>
          ))}
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default PopupWindow;