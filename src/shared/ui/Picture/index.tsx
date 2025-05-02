import { Image, type ImageProps } from '@mantine/core';
import clsx from 'clsx';

import { CDN_URL } from '@/shared/config';

import s from './Picture.module.css';

interface PictureProps extends ImageProps {
    width?: number;
    height?: number;
    alt?: string;
    draggable?: boolean;
    extraPath?: string;
    cdn?: boolean;
}

export const Picture = ({
    src,
    width,
    height,
    alt = '',
    draggable = false,
    className,
    extraPath,
    cdn = false,
    ...props
}: PictureProps) => {
    const path = src?.split('/')?.at(-1);
    let fullPath = `${src}/${path}${extraPath ? `${extraPath}` : ''}`;

    if (cdn) {
        fullPath = CDN_URL + fullPath;
    }

    return (
        <picture className={clsx(s.picture, className)}>
            <source srcSet={`${fullPath}.avif 1x, ${fullPath}@2x.avif 2x`} type='image/avif' />
            <source srcSet={`${fullPath}.webp 1x, ${fullPath}@2x.webp 2x`} type='image/webp' />
            <source srcSet={`${fullPath}.jpeg 1x, ${fullPath}@2x.jpeg 2x`} />
            <source srcSet={`${fullPath}.jpg 1x, ${fullPath}@2x.jpg 2x`} />
            <source srcSet={`${fullPath}.png 1x, ${fullPath}@2x.png 2x`} />
            <Image
                fetchPriority='high'
                loading='lazy'
                draggable={draggable}
                w={width}
                h={height}
                width={width}
                height={height}
                src={fullPath + '.png'}
                alt={alt}
                aria-hidden
                fallbackSrc={fullPath + '.png'}
                {...props}
            />
        </picture>
    );
};
