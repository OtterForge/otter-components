import { type HTMLAttributes, type TableHTMLAttributes } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './Table.css';
export const Table = ({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) => {
  return (
    <div className="otter-table-wrap">
      <table className={mergeClassNames('otter-table', className)} {...props} />
    </div>
  );
};
export const TableHead = (props: HTMLAttributes<HTMLTableSectionElement>) => {
  return <thead {...props} />;
};
export const TableBody = (props: HTMLAttributes<HTMLTableSectionElement>) => {
  return <tbody {...props} />;
};
export const TableHeader = (props: HTMLAttributes<HTMLTableCellElement>) => {
  return <th scope="col" {...props} />;
};
export const TableCell = (props: HTMLAttributes<HTMLTableCellElement>) => {
  return <td {...props} />;
};
