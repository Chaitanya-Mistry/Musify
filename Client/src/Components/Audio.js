import { style } from "@mui/system";
import { useState } from "react";

export const Audio = ({ songData }) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    // const audioElem = document.createElement("audio");
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
                    <img src={songData.song_image} alt={songData.son_name} loading="lazy" className={isAudioPlaying ? `playingAudio` : ""} />
                </section>
                <audio src={songData.song_file} controls={isAudioPlaying ? true : false} hidden={isAudioPlaying ? true : true} crossOrigin="anonymous"></audio>
                <strong className="songName">{songData.song_name}</strong>
            </div>
        </>
    )
}