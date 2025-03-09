import type { ComponentProps } from 'react';
import clsx from 'clsx';

import s from './Picture.module.css';

interface PictureProps extends ComponentProps<'picture'> {
    src?: string;
    width?: number;
    height?: number;
    alt?: string;
}

export const Picture = ({ src, width, height, alt = '', className }: PictureProps) => {
    return (
        <picture className={clsx(s.picture, className)}>
            <source srcSet={`${src}.webp, ${src}@2x.webp 2x`} />
            <img width={width} height={height} src={`${src}.png`} alt={alt} />
        </picture>
    );
};
