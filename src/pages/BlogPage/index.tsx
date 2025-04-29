import { Grid, isNumberLike, Pagination } from '@mantine/core';
import { useList, useUnit } from 'effector-react';

import { PageLoader } from '@/shared/ui';

import { BlogModel, BlogPostCard, getBlogPostsQuery } from '@/entities/Blog';

import { PageLayout } from '@/widgets/PageLayout';

export const BlogPage = () => {
    const { data, pending } = useUnit(getBlogPostsQuery);
    const [page, onPageChange] = useUnit([BlogModel.$currentPage, BlogModel.pageChanged]);
    const totalPages = useUnit(BlogModel.$totalPages);
    const blogPosts = useList(BlogModel.$blogPosts, (post) => post.id && <BlogPostCard post={post} />);

    if (!data || pending) return <PageLoader />;

    return (
        <PageLayout title='Блог'>
            {!pending && <Grid>{blogPosts}</Grid>}
            <Pagination
                mt='sm'
                value={page}
                hideWithOnePage
                onChange={onPageChange}
                total={isNumberLike(totalPages) ? totalPages : 1}
            />
        </PageLayout>
    );
};
