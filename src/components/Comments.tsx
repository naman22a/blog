import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { getComments } from '../services';
import { Comment } from '../interfaces';

interface Props {
    slug: string;
}

const Comments: React.FC<Props> = ({ slug }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        getComments(slug).then(data => setComments(data));
    }, []);

    return (
        <>
            {comments.length !== 0 ? (
                <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                    <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                        {comments.length}{' '}
                        {` ${comments.length === 1 ? 'Comment' : 'Comments'}`}
                    </h3>
                    {comments.map(comment => (
                        <div
                            key={comment.createdAt}
                            className="border-b border-gray-100 mb-4 pb-4"
                        >
                            <p className="mb-4">
                                <span className="font-semibold">
                                    {comment.name}
                                </span>
                                {` on ${dayjs(comment.createdAt).format(
                                    'MMM DD, YYYY'
                                )}`}
                            </p>
                            <p className="whitespace-pre-line text-gray-600 w-full">
                                {parse(comment.comment)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                    <h3 className="text-xl font-semibold">No Comments yet</h3>
                </div>
            )}
        </>
    );
};

export default Comments;
