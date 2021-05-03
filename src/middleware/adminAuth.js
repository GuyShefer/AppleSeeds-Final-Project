
const adminAuth = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.userType !== 'admin') {
            throw new Error('');
        }
        next();
    } catch (err) {
        res.status(403).send({ error: 'Access blocked' });
    }
    
}

module.exports = adminAuth;