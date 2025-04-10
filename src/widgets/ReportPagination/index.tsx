import { Container, Flex, Group, Pagination, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { useStoreMap, useUnit } from 'effector-react';

import { TYPE_TO_COLOR_MAP, useIsLarge } from '@/shared/lib';

import { getFullReportQuery, getIconsMap, ReportModel } from '@/entities/Report';

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
    const titlePrev = content[page - 2]?.title;
    const titleNext = content[page]?.title;
    const color = TYPE_TO_COLOR_MAP[content[page]?.mbti] ?? TYPE_TO_COLOR_MAP[content[0]?.mbti];
    const [_, scrollTo] = useWindowScroll();

    return (
        <Pagination.Root
            className={s.root}
            value={page}
            onChange={(page) => {
                onChangePage(page);
                setTimeout(
                    () =>
                        scrollTo({
                            x: 0,
                            y: 0,
                        }),
                    0
                );
            }}
            total={content.length}
        >
            <Container>
                <Group className={s.grid}>
                    {!isFirstPage && (
                        <Pagination.Previous
                            className={s.prev}
                            icon={() => (
                                <Group className={s.controlWrapper} align='center' wrap='nowrap'>
                                    <ArrowLeft color={`var(--mantine-color-${color}-9)`} weight='bold' size={24} />
                                    <Group wrap='nowrap'>
                                        <Flex
                                            align='center'
                                            justify='center'
                                            className={s.paper}
                                            p={isLarge ? 'sm' : 'xs'}
                                            bg={`${color}.0`}
                                            c={`${color}.9`}
                                        >
                                            {icons[titlePrev]}
                                        </Flex>
                                        <Text hidden={!isLarge} className={s.text}>
                                            {content[page - 2].title ?? ''}
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
                            <Group align='center' wrap='nowrap' className={s.controlWrapper} data-last>
                                <Group className={s.nextGroup} wrap='nowrap'>
                                    <Flex
                                        data-last
                                        align='center'
                                        justify='center'
                                        className={s.paper}
                                        p={isLarge ? 'sm' : 'xs'}
                                        bg={`${color}.0`}
                                        c={`${color}.9`}
                                    >
                                        {icons[titleNext]}
                                    </Flex>
                                    <Text hidden={!isLarge} className={s.text}>
                                        {content[page]?.title ?? ''}
                                    </Text>
                                </Group>
                                <ArrowRight color={`var(--mantine-color-${color}-9)`} weight='bold' size={24} />
                            </Group>
                        )}
                    />
                </Group>
            </Container>
        </Pagination.Root>
    );
};
