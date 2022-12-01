import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const EditArtist = () => {
    const { state: artistID } = useLocation(); // To access the current state of '/editArtist'
    const [currentArtist, setCurrentArtist] = useState([]); // To store current artist's detail
    const [artistImage, setArtistImage] = useState(''); // To store selected artist image
    const navigate = useNavigate(); // To navigate to a different route

    const handleSubmit = (event) => {

    }

    const imageSelected = (event) => {
        
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

        if (response.status === 200) {
            setCurrentArtist(response.data.foundBlog);
        }
        else {
            alert('Something went wrong, Try again later');
        }
    }

    return (
        <>
            <main>
                <div id="editArtistMainContainer">
                    {/* Artist image  */}
                    <div id="updateArtistImage">
                        <img src={`http://localhost:4000/Artist_Image/${currentArtist.image}`} />
                    </div>

                    {/* Artist details */}
                    <div id="artistDetails">
                        <div id="editArtistTitleContainer">
                            <h2 id="editArtistTitle">Edit Artist 🧑‍🎤</h2>
                        </div>

                        <form id="addArtistForm" onSubmit={handleSubmit} encType="multipart/form-data">

                            <input type="text" name="artistName" id="artistName" placeholder="Artist Name " required />
                            <label htmlFor="artistImage" style={{ fontSize: "19px" }} id="artitstChooseImage">
                                Choose an image 🖼️
                            </label>
                            <input type="file" name="artistImage" id="artistImage" accept="image/*" required onChange={imageSelected} />
                            <button>Update</button>

                            <strong style={{ fontSize: "21px", textAlign: "center" }}>or</strong> <br />

                            <p id="displayArtist" onClick={()=>navigate("/displayArtists")}>Display Artists</p>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}