import { type PropsWithChildren } from 'react';
export const ComponentSection = ({
  title,
  description,
  children,
  query,
}: { title: string; description?: string; query: string } & PropsWithChildren) => {
  if (
    query &&
    !`${title} ${description}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de'))
  )
    return null;
  return (
    <section className="preview-section">
      <div>
        <span>Component</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="preview-demo">{children}</div>
    </section>
  );
};
