import { Group, Pagination, Paper, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { useStoreMap, useUnit } from 'effector-react';

import { getFullReportQuery, getIconsMap, ReportModel } from '@/entities/Report';
import { TYPE_TO_COLOR_MAP } from '@/shared/constants';
import { useIsLarge } from '@/shared/hooks';

import s from './ReportPagination.module.css';

export const ReportPagination = () => {
    const isLarge = useIsLarge();

    const [page, onChangePage] = useUnit([ReportModel.$currentPage, ReportModel.currentPageChanged]);
    const [isFirstPage, isLastPage] = useUnit([ReportModel.$isFirstPage, ReportModel.$isLastPage]);

    const content = useStoreMap({
        store: getFullReportQuery.$data,
        keys: ['title', 'content', page],
        fn: (content) => content?.content?.map(({ title }) => ({ title, mbti: content.mbti_type })),
    });

    const icons = getIconsMap(isLarge);
    const titlePrev = content[page - 1].title;
    const titleNext = content[page].title;
    const color = TYPE_TO_COLOR_MAP[content[page].mbti];
    const [_, scrollTo] = useWindowScroll();

    return (
        <Pagination.Root
            className={s.root}
            mb={60}
            value={page}
            onChange={(page) => {
                scrollTo({
                    y: 0,
                });
                onChangePage(page);
            }}
            total={content.length}
        >
            <Group className={s.grid}>
                {!isFirstPage && (
                    <Pagination.Previous
                        className={s.prev}
                        icon={() => (
                            <Group align='center' wrap='nowrap'>
                                <ArrowLeft
                                    color={`var(--mantine-color-${color}-9)`}
                                    weight='bold'
                                    size={isLarge ? 32 : 28}
                                />
                                <Group wrap='nowrap'>
                                    <Paper
                                        className={s.paper}
                                        p={isLarge ? 'lg' : 'xs'}
                                        py={isLarge ? 18.5 : 6}
                                        bg={`${color}.0`}
                                        c={`${color}.9`}
                                    >
                                        {icons[titlePrev]}
                                    </Paper>
                                    <Text hidden={!isLarge} className={s.text}>
                                        {content[page - 1].title ?? ''}
                                    </Text>
                                </Group>
                            </Group>
                        )}
                    />
                )}
                <Pagination.Next
                    className={s.next}
                    hidden={isLastPage}
                    icon={() => (
                        <Group align='center' wrap='nowrap'>
                            <Group wrap='nowrap'>
                                <Paper
                                    className={s.paper}
                                    p={isLarge ? 'lg' : 'xs'}
                                    py={isLarge ? 18.5 : 6}
                                    bg={`${color}.0`}
                                    c={`${color}.9`}
                                >
                                    {icons[titleNext]}
                                </Paper>
                                <Text hidden={!isLarge} className={s.text}>
                                    {content[page].title ?? ''}
                                </Text>
                            </Group>
                            <ArrowRight
                                color={`var(--mantine-color-${color}-9)`}
                                weight='bold'
                                size={isLarge ? 32 : 28}
                            />
                        </Group>
                    )}
                />
            </Group>
        </Pagination.Root>
    );
};
