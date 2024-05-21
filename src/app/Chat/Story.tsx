import React from 'react';

interface StoryProps {
    img: string;
    username: string;
}

const Story: React.FC<StoryProps> = ({ img, username }) => {
    return (
        <div>
            <div className="p-[1.5px] rounded-full" style={{ background: 'linear-gradient(to top right, #057dc7, #e2f0f9)' }}>
                <div className="bg-white rounded-full p-1">
                    <img className="h-14 w-14 rounded-full" src={img} alt={username} />
                </div>
            </div>
            <p className="text-xs w-16 truncate text-center">{username}</p>
        </div>
    )
}

export default Story;
