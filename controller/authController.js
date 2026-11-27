import User from "../model/User.js";
import emailSender from "../utilis/Email.js";
import _token from '../utilis/token.js'
import jwt from 'jsonwebtoken';



export const signup =async (req,res)=>{
    try{
         let { name, email, password, contact } = req.body;

        if (!email || ! password){
            return res.status(400).json({
                success:false,
                message:'Missing required fields!',
            })
        }


  //////////////// verify if user alrady exusts

        const isExist=await User.findOne({email})
        if (isExist){
         return  res.status(400).json({
            success:false,
            message:'User already exists!'
          })
        }

        ////////  create new user




let user = await User.create({
    name,
    email,
    password,
    contact
});
  const token=_token(user,"2m")

   let userWithoutPassword=user.toObject();
    delete userWithoutPassword.password

  
       res.status(201).json({
            success: true,
            message: 'User created successfully!',
            token,
            user: userWithoutPassword
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Signup fail'
        })
    }


}

//////////////////////////login //////////////////////////

export const login = async (req,res)=>{
    try {
        let { email, password } = req.body;

        if (!email || !password) {
           return res.status(400).json({
                success: false,
                message: 'Missing required fields!'
            })
        }

  const user = await User.findOne({ email });

        if (!user || !(await user.comparePswd(password))) {
           return res.status(401).json({
                success: false,
                message: 'Invalid credential'
            })
        }

        
        /////// signin user
        let userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        const token = _token(user, '2m');

        res.status(200).json({
            success: true,
            message: 'User Login successfully!',
            token,
            user: userWithoutPassword
        })


    } catch (error) {
         res.status(500).json({
            success: false,
            error: error.message,
            message: 'Login fail'
        
    })
}
}

////////////////////////////////forgot password
export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        //////////////// generate token

        const token = _token({ _id: user._id }, '15m');

        const redirectURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await emailSender({
            to: user.email,
            subject: "Reset Password",
            html: `
            

<div>
    <h1>Reset Your Password</h1>

    <p>Hello,</p>

    <p>
        We received a request to reset the password associated with your account.
        Click the button below to create a new password.
    </p>

    <a href="${redirectURL}" target="_blank">Reset Password</a>

    <p>
        If you did not request a password reset, please ignore this email.
        Your account will remain secure, and no changes will be made.
    </p>

    <p>
        For security reasons, this password reset link will expire in 15 minutes.
    </p>

    <p>Thank you,<br>
    Support Team</p>
</div>
`

        });

        res.status(200).json({
            success: true,
            message: 'Reset password link sent to your email'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Forgot password fail'
        })
    }



}



export const resetPassword = async (req, res) => {
    try {

        const { password, token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        user.password = password;
       await user.save();

        res.status(200).json({
            success:true,
            message:'Password updated successfuly!'
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Reset password fail'
        })
    }
}

export const userProfile = async (req,res)=>{
res.status(200).json({user:req.user})
}