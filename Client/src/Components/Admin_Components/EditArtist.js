import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const EditArtist = () => {
    const { state: artistID } = useLocation(); // To access the current state of '/editArtist'
    const [currentArtist, setCurrentArtist] = useState([]); // To store current artist's detail
    const [artistImage, setArtistImage] = useState(''); // To store selected artist image
    const [artistImageType, setArtistImageType] = useState(''); // To store selected artist image
    const [dataLoaded, setDataLoaded] = useState(false);
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
                formData.append('artist_image_type', artistImageType);
            }

            response = await axios({
                url: baseURL,
                method: "PATCH",
                data: formData,
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

    // Artist image selection & Base64 Conversion
    const encodeImageFileAsURL = (element) => {
        var file = element.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            // console.log('RESULT', reader.result)
            setArtistImageType(file.type);
            setArtistImage(reader.result);
        }
        reader.readAsDataURL(file);
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
            setDataLoaded(true);
        }
        else {
            alert(response.data.serverResponse.message);
            setCurrentArtist("");
            setDataLoaded(false);
        }
    }

    useEffect(() => {
        fetchArtist();
    }, []);


    if (dataLoaded) {
        return (
            <>
                <main>
                    <div id="editArtistMainContainer">
                        {/* Artist image  */}
                        <div id="artistImage">
                            <img src={currentArtist.artist_image} />
                        </div>

                        {/* Artist details */}
                        <div id="artistDetails">
                            <div id="editArtistTitleContainer">
                                <h2 id="editArtistTitle">Edit Artist 🧑‍🎤</h2>
                            </div>

                            <form id="editArtistForm" onSubmit={handleSubmit}>

                                <input type="text" name="artistName" id="artistName" placeholder="Artist Name " required defaultValue={currentArtist.artist_name} />
                                <label htmlFor="artistImage" style={{ fontSize: "19px" }} id="artitstChooseImage">
                                    Choose an image 🖼️
                                </label>
                                <input type="file" name="artistImage" id="artistImage" accept="image/*" onChange={encodeImageFileAsURL} />
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

}