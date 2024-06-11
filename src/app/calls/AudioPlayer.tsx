import React, { useState, ChangeEvent } from 'react';

const AudioPlayer: React.FC = () => {
    const [audioSrc, setAudioSrc] = useState<string | null>(null);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'audio/wav') {
            setAudioSrc(URL.createObjectURL(file));
        } else {
            alert('Please upload a WAV file.');
        }
    };

    return (
        <div>
            <input type="file" accept="audio/wav" onChange={handleFileUpload} />
            {audioSrc && (
                <audio controls>
                    <source src={audioSrc} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default AudioPlayer;
