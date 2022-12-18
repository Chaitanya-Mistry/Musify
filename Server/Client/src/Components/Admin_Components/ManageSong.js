import { DisplayArtists } from "./DisplayArtists";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserLoginContext } from "../App";

export const ManageSong = () => {
    const [selectedSong, setSelectedSong] = useState("");
    const [selectedSongType, setSelectedSongType] = useState("");
    const [selectedSongImage, setSelectedSongImage] = useState("");
    const [selectedSongImageType, setSelectedSongImageType] = useState("");
    const [sungBy, setSungBy] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [songDetails, setSongDetails] = useState("");
    const [showArtist, setShowArtist] = useState(false);
    const { serverEndPoint } = useContext(UserLoginContext);

    const navigate = useNavigate();

    // Base64 Encoder
    const encodeImageFileAsURL = (element, stateFileHolder, statefileTypeHolder) => {
        var reader = new FileReader();
        reader.onloadend = function () {
            stateFileHolder(reader.result);
            statefileTypeHolder(element.type);
        }
        reader.readAsDataURL(element);
    }

    // Song image selection event handler
    const songImageSelected = (event) => {
        encodeImageFileAsURL(event.target.files[0], setSelectedSongImage, setSelectedSongImageType);
    }
    // Song selection event handler
    const songSelected = (event) => {
        encodeImageFileAsURL(event.target.files[0], setSelectedSong, setSelectedSongType);
    }

    // Song genre on change event handler
    const handleGenre = event => setSelectedGenre(event.target.value);

    // Show Artist Selection
    const selectArtist = () => {
        setSungBy("");
        setShowArtist(true);
    };

    // Add Song Form Submit Event Handler
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Song name validation
        if (!event.target['songName'].value) {
            return alert("Please give a name to the song 😶");
        }
        // Song genre validation
        if (!event.target['genre'].value) {
            return alert("Please assign a genre to the song 😶");
        }

        if (selectedSong && selectedSongImage && sungBy) {
            const formData = new FormData();

            formData.append("sung_by", sungBy);
            formData.append("song_name", event.target['songName'].value);
            formData.append("genre", event.target['genre'].value);
            formData.append("song_file", selectedSong);
            formData.append("song_file_type", selectedSongType);
            formData.append("song_image", selectedSongImage);
            formData.append("song_image_type", selectedSongImageType);

            const baseUrl = `${serverEndPoint}/createSong`;
            let response;
            try {
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
                setShowArtist(false);
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
                {showArtist && !sungBy ? <DisplayArtists selectArtist={true} setArtist={setSungBy} /> : ""}
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

                            <input type="text" name="song_name" id="songName" placeholder="Song Name " required />
                            {/* Song Image */}
                            <label htmlFor="songImage" style={{ fontSize: "19px" }} id="songChooseImage">
                                Choose a song image 🖼️
                            </label>
                            <input type="file" name="song_image" id="songImage" accept="image/*" onChange={songImageSelected} required />

                            {/* Song File */}
                            <label htmlFor="song_file" style={{ fontSize: "19px" }} id="songChoose">
                                Choose a song 🎹
                            </label>
                            <input type="file" name="song_file" id="songFile" accept="audio/*" onChange={songSelected} required />

                            {/* Genre */}
                            <strong>Song Genre:</strong>
                            <div id="songGenre">
                                <input type="radio" id="Pop" name="genre" value="Pop" required defaultChecked />
                                <label htmlFor="Pop">Pop</label><br />
                                <input type="radio" id="hiphop" name="genre" value="HipHop" onChange={handleGenre} />
                                <label htmlFor="hiphop">Hip Hop</label><br />
                                <input type="radio" id="rock" name="genre" value="Rock" onChange={handleGenre} />
                                <label htmlFor="rock">Rock</label>
                                <input type="radio" id="Jazz" name="genre" value="Jazz" onChange={handleGenre} />
                                <label htmlFor="Jazz">Jazz</label>
                                <input type="radio" id="EDM" name="genre" value="EDM" onChange={handleGenre} />
                                <label htmlFor="EDM">EDM</label>

                            </div>
                            <p id="selectArtist" onClick={selectArtist}>Select Artist</p>

                            <button>Add</button>

                            <strong style={{ fontSize: "21px", textAlign: "center" }}>or</strong> <br />

                            <p id="displaySong" onClick={() => navigate("/displaySongs")}>Display Songs</p>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}