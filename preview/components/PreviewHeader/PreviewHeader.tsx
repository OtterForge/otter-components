import {
  useTheme,
  type ContrastMode,
  type Density,
  type MotionMode,
  type ThemeMode,
} from '@otter/components';

const Group = ({
  label,
  values,
  value,
  onChange,
}: {
  label: string;
  values: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="preview-setting">
    <span>{label}</span>
    <div className="preview-segment" role="group" aria-label={label}>
      {values.map((item) => (
        <button
          type="button"
          key={item.value}
          aria-pressed={value === item.value}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);

export const PreviewHeader = ({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}) => {
  const theme = useTheme();
  return (
    <header className="preview-header">
      <div className="preview-header-title">
        <strong>Components</strong>
        <span>Interactive React documentation</span>
      </div>
      <div className="preview-settings">
        <label className="preview-color-setting">
          <span>Primary</span>
          <span className="preview-color-control">
            <input
              type="color"
              value={primaryColor}
              aria-label="Primary demo color"
              onChange={(event) => onPrimaryColorChange(event.target.value)}
            />
            <code>{primaryColor}</code>
          </span>
        </label>
        <label className="preview-color-setting">
          <span>Secondary</span>
          <span className="preview-color-control">
            <input
              type="color"
              value={secondaryColor}
              aria-label="Secondary demo color"
              onChange={(event) => onSecondaryColorChange(event.target.value)}
            />
            <code>{secondaryColor}</code>
          </span>
        </label>
        <Group
          label="Theme"
          values={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' },
          ]}
          value={theme.theme}
          onChange={(value) => theme.setTheme(value as ThemeMode)}
        />
        <Group
          label="Motion"
          values={[
            { value: 'on', label: 'On' },
            { value: 'off', label: 'Off' },
          ]}
          value={theme.motion}
          onChange={(value) => theme.setMotion(value as MotionMode)}
        />
        <Group
          label="Contrast"
          values={[
            { value: 'standard', label: 'Standard' },
            { value: 'high', label: 'High' },
            { value: 'cvd', label: 'CVD' },
          ]}
          value={theme.contrast}
          onChange={(value) => theme.setContrast(value as ContrastMode)}
        />
        <Group
          label="Size"
          values={[
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
          ]}
          value={theme.density}
          onChange={(value) => theme.setDensity(value as Density)}
        />
      </div>
    </header>
  );
};
