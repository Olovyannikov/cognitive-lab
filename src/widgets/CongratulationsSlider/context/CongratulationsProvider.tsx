import { createContext, type PropsWithChildren, useCallback, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import type { EmblaCarouselType } from 'embla-carousel';
import { noop } from 'lodash-es';

import styles from './CongratulationsProvider.module.css';

interface CongratulationsContextProps {
    embla: null | EmblaCarouselType;
    onNextSlideHandler: VoidFunction;
}

export const CongratulationsContext = createContext<CongratulationsContextProps>({
    embla: null,
    onNextSlideHandler: noop,
});

export const CongratulationsProvider = ({ children }: PropsWithChildren) => {
    const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

    const onNextSlideHandler = useCallback(() => {
        embla?.scrollNext();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [embla]);

    return (
        <CongratulationsContext.Provider
            value={{
                embla,
                onNextSlideHandler,
            }}
        >
            <Carousel getEmblaApi={setEmbla} pb={40} withControls={false} withIndicators classNames={styles}>
                {children}
            </Carousel>
        </CongratulationsContext.Provider>
    );
};
