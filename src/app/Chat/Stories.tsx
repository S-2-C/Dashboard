import React, { useRef, useState } from 'react';
import stories from './StoriesDummy.json';
import Story from './Story';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

interface Story {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

const Stories: React.FC = () => {
    const storiesRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const onScroll = () => {
        if (storiesRef.current && storiesRef.current.scrollLeft > 0) {
            setShowLeft(true);
        } else {
            setShowLeft(false);
        }
        if (storiesRef.current && storiesRef.current.scrollLeft > storiesRef.current.scrollWidth - storiesRef.current.clientWidth - 5) {
            setShowRight(false);
        } else {
            setShowRight(true);
        }
    };

    return (
        <div className='relative w-full'>
            <div 
                onScroll={onScroll} 
                ref={storiesRef} 
                className="flex space-x-2 overflow-x-scroll bg-white scroll-smooth scrollbar-hide rounded-full"
                style={{ 
                    backgroundColor: '#e2f0f9', 
                    padding: '10px 25px 5px 25px', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra en el borde inferior
                    maxWidth: '45vw'
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
            <div className='absolute top-0 p-4 w-full h-full flex justify-between z-10 items-center'>
                <button onClick={() => { if (storiesRef.current) storiesRef.current.scrollLeft = storiesRef.current.scrollLeft - 300 }}>
                    <FontAwesomeIcon size="lg" icon={faChevronCircleLeft} color="white" className={`cursor-pointer filter drop-shadow-lg ${showLeft ? 'visible' : 'hidden'}`} />
                </button>
                <button onClick={() => { if (storiesRef.current) storiesRef.current.scrollLeft = storiesRef.current.scrollLeft + 300 }}>
                    <FontAwesomeIcon size="lg" icon={faChevronCircleRight} color="white" className={`cursor-pointer filter drop-shadow-lg ${showRight ? 'visible' : 'hidden'}`} />
                </button>
            </div>
        </div>
    );
};

export default Stories;
 