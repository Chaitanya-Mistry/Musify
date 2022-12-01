export const Song = ({ songData }) => {

    return (
        <div className="song">
            {/* Song Image */}
            <section className="songImageContainer">
                <img src={`http://localhost:4000/Song_Image/${songData.song_image}`} alt="" loading="lazy" />
            </section>

            <strong className="songName">Song: {songData.song_name}</strong>
            <strong className="artistName">Singer: {songData.sung_by.artist_name}</strong>
        </div>
    )
} 