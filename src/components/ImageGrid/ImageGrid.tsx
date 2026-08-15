import type { ImgHTMLAttributes } from 'react';
import './ImageGrid.css';
export interface ImageGridProps {
  images: Array<ImgHTMLAttributes<HTMLImageElement> & { src: string }>;
}
export const ImageGrid = ({ images }: ImageGridProps) => {
  return (
    <div className="otter-image-grid">
      {images.map(({ src, ...image }, index) => (
        <img key={`${src}-${index}`} src={src} {...image} />
      ))}
    </div>
  );
};
