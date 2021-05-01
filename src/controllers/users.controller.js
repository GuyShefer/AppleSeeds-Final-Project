


const addUser = (req,res) => {
    const extractUser = { email, password, firstName, lastName, address} = req.body;
    console.log(req.body);

    res.status(200).send(req.body);
}



module.exports = {
    addUser,  
}