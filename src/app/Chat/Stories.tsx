import React, { useRef } from 'react';
import stories from './StoriesDummy.json';
import Story from './Story';
import { useEffect, useState } from 'react';
import { fetchListUsers } from '../../fetching/fetchingListAgent';

interface Story {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

const Stories: React.FC = () => {
    const [agents, setAgents] = useState<any[]>([]);

    const storiesRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        // No need to update button visibility anymore
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchListUsers();
            setAgents(response.data);
        };

        fetchData();
    }, []);

    // Set agent username to stories array
    for (let i = 0; i < agents.length; i++) {
        if (!stories[i]) {
            continue;
        }
        stories[i].first_name = agents[i].Username;
        stories[i].id = agents[i].Id;
    }



    return (
        <div className='relative w-full'>
            <div
                onScroll={onScroll}
                ref={storiesRef}
                className="flex space-x-2 overflow-x-scroll scroll-smooth scrollbar-hide rounded-full"
                style={{
                    backgroundColor: '#ECECEC',
                    padding: '12px 20px 12px 20px',
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
                            username={story.first_name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stories;
