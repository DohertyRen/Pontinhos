import { useState } from "react";
import "./App.css";

function App() {
  const [clickedPoint, setClickedPoint] = useState([]);
  const [undonePoint, setUndonePoint] = useState([]);

  const randomColor =
    "#" +
    Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, "0");

  function keyDownModifier(e) {
    var evtobj = window.event ? event : e;
    if (evtobj.keyCode == 90 && evtobj.ctrlKey)
      if (!clickedPoint.length == 0) undoClick();
    if (evtobj.keyCode == 89 && evtobj.ctrlKey)
      if (!undonePoint.length == 0) redoClick();
  }

  document.onkeydown = keyDownModifier;

  function getClickedPoint(e) {
    let { clientX, clientY } = e;
    setClickedPoint([...clickedPoint, { clientX, clientY, randomColor }]);
  }

  function undoClick() {
    let copiedClickedPoint = [...clickedPoint];
    let undonePoints = copiedClickedPoint.pop();
    setClickedPoint([...copiedClickedPoint]);
    setUndonePoint([...undonePoint, undonePoints]);
  }

  function redoClick() {
    let copiedUndonePoint = [...undonePoint];
    let redonePoints = copiedUndonePoint.pop();
    setUndonePoint([...copiedUndonePoint]);
    setClickedPoint([...clickedPoint, redonePoints]);
  }

  return (
    <>
      <div className="buttons">
        <button disabled={clickedPoint.length == 0} onClick={undoClick}>
          Undo
        </button>
        <button disabled={undonePoint.length == 0} onClick={redoClick}>
          Redo
        </button>
      </div>
      <div className="window" onClick={getClickedPoint}>
        {clickedPoint.map((clickedPoint, index) => {
          return (
            <div
              key={index}
              style={{
                top: clickedPoint.clientY - 5,
                left: clickedPoint.clientX - 5,
                background: clickedPoint.randomColor,
                position: "fixed",
                borderRadius: "50%",
                width: "10px",
                height: "10px",
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default App;
