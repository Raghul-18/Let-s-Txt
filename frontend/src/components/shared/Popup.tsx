import React, { useEffect } from "react";

function Popup({
  text,
  showPopup,
  setShowPopup,
}: {
  text: string;
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer); // Clear timeout if the component unmounts or showPopup changes
    }
  }, [showPopup, setShowPopup]);

  return (
    <div
      className={`absolute bottom-20 left-1/2 z-30 -translate-x-1/2 opacity-0 ${
        showPopup && "animate-popup"
      }`}
    >
      {text}
    </div>
  );
}

export default Popup;
