   //to login

   import User from "../model/User";
   import { generateToken } from "../utils/jwt";
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

           //generate token

           const token = genrateToken(user._id);
           res.status(200).json({
               success: true,
               data: {
                   user: {
                       id: user._id,
                       name: user.name,
                       email: user.email
                   },
                   token
               },
               message: "user registered successfully"
           })
       } catch (error) {
           next(error)

       }
   }

   export const login = async(req, res, next) => {
       try {
           const { email, password } = req.body;
           const user = await User.findOne({ email }).select('+password')
           if (!user) {
               return res.status(401).json({
                   success: false,
                   error: 'Invalid email and password'
               })
           }
           //check if password is matched or not

           const isPasswordMatch = await User.matchPassword(password)

           if (!isPasswordMatch) {
               return res.status(401).json({
                   success: false,
                   error: "invalid"
               })
           }
           //generate token

           const token = genrateToken(user._id);
           res.status(201).json({
               success: true,
               data: {
                   user: {
                       id: user._id,
                       name: user.name,
                       email: user.email
                   },
                   token
               },
               message: "user login successfully"
           })
       } catch (error) {
           next(error)

       }
   }
   export const getMe = async(req, res, next) => {
       try {
           const userId = req.user.userId;
           const user = await User.findById(userId)
           if (!user) {
               return res.status(404).json({
                   success: false,
                   error: 'user not found'
               })
           }
           res.status(201).json({
               success: true,
               data: {
                   user: {
                       id: user._id,
                       name: user.name,
                       email: user.email
                   },
                   message: "user get successfully"
               },
               message: "user login successfully"
           })
       } catch (error) {
           next(error)
       }
   }