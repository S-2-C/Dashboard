import React from 'react';
import styles from './chat.module.css'; // Importa el módulo CSS

interface StoryProps {
    img: string;
    username: string;
}

const Story: React.FC<StoryProps> = ({ img, username }) => {
    return (
        <div>
            <div className={`p-[1.5px] rounded-full ${styles.storyBorder}`}>
                <div className="bg-white rounded-full p-1">
                    <img className="h-14 w-14 rounded-full" src={img} alt={username} />
                </div>
            </div>
            <p className="text-xs w-16 truncate text-center">{username}</p>
        </div>
    )
}

export default Story;
