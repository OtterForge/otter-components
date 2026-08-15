import { type PropsWithChildren, type ReactNode, useId } from 'react';
import { useControllableState } from '../../../hooks/useControllableState';
import './AccordionItem.css';
export interface AccordionItemProps extends PropsWithChildren {
  title: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}
export const AccordionItem = ({
  title,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled,
}: AccordionItemProps) => {
  const [expanded, setExpanded] = useControllableState(open, defaultOpen, onOpenChange),
    id = useId();
  return (
    <div className="otter-accordion-item" data-open={expanded}>
      <button
        type="button"
        className="otter-accordion-trigger"
        aria-expanded={expanded}
        aria-controls={`${id}-panel`}
        disabled={disabled}
        onClick={() => setExpanded(!expanded)}
      >
        <span>{title}</span>
        <span className="otter-accordion-chevron" aria-hidden="true">
          ›
        </span>
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        className="otter-accordion-grid"
        aria-hidden={!expanded}
      >
        <div>
          <div className="otter-accordion-content">{children}</div>
        </div>
      </div>
    </div>
  );
};
