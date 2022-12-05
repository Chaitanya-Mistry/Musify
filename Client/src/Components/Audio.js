import { style } from "@mui/system";
import { useState } from "react";

export const Audio = ({ songData }) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    
    const playAndPauseSong = () => {
        const audioElem = document.getElementById('songAudio');
        
        if(!isAudioPlaying){
            audioElem.play();
            setIsAudioPlaying(true);
        }else{
            audioElem.pause();
            setIsAudioPlaying(false);
        }
    }
    return (
        <>
            {/* Demo Songs */}
            <div className="song">
                {/* Song Image */}
                <section className="songImageContainer">
                    <img src={songData.song_image} alt={songData.son_name} loading="lazy" onClick={playAndPauseSong} className={isAudioPlaying ? "playingAudio" : ""} />
                    {/* <audio src="" controls /> */}
                </section>
                <audio src={songData.song_file} id="songAudio" controls={isAudioPlaying ? true : false} hidden={isAudioPlaying ? false : true} ></audio>
                <strong className="songName">{songData.song_name}</strong>
            </div>
        </>
    )
}