import Category from './Category';

interface PostDetails {
    title: string;
    excerpt: string;
    featuredImage: {
        url: string;
    };
    author: {
        name: string;
        bio: string;
        photo: {
            url: string;
        };
    };
    createdAt: string;
    slug: string;
    content: {
        raw: {
            children: {
                type: string;
                children: {
                    text: string;
                }[];
            }[];
        };
    };
    categories: Category[];
}

export default PostDetails;
