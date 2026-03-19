interface HeaderProps {
  onToggleSide: () => void;
  onReset: () => void;
}

export function Header({ onToggleSide, onReset }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        {/* Replace src with your actual logo */}
        <img src="/beam-logo.svg" alt="Logo" className="logo" />
        <h1 className="title">MastermindJS</h1>
      </div>

      <div className="header-right">
        <button className="toggle-btn" onClick={onToggleSide}>
          Switch Side
        </button>
        <button className="reset-btn" onClick={onReset}>
          New Game
        </button>
      </div>
    </header>
  );
}
