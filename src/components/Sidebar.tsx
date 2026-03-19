interface SidebarProps {
  colors: string[];
}

export function Sidebar({ colors }: SidebarProps) {
  return (
    <div className="sidebar">
      <h3>Colors</h3>
      {colors.map((color) => (
        <div
          key={color}
          className="color-pin"
          style={{ background: color }}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("color", color)}
          title={color}
        />
      ))}
    </div>
  );
}
