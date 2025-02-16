import { Grid } from '@mantine/core';
import { useList } from 'effector-react';

import { BlogPostCard, getBlogPostsQuery } from '@/entities/Blog';
import { PageLayout } from '@/widgets/PageLayout';

export const BlogPage = () => {
    const blogPosts = useList(
        getBlogPostsQuery.$data.map((el) => el.payload),
        (post) => post.id && <BlogPostCard post={post} />
    );

    return (
        <PageLayout title='Блог'>
            <Grid>{blogPosts}</Grid>
        </PageLayout>
    );
};
