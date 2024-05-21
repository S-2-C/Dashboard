import React from 'react';
import stories from './StoriesDummy.json';
import Story from './Story';

interface Story {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

const Stories: React.FC = () => {
    return (
        <div className="flex space-x-2 overflow-x-scroll max-w-xl bg-white border-gray-200 p-4 scroll-smooth scrollbar-hide">
            {stories.map((story: Story) => (
                <Story 
                    key={story.id}
                    img={story.avatar}
                    username={story.first_name + " " + story.last_name}
                />
            ))}
        </div>
    );
};

export default Stories;
