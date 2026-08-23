export interface UsageRulesProps {
  useWhen: string[];
  avoidWhen: string[];
  rules: string[];
}
const RuleList = ({
  title,
  icon,
  items,
  variant,
}: {
  title: string;
  icon: string;
  items: string[];
  variant: string;
}) => (
  <div className={`docs-rule-card docs-rule-card--${variant}`}>
    <strong>
      <i className={icon} aria-hidden="true" /> {title}
    </strong>
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);
export const UsageRules = ({ useWhen, avoidWhen, rules }: UsageRulesProps) => (
  <div className="docs-rules">
    <RuleList title="Use when" icon="fas fa-check" items={useWhen} variant="do" />
    <RuleList title="Avoid when" icon="fas fa-xmark" items={avoidWhen} variant="dont" />
    <RuleList title="Usage rules" icon="fas fa-arrow-right" items={rules} variant="rules" />
  </div>
);
