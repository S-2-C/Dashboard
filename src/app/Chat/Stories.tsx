import React, { useRef } from 'react';
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
    const storiesRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        // No need to update button visibility anymore
    };

    return (
        <div className='relative w-full'>
            <div 
                onScroll={onScroll} 
                ref={storiesRef} 
                className="flex space-x-2 overflow-x-scroll scroll-smooth scrollbar-hide rounded-full"
                style={{ 
                    backgroundColor: '#ECECEC', 
                    padding: '10px 20px 10px 20px', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra en el borde inferior
                    maxWidth: '100%',
                    overflowY: 'hidden' // Bloquea el desplazamiento vertical
                }}
            >
                {stories.map((story: Story) => (
                    <div 
                        key={story.id} 
                        className="transition-transform transform hover:scale-105 hover:translate-y-2"
                    >
                        <Story 
                            img={story.avatar}
                            username={story.first_name + " " + story.last_name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stories;
