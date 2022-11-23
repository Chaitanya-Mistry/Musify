import { useNavigate } from "react-router-dom"

export const ManageArtist = () => {
    const navigate = useNavigate();

    function showArtists() {
        navigate("/displayArtists");
    }
    return (
        <>
            <main>
                <div id="addArtistMainContainer">
                    {/* For login illustration */}
                    <div id="addArtistIllustration">
                        {/* <a href="https://www.freepik.com/free-vector/add-files-concept-illustration_5573510.htm#query=add&position=0&from_view=keyword">Image by storyset</a> on Freepik */}
                        {/* Image provided by www.freepik.com */}
                        <img src="https://img.freepik.com/free-vector/add-files-concept-illustration_114360-481.jpg?w=1060&t=st=1669225936~exp=1669226536~hmac=7ea43078f3d7068736b350b23b08e1fab49221f6d39388811dcf787c7bd160c9" alt="add illustration" />
                    </div>
                    {/* To artist details */}
                    <div id="artistDetails">
                        <h2 id="addArtistTitle">Add Artist 🧑‍🎤</h2>
                        <form id="addArtistForm">

                            <input type="text" name="artistName" id="artistName" placeholder="Artist Name " required />
                            <label htmlFor="artistImage" style={{ fontSize: "19px" }}>
                                Choose an image 🖼️
                            </label>
                            <input type="file" name="artistImage" id="artistImage" accept="image/*" required />
                            <button>Add</button>

                            <strong style={{ fontSize: "21px", textAlign: "center" }}>or</strong> <br />

                            <p id="displayArtist" onClick={showArtists}>Display Artists</p>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}