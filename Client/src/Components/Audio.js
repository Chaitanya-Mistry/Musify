import { style } from "@mui/system";
import { useState } from "react";

export const Audio = ({ songData, isPlayList }) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const playAndPauseSong = (event) => {
        const audioElem = event.target.parentElement.parentElement.querySelector("audio");

        if (!isAudioPlaying) {
            audioElem.play();
            setIsAudioPlaying(true);
        } else {
            audioElem.pause();
            setIsAudioPlaying(false);
        }
    }
    return (
        <>
            {/* Demo Songs */}
            <div className="song" onClick={playAndPauseSong}>
                {/* Song Image */}
                <section className="songImageContainer">
                    <img src={songData.song_image} alt={songData.son_name} loading="lazy" className={isAudioPlaying ? `playingAudio` : "notPlayingAudio"} />
                </section>
                <audio src={songData.song_file} controls={isAudioPlaying ? true : false} hidden={isAudioPlaying ? true : true} onTimeUpdate={(event) => {
                    // Keeping track of current timeStamp and total duration of current song 🔥
                    if (Math.floor(event.target.currentTime) === Math.floor(event.target.duration)) {
                        setIsAudioPlaying(false);
                    }
                }
                } crossOrigin="anonymous"></audio>
                {isPlayList ? "" : <strong className="songName">{songData.song_name}</strong>}

            </div>
        </>
    )
}