interface PanelProps {
  onShapeSelect: (shape: "circle" | "rectangle") => void;
}

const SidePanel = ({ onShapeSelect }: PanelProps) => {
  return (
    <div>
      <button onClick={() => onShapeSelect("circle")}>원 추가</button>
      <button onClick={() => onShapeSelect("rectangle")}>사각형 추가</button>
    </div>
  );
};

export default SidePanel;
