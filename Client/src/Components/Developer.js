
export const Developer = ({ devData }) => {
    return (
        <>
            <div className="members">
                {/* Member Image */}
                <section className="memberImageContainer">
                    <img src={devData.image} alt={devData.name} loading="lazy" alt-text="images of developer" />
                </section>
                <strong className="memberName">{devData.name}</strong> <br />
                <strong className="memberOccupation">{devData.occupation}</strong>
                {/* Social Media Links */}
                <div className="memberContact">
                    <a href={devData.linkedIn} target="_blank">
                        <span className="fa-brands fa-linkedin faIcons" style={{ color: "dodgerblue" }}></span>
                    </a>
                    <a href={devData.gitHub} target="_blank">
                        <span className="fa-brands fa-github faIcons" style={{ color: "rgb(213, 213, 213)" }} />
                    </a>
                    <a href={devData.mail} alt="email id of developers">
                        <span className="fa fa-envelope faIcons" style={{ color: "red" }} />
                    </a>
                </div>
            </div>
        </>
    )
}