import type { GameSettings, LevelStats } from "../types";
import {
  SLOT_MIN,
  SLOT_MAX,
  COLOR_MIN,
  COLOR_MAX,
  GUESS_MIN,
  GUESS_MAX,
} from "../constants";

interface InfoPanelProps {
  settings: GameSettings;
  stats: LevelStats;
  onSettingsChange: (next: GameSettings) => void;
  onClearStats: () => void;
}

export function InfoPanel({
  settings,
  stats,
  onSettingsChange,
  onClearStats,
}: InfoPanelProps) {
  function update<K extends keyof GameSettings>(
    key: K,
    value: GameSettings[K],
  ) {
    onSettingsChange({ ...settings, [key]: value });
  }

  // Guard: no-dupe mode can't have more slots than colors
  const maxSlotsNoDupe = settings.duplicates
    ? SLOT_MAX
    : Math.min(SLOT_MAX, settings.colors);
  const effectiveSlotMax = maxSlotsNoDupe;

  return (
    <div className="info-panel">
      {/* ── HOW TO PLAY ── */}
      <section className="info-section">
        <h3>How to Play</h3>
        <ol className="instructions-list">
          <li>Drag a color from the Color panel into a slot.</li>
          <li>
            Fill all slots, then hit <strong>Submit</strong>.
          </li>
          <li>
            Feedback pegs:
            <ul>
              <li>
                <span className="peg-demo peg-black-demo" /> right color &amp;
                spot
              </li>
              <li>
                <span className="peg-demo peg-yellow-demo" /> right color, wrong
                spot
              </li>
            </ul>
          </li>
          <li>Crack the code in time!</li>
        </ol>
      </section>

      {/* ── SETTINGS ── */}
      <section className="info-section">
        <h3>Settings</h3>
        <p className="settings-note">Changing any setting starts a new game.</p>

        <label className="setting-label">
          Slots: <strong>{settings.slots}</strong>
          <input
            type="range"
            min={SLOT_MIN}
            max={effectiveSlotMax}
            value={settings.slots}
            onChange={(e) => update("slots", Number(e.target.value))}
          />
        </label>

        <label className="setting-label">
          Colors: <strong>{settings.colors}</strong>
          <input
            type="range"
            min={COLOR_MIN}
            max={COLOR_MAX}
            value={settings.colors}
            onChange={(e) => {
              const colors = Number(e.target.value);
              // If no-dupe and slots would exceed color count, clamp slots too
              const slots =
                !settings.duplicates && settings.slots > colors
                  ? colors
                  : settings.slots;
              onSettingsChange({ ...settings, colors, slots });
            }}
          />
        </label>

        <label className="setting-label">
          Guesses: <strong>{settings.guesses}</strong>
          <input
            type="range"
            min={GUESS_MIN}
            max={GUESS_MAX}
            value={settings.guesses}
            onChange={(e) => update("guesses", Number(e.target.value))}
          />
        </label>

        <label className="setting-label toggle-label">
          Duplicates
          <input
            type="checkbox"
            checked={settings.duplicates}
            onChange={(e) => {
              const duplicates = e.target.checked;
              // Clamp slots if switching to no-dupe and slots > colors
              const slots =
                !duplicates && settings.slots > settings.colors
                  ? settings.colors
                  : settings.slots;
              onSettingsChange({ ...settings, duplicates, slots });
            }}
          />
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
        </label>
      </section>

      {/* ── STATS ── */}
      <section className="info-section">
        <h3>
          Stats <span className="stats-config">(this config)</span>
        </h3>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-value">{stats.wins}</span>
            <span className="stat-label">Wins</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{stats.losses}</span>
            <span className="stat-label">Losses</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">
              {stats.wins + stats.losses > 0
                ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100) +
                  "%"
                : "—"}
            </span>
            <span className="stat-label">Win Rate</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{stats.bestGuesses ?? "—"}</span>
            <span className="stat-label">Best</span>
          </div>
        </div>
        <button className="clear-stats-btn" onClick={onClearStats}>
          Clear All Stats
        </button>
      </section>
    </div>
  );
}
