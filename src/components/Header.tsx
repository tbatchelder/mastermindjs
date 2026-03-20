import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/beam-logo.svg";

interface HeaderProps {
  onToggleSide: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
}

export function Header({ onToggleSide, onReset, onOpenSettings }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleToggleSide() {
    onToggleSide();
    setMenuOpen(false);
  }

  function handleReset() {
    onReset();
    setMenuOpen(false);
  }

  function handleOpenSettings() {
    onOpenSettings();
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">MastermindJS</h1>
      </div>

      {/* Desktop buttons */}
      <div className="header-right desktop-only">
        <button className="toggle-btn" onClick={onToggleSide}>
          Switch Side
        </button>
        <button className="reset-btn" onClick={onReset}>
          New Game
        </button>
      </div>

      {/* Mobile ⋮ menu */}
      <div className="header-menu mobile-only" ref={menuRef}>
        <button
          className="menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu"
        >
          ⋮
        </button>
        {menuOpen && (
          <div className="menu-dropdown">
            <button className="menu-item" onClick={handleToggleSide}>
              Switch Side
            </button>
            <button className="menu-item" onClick={handleReset}>
              New Game
            </button>
            <button className="menu-item" onClick={handleOpenSettings}>
              ⚙️ Settings
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
