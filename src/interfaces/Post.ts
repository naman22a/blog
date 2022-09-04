import Category from './Category';

interface Post {
    node: {
        author: {
            bio: string;
            name: string;
            id: string;
            photo: {
                url: string;
            };
        };
        createdAt: string;
        slug: string;
        title: string;
        excerpt: string;
        featuredImage: {
            url: string;
        };
        categories: Category[];
    };
}

export default Post;
