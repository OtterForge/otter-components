import { useState } from 'react';
import otterComponentsLogo from '../../../assets/branding/otter-components-logo.png';
import { componentDocs, componentGroups } from '../../content/componentDocs';

const groupIcons: Record<string, string> = {
  Foundations: 'fas fa-palette',
  Actions: 'fas fa-arrow-pointer',
  Inputs: 'fas fa-keyboard',
  'Data display': 'fas fa-table-cells-large',
  Feedback: 'far fa-circle-check',
};

export const DocsSidebar = ({ currentSlug }: { currentSlug: string }) => {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  return (
    <aside className="docs-sidebar otter-scrollbar" aria-label="Component navigation">
      <a className="docs-sidebar-brand" href="#/components/button">
        <img src={otterComponentsLogo} alt="Otter Components" />
        <span>
          Otter Components<small>Documentation</small>
        </span>
      </a>
      <label className="docs-search">
        <i className="fas fa-magnifying-glass" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search components…"
        />
      </label>
      <nav>
        {componentGroups.map((group) => {
          const items = componentDocs.filter(
            (item) => item.group === group && item.name.toLowerCase().includes(normalizedQuery),
          );
          if (!items.length) return null;
          return (
            <div className="docs-nav-group" key={group}>
              <strong>
                <i className={groupIcons[group]} aria-hidden="true" />
                {group}
              </strong>
              {items.map((item) => (
                <a
                  key={item.slug}
                  href={`#/components/${item.slug}`}
                  aria-current={currentSlug === item.slug ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
