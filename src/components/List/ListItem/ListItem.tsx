import { type HTMLAttributes, type ReactNode } from 'react';
import { mergeClassNames } from '../../../utils/mergeClassNames';
import './ListItem.css';
export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  avatar?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  unread?: boolean;
  interactive?: boolean;
}
export const ListItem = ({
  avatar,
  title,
  description,
  meta,
  unread = false,
  interactive = true,
  className,
  ...props
}: ListItemProps) => {
  return (
    <li
      className={mergeClassNames('otter-list-item', interactive && 'is-interactive', className)}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {avatar}
      <span className="otter-list-main">
        <span className="otter-list-title">
          {title}
          {unread ? (
            <span className="otter-list-unread">
              <span>Ungelesen</span>
            </span>
          ) : null}
        </span>
        {description ? <span className="otter-list-description">{description}</span> : null}
      </span>
      {meta ? <span className="otter-list-meta">{meta}</span> : null}
    </li>
  );
};
