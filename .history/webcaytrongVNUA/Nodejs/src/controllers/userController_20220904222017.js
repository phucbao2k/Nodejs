let handleLogin = (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password){
        r
    }
return res.status(200).json({
    message: 'hello world',
    yourEmail: email,
})
}
module.exports ={
    handleLogin:handleLogin
}