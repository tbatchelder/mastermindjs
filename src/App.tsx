import React, { useState, useCallback } from "react";
import type { Color, GuessEntry, PickerSide, GameSettings } from "./types";
import { ALL_COLORS, DEFAULT_SETTINGS } from "./constants";
import { computeFeedback, generateSecret } from "./utils/feedback";
import { useStats } from "./hooks/useStats";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { InfoPanel } from "./components/InfoPanel";
import { Board } from "./components/Board";

function initGuess(slots: number): Color[] {
  return Array(slots).fill(null);
}

function App() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const activeColors = ALL_COLORS.slice(0, settings.colors);

  const [secret, setSecret] = useState<string[]>(() =>
    generateSecret(activeColors, settings.slots, settings.duplicates),
  );
  const [guesses, setGuesses] = useState<GuessEntry[]>([]);
  const [currentGuess, setCurrentGuess] = useState<Color[]>(
    initGuess(settings.slots),
  );
  const [activeRow, setActiveRow] = useState(0);
  const [pickerSide, setPickerSide] = useState<PickerSide>("left");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const { getStats, recordWin, recordLoss, clearStats } = useStats();

  function startNewGame(nextSettings: GameSettings) {
    const colors = ALL_COLORS.slice(0, nextSettings.colors);
    setSecret(
      generateSecret(colors, nextSettings.slots, nextSettings.duplicates),
    );
    setGuesses([]);
    setCurrentGuess(initGuess(nextSettings.slots));
    setActiveRow(0);
    setGameOver(false);
    setWon(false);
    setSelectedColor(null);
  }

  function handleSettingsChange(next: GameSettings) {
    setSettings(next);
    startNewGame(next);
  }

  const handleToggleSide = useCallback(() => {
    setPickerSide((prev) => (prev === "left" ? "right" : "left"));
  }, []);

  const handleReset = useCallback(() => {
    startNewGame(settings);
  }, [settings]);

  function handleSelectColor(color: string) {
    setSelectedColor((prev) => (prev === color ? null : color));
  }

  function handlePlaceColor(index: number, color: string) {
    if (gameOver) return;
    setCurrentGuess((prev) => {
      const updated = [...prev];
      updated[index] = color;
      return updated;
    });
    setSelectedColor(null);
  }

  function handleClearSlot(index: number) {
    if (gameOver) return;
    setCurrentGuess((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  }

  function handleSubmitGuess() {
    if (currentGuess.includes(null) || gameOver) return;

    const filledGuess = currentGuess as string[];
    const feedback = computeFeedback(filledGuess, secret);
    const newGuesses = [...guesses, { guess: filledGuess, feedback }];
    setGuesses(newGuesses);

    if (feedback.black === settings.slots) {
      setWon(true);
      setGameOver(true);
      recordWin(settings, newGuesses.length);
    } else if (activeRow + 1 >= settings.guesses) {
      setGameOver(true);
      recordLoss(settings);
    }

    setCurrentGuess(initGuess(settings.slots));
    setActiveRow((prev) => prev + 1);
    setSelectedColor(null);
  }

  const currentStats = getStats(settings);

  return (
    <div className="app">
      <Header
        onToggleSide={handleToggleSide}
        onReset={handleReset}
        onOpenSettings={() => setSettingsPanelOpen(true)}
      />

      <div className={`game-area ${pickerSide}`}>
        <Sidebar
          colors={activeColors}
          selectedColor={selectedColor}
          onSelectColor={handleSelectColor}
        />
        <Board
          guesses={guesses}
          currentGuess={currentGuess}
          activeRow={activeRow}
          slots={settings.slots}
          maxRows={settings.guesses}
          selectedColor={selectedColor}
          onPlaceColor={handlePlaceColor}
          onClearSlot={handleClearSlot}
          onSubmit={handleSubmitGuess}
          gameOver={gameOver}
          won={won}
          secret={secret}
        />
        <InfoPanel
          settings={settings}
          stats={currentStats}
          onSettingsChange={handleSettingsChange}
          onClearStats={clearStats}
          mobileOpen={settingsPanelOpen}
          onMobileClose={() => setSettingsPanelOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
