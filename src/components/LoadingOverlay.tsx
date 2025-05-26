import React from 'react'
import '../style/LoadingOverlay.css'

interface LoadingOverlayProps {
    show : boolean;
}

const LoadingOverlay:React.FC<LoadingOverlayProps> = ({show}) => {

    if(!show) return null;

  return (
     <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex: 1050 }}
    >
      <div className="loader"></div>
    </div>
  )
}

export default LoadingOverlay