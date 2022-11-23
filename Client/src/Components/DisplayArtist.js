export const DisplayArtist = () => {
    return (
        <>
            <main>
                <div className="mainArtistContainer">
                    {/* List of artists */}
                    <div className="artistListMainContainer">
                        <h3 style={{ marginBottom: "10px" }}>List of artists</h3>
                        <div className="artistListContainer">
                            <div className="artist">A1</div>
                            <div className="artist">A2</div>
                            <div className="artist">A3</div>
                            <div className="artist">A4</div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}