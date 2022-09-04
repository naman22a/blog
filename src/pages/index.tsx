import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Categories, PostCard, PostWidget } from '../components';
import { FeaturedPost } from '../sections';
import { Post } from '../interfaces';
import { getPosts } from '../services';

const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>Graph CMS Blog</title>
            </Head>
            <FeaturedPost />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts?.map(post => (
                        <PostCard key={post.node.slug} post={post.node} />
                    ))}
                </div>
                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface Props {
    posts: Post[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const posts = (await getPosts()) || [];
    return {
        props: {
            posts
        }
    };
};

export default Index;
