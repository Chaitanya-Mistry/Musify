// Logout
export const logout = (req,res) => {
    res.clearCookie('jwtoken');
    res.clearCookie('jwtokenn');
    res.status(200).json({ message: `${req.rootUser.name} successfully logout ...` });
}