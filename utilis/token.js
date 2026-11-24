import jwt from 'jsonwebtoken';

let token=(user,time)=>{
  return  jwt.sign(
    {
        id:user._id,
        email:user.email,
        role: user.role,
    },
    process.env.JWT_TOKEN,
    { expiresIn: time }
  )
}

export default token;