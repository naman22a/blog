import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import { Category } from '../interfaces';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then(categories => setCategories(categories));
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Categories
            </h3>
            {categories.map(category => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className="cursor-pointer block pb-3 mb-3">
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default Categories;
