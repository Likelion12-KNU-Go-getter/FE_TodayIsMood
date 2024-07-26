// DrawingPage.jsx
import React, { useRef, useState, useEffect } from "react";
import "./DrawingPage.css";

const DrawingPage = ({ onSave, selectedDate }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("pencil");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const endDrawing = () => {
    context.closePath();
    setDrawing(false);
  };

  const draw = (e) => {
    if (!drawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "eraser") {
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = 15;
    } else {
      context.globalCompositeOperation = "source-over";
      context.lineWidth = tool === "pencil" ? 2 : 10;
      context.strokeStyle = color;
    }

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");
    const moodText = prompt("Enter your mood...");
    onSave(imageData, moodText, selectedDate);
  };

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FFA500",
    "#800080",
  ];

  return (
    <div className="drawing-page">
      <div className="mood-container">
        <div className="mood-bubble">
          <input type="text" placeholder="Enter your mood..." />
        </div>
      </div>
      <div className="color-palette">
        {colors.map((col) => (
          <div
            key={col}
            className="color-swatch"
            style={{ backgroundColor: col }}
            onClick={() => setColor(col)}
          />
        ))}
      </div>
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        width={500}
        height={500}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
      />
      <div className="tools-container">
        <button onClick={() => setTool("pencil")} className="tool-button">
          Pencil
        </button>
        <button onClick={() => setTool("highlighter")} className="tool-button">
          Highlighter
        </button>
        <button onClick={() => setTool("eraser")} className="tool-button">
          Eraser
        </button>
        <button onClick={saveDrawing} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default DrawingPage;
