import { createContext, type PropsWithChildren, useCallback, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import type { EmblaCarouselType } from 'embla-carousel';
import AutoHeight from 'embla-carousel-auto-height';
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

    const autoheight = useRef(AutoHeight());

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
            <Carousel
                styles={{
                    container: {
                        display: 'flex',
                        height: '100%',
                        alignItems: 'flex-start',
                        transition: 'height 0.2s',
                    },
                }}
                pb={60}
                getEmblaApi={setEmbla}
                withControls={false}
                withIndicators
                classNames={styles}
                plugins={[autoheight.current]}
            >
                {children}
            </Carousel>
        </CongratulationsContext.Provider>
    );
};
