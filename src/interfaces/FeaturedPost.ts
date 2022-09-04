interface FeaturedPost {
    author: {
        name: string;
        photo: {
            url: string;
        };
    };
    featuredImage: {
        url: string;
    };
    title: string;
    slug: string;
    createdAt: string;
}

export default FeaturedPost;
