"use client";

import { useRef, useEffect, useState } from "react";
import SidePanel from "../SidePanel";
import { editorContainer } from "./editor.css";
import Alphabets from "../Alphabets";
import { randomColor } from "@/utils/randomColor";

interface Shape {
  x: number;
  y: number;
  radius: number;
  width: number;
  height: number;
  type: "circle" | "rectangle" | keyof typeof Alphabets;
  isSelected: boolean;
  color: string;
}

export default function Editor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedShapeIndex, setDraggedShapeIndex] = useState<number | null>(
    null
  );

  const handleShapeSelect = (
    shapeType: "circle" | "rectangle" | keyof typeof Alphabets
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const newShape: Shape = {
      x: centerX,
      y: centerY,
      radius: 50,
      width: 100,
      height: 100,
      type: shapeType,
      isSelected: false,
      color: randomColor(),
    };

    setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  const drawShapes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      if (shape.type === "circle") {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape.type === "rectangle") {
        ctx.fillRect(
          shape.x - shape.width / 2,
          shape.y - shape.height / 2,
          shape.width,
          shape.height
        );
      }

      const AlphabetComponent = Alphabets[shape.type as keyof typeof Alphabets];
      if (AlphabetComponent) {
        AlphabetComponent({ x: shape.x, y: shape.y, ctx });
      }
      if (shape.isSelected) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.strokeRect(
          shape.x - shape.width / 2 - 1,
          shape.y - shape.height / 2 - 1,
          shape.width + 2,
          shape.height + 2
        );
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "#fffbf5";
  }, []);

  useEffect(() => {
    drawShapes();
  }, [shapes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseDown = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      const clickedShapeIndex = shapes.findIndex((shape) => {
        if (shape.type === "circle") {
          return (
            Math.sqrt((offsetX - shape.x) ** 2 + (offsetY - shape.y) ** 2) <
            shape.radius
          );
        } else if (shape.type === "rectangle" || shape.type === "S") {
          return (
            offsetX > shape.x - shape.width / 2 &&
            offsetX < shape.x + shape.width / 2 &&
            offsetY > shape.y - shape.height / 2 &&
            offsetY < shape.y + shape.height / 2
          );
        }
        return false;
      });

      if (clickedShapeIndex !== -1) {
        setDraggedShapeIndex(clickedShapeIndex);
        setIsDragging(true);
        setShapes((prevShapes) =>
          prevShapes.map((shape, index) =>
            index === clickedShapeIndex
              ? { ...shape, isSelected: true }
              : { ...shape, isSelected: false }
          )
        );
      } else {
        // 도형 외부를 클릭했을 때 모든 도형의 선택 해제
        setShapes((prevShapes) =>
          prevShapes.map((shape) => ({ ...shape, isSelected: false }))
        );
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDragging || draggedShapeIndex === null) return;

      const { offsetX, offsetY } = event;
      setShapes((prevShapes) =>
        prevShapes.map((shape, index) =>
          index === draggedShapeIndex
            ? { ...shape, x: offsetX, y: offsetY }
            : shape
        )
      );
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setDraggedShapeIndex(null);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
    };
  }, [shapes]);

  return (
    <>
      <SidePanel onShapeSelect={handleShapeSelect} />
      <canvas className={editorContainer} ref={canvasRef} />
    </>
  );
}
