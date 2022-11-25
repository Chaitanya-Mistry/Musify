import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const ManageSong = () => {
    const navigate = useNavigate();
    const [selectedSong, setSelectedSong] = useState("");
    const [selectedSongImage, setSelectedSongImage] = useState("");
    const [sungBy, setSungBy] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const location = useLocation();

    useEffect(() => {
        // if artist selected ...
        if (location.state) {
            setSungBy(location.state);
        }
    }, []);

    const showSongs = () => navigate("/displaySongs");

    const songSelected = (event) => {
        setSelectedSong(event.target.files[0]);  // Get and store selected song   
    }
    const songImageSelected = (event) => {
        setSelectedSongImage(event.target.files[0]);  // Get and store song image 
    }

    // Select Artist
    const selectArtist = () => {
        navigate("/displayArtists", { state: "selectArtist" });
    }
    // Add Song Form Submit Event Handler 
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedSong && selectedSongImage && sungBy) {
            const baseUrl = `http://localhost:4000/createSong`;
            let response;
            // To be continued ...❤️‍🔥
            try {
                const formData = new FormData();
                formData.append('song_name', event.target['songName'].value);
                formData.append('song_file', selectedSong);
                formData.append('song_image', selectedSongImage);
                formData.append('sung_by', sungBy);
                formData.append('genre', event.target['song_genre'].value);

                response = await axios({
                    url: baseUrl,
                    method: "POST",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                });
            } catch (err) {
                alert("Error: ", err);
            }

            // IF song created
            if (response.data.serverResponse.responseCode === 201) {
                alert('Song has been added 😀');
                // Clear form entries
                document.getElementById("addSongForm").reset();
                // Reset state 
                setSelectedSong("");
                setSelectedSongImage("");
                setSungBy("");
            } else {
                alert(`ERROR : ${response.data.serverResponse.message}`);
            }
        } else {
            if (!selectedSong) {
                alert("Please select a song 😶");
            }
            else if (!selectedSongImage) {
                alert("Please select an image for a song 😶");
            }
            else if (!sungBy) {
                alert("Please select an artist for a song 😶");
            }
        }
    }

    return (
        <>
            <main>
                <div id="addSongMainContainer">

                    <div id="addSongIllustration">
                        {/* <a href="https://www.freepik.com/free-vector/happy-girl-wearing-headphones-enjoying-playlist-listening-music-mobile-phone-singing-songs_12291063.htm#page=2&query=music&position=47&from_view=search&track=sph">Image by pch.vector</a> on Freepik */}
                        {/* Image provided by www.freepik.com */}
                        <img src="https://img.freepik.com/free-vector/happy-girl-wearing-headphones-enjoying-playlist-listening-music-mobile-phone-singing-songs_74855-14053.jpg?w=1060&t=st=1669333189~exp=1669333789~hmac=b6d9bd81116f763d40a01de71b05ba4d02873bd330598f5052f5e53720fa3723" alt="add song illustration" />
                    </div>
                    {/* Song details */}
                    <div id="songDetails">
                        <h2 id="addSongTitle">Add Song 🎵</h2>

                        <form id="addSongForm" onSubmit={handleSubmit} encType="multipart/form-data">

                            <input type="text" name="songName" id="songName" placeholder="Song Name " required />
                            {/* Song Image */}
                            <label htmlFor="songImage" style={{ fontSize: "19px" }} id="songChooseImage">
                                Choose a song image 🖼️
                            </label>
                            <input type="file" name="songImage" id="songImage" accept="image/*" required onChange={songImageSelected} />

                            {/* Song File */}
                            <label htmlFor="songFile" style={{ fontSize: "19px" }} id="songChoose">
                                Choose a song 🎹
                            </label>
                            <input type="file" name="songFile" id="songFile" accept="audio/*" required onChange={songSelected} />

                            {/* Genre */}
                            <strong>Song Genre:</strong>
                            <div id="songGenre">
                                <input type="radio" id="classical" name="song_genre" value="Classical" required />
                                <label htmlFor="classical">Classical</label><br />
                                <input type="radio" id="hiphop" name="song_genre" value="HipHop" />
                                <label htmlFor="hiphop">HipHop</label><br />
                                <input type="radio" id="rock" name="song_genre" value="Rock" />
                                <label htmlFor="rock">Rock</label>
                                <input type="radio" id="instrumental" name="song_genre" value="Instrumental" />
                                <label htmlFor="instrumental">Instrumental</label>
                                <input type="radio" id="romance" name="song_genre" value="Romance" />
                                <label htmlFor="romance">Romance</label>

                                <input type="radio" id="party" name="song_genre" value="Party" />
                                <label htmlFor="party">Party</label>

                            </div>
                            <p id="selectArtist" onClick={selectArtist}>Select Artist</p>

                            <button>Add</button>

                            <strong style={{ fontSize: "21px", textAlign: "center" }}>or</strong> <br />

                            <p id="displaySong" onClick={showSongs}>Display Songs</p>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}