import jwt from "jsonwebtoken";
export const authCheckMiddleware = (req, res, next) => {
  const {authorization} = req.headers;
  if(!authorization){
    console.error("Authorization header is missing");
    return res.status(401).json({message: "Unauthorized: No token provided"});
  }

  const token = authorization.split(" ")[1];
  if(!token){
    console.error("Token is missing in the Authorization header");
    return res.status(401).json({message:"Unauthorized Token format is invalid"});
  }
  jwt.verify(token, "ACE-BATTLE-EVENTS-NICKA-CC", (err, user) => {
    if(err){
      console.error("JWT Verification Error:", err);
      return res.status(403).json({message:"Forbidden: Invalid token"});
    }
    req.user = user;
    next();
  })
}