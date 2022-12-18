import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserLoginContext from "../../App";


export const Artist = ({ artistData, fetchArtist }) => {
    const navigate = useNavigate();
    const { serverEndPoint } = useContext(UserLoginContext);

    // To delete artist
    const deleteArtist = async (event) => {
        // Get Confirmation from admin 
        const confirmation = window.confirm('Do you really want to delete this ? 🧐');

        if (confirmation) {
            const currentArtistId = event.target.dataset.artist_id;
            const baseURL = `${serverEndPoint}/deleteArtist/${currentArtistId}`;
            let response;
            // Send delete request to our API
            try {
                response = await axios.delete(baseURL, { withCredentials: true });
            } catch (err) {
                alert(err);
            }

            if (response.data.serverResponse.responseCode === 200) {
                alert('Artist deleted successfully ✔️');
                fetchArtist();
            } else {
                alert(response.data.serverResponse.message);
            }
        }
    }

    return (
        <div className="artist">
            {/* Artist Image */}
            <section className="artistImageContainer">
                {/* <img src={`http://localhost:4000/Artist_Image/${artistData.artist_image}`} alt="" loading="lazy" /> */}
                <img src={artistData.artist_image} alt={artistData.artist_name} loading="lazy" />
            </section>
            {/* Additional Operations */}
            <p className="artistOperations">
                {/* Edit artist  ✍️ */}
                <span onClick={() => navigate("/editArtist", { state: artistData._id })}>✍️</span>
                {/* Delete artist ❎ */}
                <span onClick={deleteArtist} data-artist_id={artistData._id}>🗑️</span>
            </p>
            <strong className="artistName">{artistData.artist_name}</strong>
        </div>
    )
} 