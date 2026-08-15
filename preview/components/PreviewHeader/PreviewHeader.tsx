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
  values: string[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="preview-segment" role="group" aria-label={label}>
    {values.map((item) => (
      <button key={item} aria-pressed={value === item} onClick={() => onChange(item)}>
        {item}
      </button>
    ))}
  </div>
);
export const PreviewHeader = ({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (value: string) => void;
}) => {
  const theme = useTheme();
  return (
    <header className="preview-header">
      <div className="preview-header-top">
        <a className="preview-brand" href="#top">
          <span />
          Otter Components <small>v0.1</small>
        </a>
        <Group
          label="Farbschema"
          values={['light', 'dark', 'system']}
          value={theme.theme}
          onChange={(value) => theme.setTheme(value as ThemeMode)}
        />
      </div>
      <div className="preview-toolbar">
        <label className="preview-search">
          ⌕
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Komponente finden …"
          />
        </label>
        <Group
          label="Animation"
          values={['on', 'off']}
          value={theme.motion}
          onChange={(value) => theme.setMotion(value as MotionMode)}
        />
        <Group
          label="Kontrast"
          values={['standard', 'high', 'cvd']}
          value={theme.contrast}
          onChange={(value) => theme.setContrast(value as ContrastMode)}
        />
        <Group
          label="Dichte"
          values={['s', 'm', 'l']}
          value={theme.density}
          onChange={(value) => theme.setDensity(value as Density)}
        />
      </div>
    </header>
  );
};
