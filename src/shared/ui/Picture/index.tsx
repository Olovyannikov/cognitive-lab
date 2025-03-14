import { type ComponentProps } from 'react';
import clsx from 'clsx';

import s from './Picture.module.css';

interface PictureProps extends ComponentProps<'picture'> {
    /**
     * Pass a src string `/catalog/imageName`
     * */
    src?: `/${string}/${string}`;
    width?: number;
    height?: number;
    alt?: string;
}

export const Picture = ({ src, width, height, alt = '', draggable = false, className }: PictureProps) => {
    const path = src?.split('/').at(-1);
    const fullPath = `${src}/${path}`;

    return (
        <picture className={clsx(s.picture, className)}>
            <source srcSet={`${fullPath}.avif 1x, ${fullPath}@2x.avif 2x`} type='image/avif' />
            <source srcSet={`${fullPath}.webp 1x, ${fullPath}@2x.webp 2x`} type='image/webp' />
            <source srcSet={`${fullPath}.jpeg 1x, ${fullPath}@2x.jpeg 2x`} />
            <source srcSet={`${fullPath}.jpg 1x, ${fullPath}@2x.jpg 2x`} />
            <source srcSet={`${fullPath}.png 1x, ${fullPath}@2x.png 2x`} />
            <img
                loading='lazy'
                draggable={draggable}
                width={width}
                height={height}
                src={fullPath + '.png'}
                alt={alt}
                aria-hidden
            />
        </picture>
    );
};
