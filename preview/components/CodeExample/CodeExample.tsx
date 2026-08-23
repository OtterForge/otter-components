import { useState } from 'react';
export interface CodeExampleProps {
  title: string;
  description: string;
  code: string;
}
export const CodeExample = ({ title, description, code }: CodeExampleProps) => {
  const [open, setOpen] = useState(false);
  return (
    <article className="docs-code-example" data-open={open}>
      <div>
        <span>
          <strong>{title}</strong>
          <small>{description}</small>
        </span>
        <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <i className="fas fa-code" aria-hidden="true" /> {open ? 'Hide code' : 'Show code'}
        </button>
      </div>
      <div className="docs-code-grid" aria-hidden={!open}>
        <div>
          <pre className="otter-scrollbar">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </article>
  );
};
