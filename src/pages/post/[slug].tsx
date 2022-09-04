import React from 'react';
import { getPostDetails, getPosts } from '../../services';
import {
    PostDetail,
    Categories,
    PostWidget,
    Author,
    Comments,
    CommnetsForm,
    Loader
} from '../../components';
import { useRouter } from 'next/router';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post, PostDetails } from '../../interfaces';

const PostDetails = ({
    post
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const slug = router.query.slug as string;

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="colspan-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommnetsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className="colspan-1 lg:col-span-4">
                    <div className="relative top-8 lg:sticky">
                        <PostWidget
                            slug={slug}
                            categories={post.categories.map(
                                category => category.slug
                            )}
                        />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;

interface Props {
    post: PostDetails;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const post = await getPostDetails((params as any).slug as string);
    return {
        props: {
            post
        }
    };
};

export const getStaticPaths = async () => {
    const posts: Post[] = await getPosts();

    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true
    };
};
