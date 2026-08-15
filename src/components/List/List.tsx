import { type HTMLAttributes } from 'react';
import { mergeClassNames } from '../../utils/mergeClassNames';
import './List.css';
export const List = ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => {
  return <ul className={mergeClassNames('otter-list', className)} {...props} />;
};
