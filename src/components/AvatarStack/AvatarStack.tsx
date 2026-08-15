import { Children, type PropsWithChildren } from 'react';
import './AvatarStack.css';
export interface AvatarStackProps extends PropsWithChildren {
  label?: string;
  max?: number;
}
export const AvatarStack = ({ children, label = 'Team', max = 4 }: AvatarStackProps) => {
  const items = Children.toArray(children),
    hidden = Math.max(0, items.length - max);
  return (
    <div className="otter-avatar-stack" aria-label={label}>
      {items.slice(0, max)}
      {hidden ? <span className="otter-avatar-more">+{hidden}</span> : null}
    </div>
  );
};
