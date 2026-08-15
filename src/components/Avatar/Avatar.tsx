import { type ImgHTMLAttributes } from 'react';
import './Avatar.css';
export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  name: string;
  size?: 's' | 'm' | 'l';
}
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
export const Avatar = ({ src, name, size = 'm', ...props }: AvatarProps) => {
  return src ? (
    <img className={`otter-avatar otter-avatar--${size}`} src={src} alt={name} {...props} />
  ) : (
    <span className={`otter-avatar otter-avatar--${size}`} role="img" aria-label={name}>
      {initials(name)}
    </span>
  );
};
