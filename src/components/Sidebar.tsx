interface SidebarProps {
  colors: string[];
  selectedColor: string | null;
  onSelectColor: (color: string) => void;
}

export function Sidebar({
  colors,
  selectedColor,
  onSelectColor,
}: SidebarProps) {
  return (
    <div className="sidebar">
      <h3>Colors</h3>
      {colors.map((color) => (
        <div
          key={color}
          className={[
            "color-pin",
            color === selectedColor ? "color-pin-selected" : "",
          ]
            .join(" ")
            .trim()}
          style={{ background: color }}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("color", color)}
          onClick={() => onSelectColor(color)}
          title={
            color === selectedColor
              ? "Selected — tap a slot to place"
              : "Select color"
          }
        />
      ))}
    </div>
  );
}
