import React from 'react';

export interface TagListProps {
    tags: string[];
}

const TagList = ({ tags }: TagListProps) => {
    return (
        <ul>
            {tags.map((tag, index) => (
                <li key={index}>{tag}</li>
            ))}
        </ul>
    );
};

export default TagList;