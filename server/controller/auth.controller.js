import userModel from "../model/user.model";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from "../utils/generateToken";

export const register = async (req, res) =>{
    try {
        const { username, email, password, confirmPassword } = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({
                error: "Password does not match",
                code:400,
                status:'failed'
            })
        }

        const user = await userModel.findOne({ $or :[{email}, {username}] });
        if(user){
            return res.status(409).json({
                error: "User already exists",
                code:409,
                status:'failed'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword  = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username,
            email,
            password:hashPassword,
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
    
            res.status(201).json({
                data: {
                    _id: newUser._id,
                    username: newUser.username,
                },
                message: 'User created successfully',
                code: 201, 
                status: 'success'
            })
        }
    } catch (error) {
        res.status(500).json({
            data:[],
            message: `Server Error: ${error.message}`,
            code: 500,
            status: 'failure'
        })
    }
}

export const login =  async (req, res) =>{
    try {
        const { username_email, password } = req.body

        const user = await userModel.findOne({$or:[{email: username_email}, {username: username_email}]});
        if(!user){
            return res.status(404).json({
                error: "User not found",
                code: 404
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                error: "Invalid credentials",
                code: 401,
                status: 'failure'
            })
        }else{
            generateTokenAndSetCookie(user._id, res);
            res.status(200).json({
                data: {
                    _id: user._id,
                    username: user.username,
                },
                message: 'User logged in successfully',
                code: 200, 
                status: 'success'
            })
        }

    } catch (error) {
        res.status(500).json({
            data:[],
            message: `Server Error: ${error.message}`,
            code: 500,
            status: 'failure'
        })
    }
}

export const logout = async (req, res) =>{
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
            maxAge: 0
        })

        res.status(200).json({
            message: "User logged out successfully",
            status: "success",
            code:200
        })
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
            code: 500,
            status: 'failure'
        })
    }
}