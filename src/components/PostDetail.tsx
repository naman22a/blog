import React, { useEffect } from 'react';
import { PostDetails } from '../interfaces';
import dayjs from 'dayjs';
import DateIconSvg from './DateIconSvg';
import Image from 'next/image';

interface Props {
    post: PostDetails;
}

const PostDetail: React.FC<Props> = ({ post }) => {
    useEffect(() => {
        document.title = `${post.title} | Graph CMS Blog`;
    }, [post.title]);

    const getContentFragment = (
        index: number,
        text: any,
        obj: any,
        type: string
    ) => {
        let modifiedText = text;

        if (obj) {
            if (obj.bold) {
                modifiedText = <b key={index}>{text}</b>;
            }

            if (obj.italic) {
                modifiedText = <em key={index}>{text}</em>;
            }

            if (obj.underline) {
                modifiedText = <u key={index}>{text}</u>;
            }
        }

        switch (type) {
            case 'heading-three':
                return (
                    <h3 key={index} className="text-xl font-semibold mb-4">
                        {modifiedText.map((item: any, i: number) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h3>
                );
            case 'paragraph':
                return (
                    <p key={index} className="mb-8">
                        {modifiedText.map((item: any, i: number) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </p>
                );
            case 'heading-four':
                return (
                    <h4 key={index} className="text-md font-semibold mb-4">
                        {modifiedText.map((item: any, i: number) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h4>
                );
            case 'image':
                return (
                    <Image
                        unoptimized
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                    />
                );
            default:
                return modifiedText;
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md mb-6">
                <Image
                    unoptimized
                    src={post.featuredImage.url}
                    alt={post.title}
                    className="object-top h-full w-full rounded-t-lg"
                />
            </div>
            <div className="px-4 lg:p-0">
                <div className="flex items-center mb-8 w-full">
                    <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                        <Image
                            unoptimized
                            src={post.author.photo.url}
                            alt={post.author.name}
                            height="30px"
                            width="30px"
                            className="align-middle rounded-full"
                        />
                        <p className="inline align-middle text-gray-700 ml-2 text-lg">
                            {post.author.name}
                        </p>
                    </div>
                    <div className="font-medium text-gray-700">
                        <DateIconSvg />
                        <span>
                            {dayjs(post.createdAt).format('MMM DD, YYYY')}
                        </span>
                    </div>
                </div>

                <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
                {post.content.raw.children.map((obj, index) => {
                    const children = obj.children.map((item, itemIndex) =>
                        getContentFragment(itemIndex, item.text, item, '')
                    );

                    return getContentFragment(index, children, obj, obj.type);
                })}
            </div>
        </div>
    );
};

export default PostDetail;
