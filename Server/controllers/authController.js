   //to login

   import User from "../model/User";

   export const register = async(req, res, next) => {
       try {
           const { name, email, password } = req.body;
           const userExists = await User.findOne({ email })
           if (userExists) {
               return res.status(400).json({
                   success: false,
                   error: 'User already exists with this email'
               })
           }

           //create user if not exist
           const user = await User.create({
               name,
               email,
               password
           })
       } catch (error) {

       }
   }