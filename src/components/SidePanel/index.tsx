import Alphabets from "../Alphabets";
import {
  sidePanelContainer,
  sidePanelSection,
  sidePanelShapeButton,
} from "./sidepanel.css";

interface PanelProps {
  onShapeSelect: (
    shape: "circle" | "rectangle" | keyof typeof Alphabets
  ) => void;
}

const SidePanel = ({ onShapeSelect }: PanelProps) => {
  return (
    <section className={sidePanelContainer}>
      <h3>도형 추가</h3>
      <div className={sidePanelSection}>
        <button
          className={sidePanelShapeButton}
          onClick={() => onShapeSelect("circle")}
        >
          ⚫️
        </button>
        <button
          className={sidePanelShapeButton}
          onClick={() => onShapeSelect("rectangle")}
        >
          ⬛️
        </button>
        <button
          className={sidePanelShapeButton}
          onClick={() => onShapeSelect("S")}
        >
          S
        </button>
      </div>
    </section>
  );
};

export default SidePanel;
