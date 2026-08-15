import {
  type HTMLAttributes,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react';
import './tooltip.css';

type Target = HTMLElement & { dataset: DOMStringMap & { otterTitle?: string } };
interface TooltipState {
  text: string;
  left: number;
  top: number;
}
export const TooltipProvider = ({ children }: PropsWithChildren) => {
  const id = useId(),
    [tip, setTip] = useState<TooltipState | null>(null);
  const adopt = useCallback(
    (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[title]').forEach((el) => {
        el.dataset.otterTitle = el.title;
        el.removeAttribute('title');
        if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-describedby'))
          el.setAttribute('aria-describedby', id);
      });
    },
    [id],
  );
  useEffect(() => {
    adopt(document);
    const observer = new MutationObserver((records) =>
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.title) {
              node.dataset.otterTitle = node.title;
              node.removeAttribute('title');
            }
            adopt(node);
          }
        }),
      ),
    );
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [adopt]);
  const show = (target: Target) => {
    const text = target.dataset.otterTitle;
    if (!text) return;
    const rect = target.getBoundingClientRect();
    setTip({ text, left: rect.left + rect.width / 2, top: rect.top - 8 });
  };
  useEffect(() => {
    const over = (e: Event) => {
      const t = (e.target as Element)?.closest<Target>('[data-otter-title]');
      if (t) show(t);
    };
    const out = () => setTip(null);
    document.addEventListener('pointerover', over);
    document.addEventListener('focusin', over);
    document.addEventListener('pointerout', out);
    document.addEventListener('focusout', out);
    return () => {
      document.removeEventListener('pointerover', over);
      document.removeEventListener('focusin', over);
      document.removeEventListener('pointerout', out);
      document.removeEventListener('focusout', out);
    };
  }, []);
  return (
    <>
      {children}
      <div
        id={id}
        role="tooltip"
        className="otter-tooltip"
        data-open={Boolean(tip)}
        style={tip ? { left: tip.left, top: tip.top } : undefined}
      >
        {tip?.text}
      </div>
    </>
  );
};
export type TooltipTargetProps = HTMLAttributes<HTMLElement>;
