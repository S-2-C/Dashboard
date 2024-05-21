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
        if (storiesRef.current && storiesRef.current.scrollLeft === storiesRef.current.scrollWidth - storiesRef.current.clientWidth) {
            setShowRight(false);
        } else {
            setShowRight(true);
        }
    };

    return (
        <div className='relative w-max'>
            <div 
                onScroll={onScroll} 
                ref={storiesRef} 
                className="flex space-x-2 overflow-x-scroll bg-white p-2 scroll-smooth scrollbar-hide rounded-full"
                style={{ border: '3px solid #057dc7', backgroundColor: '#e2f0f9', maxWidth: '48rem' }} // 48rem is slightly larger than max-w-lg (32rem)
            >
                {stories.map((story: Story) => (
                    <Story 
                        key={story.id}
                        img={story.avatar}
                        username={story.first_name + " " + story.last_name}
                    />
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
