import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { RecentPost } from '../interfaces';
import { getRecentPosts, getSimilarPosts } from '../services';
import Image from 'next/image';

interface Props {
    categories?: string[] | null;
    slug?: string;
}

const PostWidget: React.FC<Props> = ({ categories = null, slug = '' }) => {
    const [relatedPosts, setRelatedPosts] = useState<RecentPost[]>([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts(slug, categories!).then(result =>
                setRelatedPosts(result)
            );
        } else {
            getRecentPosts().then(results => setRelatedPosts(results));
        }
    }, [slug, categories]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map(post => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <Image
                            unoptimized
                            src={post.featuredImage.url}
                            alt={post.title}
                            height="60px"
                            width="60px"
                            className="align-middle rounded-full"
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p
                            className="text-gray-500 text-xs
                        "
                        >
                            {dayjs(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`} className="text-base">
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;
