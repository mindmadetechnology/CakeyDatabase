const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const Authorization = (req, res, next) => {
        const token = req.headers['authorization'];

        if(!token){
            // return res.status(404).send( `
            // <div>
            // <h1>404 Not Found :( </h1>
            // <h3>Sorry, an error has occured, Requested page not found!</h3>
            //   <p>HTTP ERROR 404</p>
            //   <button>reload</button>
            //   </div>
            // `);
            return res.status(404).sendFile(path.join(__dirname + '/notfound.html'));
        }else{
            //Bearer jgjsdsd.....
            // const tokenBody = token.slice(7);
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    return res.status(404).sendFile(path.join(__dirname + '/notfound.html'));
                }else{
                    next();
                }
            })
            
        }
}

module.exports = Authorization;