import React from 'react';
import styles from './chat.module.css'; // Importa el módulo CSS
import { maxHeaderSize } from 'http';

interface StoryProps {
    img: string;
    username: string;
}

const Story: React.FC<StoryProps> = ({ img, username }) => {
    return (
        <div className={styles.storyContainer} style={{maxHeight:'82px'}}>
            <div className={`p-[1.5px] rounded-full ${styles.storyBorder}`}>
                <div className="bg-white rounded-full p-1">
                    <img className="h-14 w-14 rounded-full" src={img} alt={username} />
                </div>
            </div>
            <p className={`w-16 truncate text-center ${styles.storyFontSize}`}>{username}</p>
        </div>
    )
}

export default Story;
