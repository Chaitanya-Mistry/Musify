import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const Artist = ({artistData}) => {
    const navigate = useNavigate();
    // To delete artist
    // const deleteArtist = async (event) => {
    //     const confirmation = window.confirm('Do you really want to delete this ? 🧐');
    //     if (confirmation) {
    //         const currentBlogId = event.target.dataset.blogid;
    //         const baseURL = `https://blogyfest-chaitanya.herokuapp.com/api/deleteBlog/${currentBlogId}`;
    //         let response;
    //         // Send delete request to our API
    //         try {
    //             response = await axios.delete(baseURL, { withCredentials: true });
    //         } catch (err) {
    //             response = err.response;
    //         }

    //         if (response.status === 200) {
    //             alert('Blog deleted successfully ✔️');
    //             myBlogFetch();
    //         } else {
    //             alert(response);
    //         }
    //     }
    // }

    return (
        <div className="artist">
            {/* Artist Image */}
            <section className="artistImageContainer">
                <img src={`http://localhost:4000/Artist_Image/${artistData.artist_image}`} alt="" loading="lazy" />
            </section>

            <strong className="artistName">{artistData.artist_name}</strong>
        </div> 
    )
} 