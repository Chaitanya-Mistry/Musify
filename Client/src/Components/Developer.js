import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

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
                    <a href={devData.linkedIn} target="_blank" rel='noreferrer'>
                        <span className="fa-brands fa-linkedin faIcons" style={{ color: "dodgerblue" }}></span>
                    </a>
                    <a href={devData.gitHub} target="_blank" rel='noreferrer' >
                        <span className="fa-brands fa-github faIcons" style={{ color: "rgb(213, 213, 213)" }} />
                    </a>
                    <a href={devData.mail} alt="email id of developers">
                        <span className="fa fa-envelope faIcons" style={{ color: "red" }} />
                    </a>
                </div>
            </div>
        </>
        // <Card sx={{ width: 230, height: 400}}>
        //     <CardActionArea>
        //         <CardMedia
        //             component="img"
        //             height="280"
        //             image={devData.image}
        //             alt={devData.title}
        //         />
        //         <CardContent>
        //             <Typography gutterBottom variant="h5" component="div" >
        //                 {devData.title}
        //             </Typography>
        //             <Typography variant="body2" color="text.secondary">
        //                 {devData.content}
        //             </Typography>
        //         </CardContent>
        //     </CardActionArea>
        // </Card>
    )
}