import './Pagination.css';
export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  windowSize?: number;
}
export const Pagination = ({ page, pageCount, onChange, windowSize = 5 }: PaginationProps) => {
  const half = Math.floor(windowSize / 2),
    start = Math.max(1, Math.min(page - half, pageCount - windowSize + 1)),
    pages = Array.from({ length: Math.min(windowSize, pageCount) }, (_, i) => start + i);
  return (
    <nav className="otter-pagination" aria-label="Pagination">
      <button aria-label="Previous page" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <i className="fas fa-chevron-left" aria-hidden="true" />
      </button>
      {pages.map((item) => (
        <button
          key={item}
          aria-current={item === page ? 'page' : undefined}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
      <button
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
      >
        <i className="fas fa-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  );
};
