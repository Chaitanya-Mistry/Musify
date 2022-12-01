import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const EditArtist = () => {
    const { state: artistID } = useLocation(); // To access the current state of '/editArtist'
    const [currentArtist, setCurrentArtist] = useState([]); // To store current artist's detail
    const [artistImage, setArtistImage] = useState(''); // To store selected artist image
    const navigate = useNavigate(); // To navigate to a different route

    // When admin finally submits the form
    const handleSubmit = async (event) => {
        event.preventDefault();
        const baseURL = `http://localhost:4000/updateArtist/${artistID}`;

        let response;
        try {
            const formData = new FormData();
            formData.append('artist_name', event.target['artistName'].value);
            // If admin also wants to update
            if (artistImage) {
                formData.append('artist_image', artistImage);
            }
            response = await axios({
                url: baseURL,
                method: "PATCH",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
        } catch (err) {
            alert("Error: ", err);
        }

        if (response.data.serverResponse.responseCode === 200) {
            alert('Artist Details Updated Successfully ✔️');
            navigate('/displayArtists');
        } else {
            alert(`Error: ` + response.data.serverResponse.message);
        }
    }

    // Artist image selection 
    const imageSelectionHandler = (event) => {
        if (event.target.files[0]) {
            setArtistImage(event.target.files[0]);
        } else {
            setArtistImage('');
        }
    }

    // Get Artist Details By ID 
    const fetchArtist = async () => {
        let response;
        const baseURL = `http://localhost:4000/getArtist/${artistID}`;

        try {
            response = await axios({
                url: baseURL,
                method: "GET",
                withCredentials: true,
            });
        } catch (err) {
            alert(err);
        }

        if (response.data.serverResponse.responseCode === 200) {
            setCurrentArtist(response.data.serverResponse.responseData);
        }
        else {
            alert('Something went wrong, Try again later');
        }
    }

    useEffect(() => {
        fetchArtist();
    }, []);

    return (
        <>
            <main>
                <div id="editArtistMainContainer">
                    {/* Artist image  */}
                    <div id="artistImage">
                        <img src={`http://localhost:4000/Artist_Image/${currentArtist.artist_image}`} />
                    </div>

                    {/* Artist details */}
                    <div id="artistDetails">
                        <div id="editArtistTitleContainer">
                            <h2 id="editArtistTitle">Edit Artist 🧑‍🎤</h2>
                        </div>

                        <form id="editArtistForm" onSubmit={handleSubmit} encType="multipart/form-data">

                            <input type="text" name="artistName" id="artistName" placeholder="Artist Name " required defaultValue={currentArtist.artist_name} />
                            <label htmlFor="artistImage" style={{ fontSize: "19px" }} id="artitstChooseImage">
                                Choose an image 🖼️
                            </label>
                            <input type="file" name="artistImage" id="artistImage" accept="image/*" onChange={imageSelectionHandler} />
                            <button>Update</button>

                            <strong style={{ fontSize: "21px", textAlign: "center" }}>or</strong> <br />

                            <p id="displayArtist" onClick={() => navigate("/displayArtists")}>Display Artists</p>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}