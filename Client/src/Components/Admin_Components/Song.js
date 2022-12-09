export const Song = ({ songData }) => {

    return (
        <div className="song">
            {/* Song Image */}
            <section className="songImageContainer">
                <img src={songData.song_image} alt="" loading="lazy" />
            </section>

            <strong className="songName">Song: {songData.song_name}</strong>
            <strong className="artistName">Singer: {songData.sung_by.artist_name}</strong>
        </div>
    )
} 