import "./App.css";
import { useState, useEffect } from "react";
import { Informations } from "./Informations";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInfoIndex, setSelectedInfoIndex] = useState(null);

  function handleShowMore(index) {
    setIsOpen(true);
    setSelectedInfoIndex(index);
  }

  function handleCloseOverlay() {
    setIsOpen(false);
    setSelectedInfoIndex(null);
  }

  useEffect(() => {
    function handleEscape(event) {
      if (event.keyCode === 27) {
        handleCloseOverlay();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const textFieldComponents = Informations.map((info) => (
    <TextField
      key={info.index}
      onShowMore={() => handleShowMore(info.index)}
      isOpen={isOpen}
      info={info}
    />
  ));

  return (
    <>
      <div className="container">
        <ImageField />
        {textFieldComponents}
      </div>
      <Overlay
        isOpen={isOpen}
        onCloseOverlay={handleCloseOverlay}
        selectedInfo={Informations[selectedInfoIndex]}
      />
    </>
  );
}

function ImageField() {
  return <div className="item item-1"></div>;
}

function TextField({ onShowMore, isOpen, info }) {
  return (
    <div className="item item-text">
      <h1>{info.title}</h1>
      <p>{info.text}</p>
      <button className="btn" onClick={onShowMore}>
        Show More
      </button>
    </div>
  );
}

function Overlay({ isOpen, onCloseOverlay, selectedInfo }) {
  return (
    <div className="overlay" style={{ display: isOpen ? "block" : "none" }}>
      <button onClick={onCloseOverlay} style={{ fontWeight: "bold" }}>
        X
      </button>
      <div className="main">
        <h1>{selectedInfo ? selectedInfo.title : ""}</h1>
        <p>{selectedInfo ? selectedInfo.extendedText : ""}</p>
      </div>
    </div>
  );
}
