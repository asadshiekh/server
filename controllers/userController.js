import { request, response } from 'express';
import User from '../model/user_model.js';

const CreateUser = async (request, response) => {
     try {
        const newUser = new User({
            full_name: request.body.name,
            phone: request.body.phone,
            email: request.body.email,
            password: request.body.password,
        });

        const savedUser = await newUser.save();

        return response.status(200).json({
            data: savedUser,
            msg: 'User successfully added'
        });
    } catch (error) {
        return response.status(500).json(error);
    }
};

const Login = async (request, response) => {
    try {       
        if(!request.body){
            return response.status(400).json({error:"Missing body params"});
        }

        const {email,password:UserPassword} = request.body;

        if(!email || !UserPassword){
            return response.status(400).json({error:"Fields are missing"});
        }

        const CheckUserExist = await User.findOne({email})

        if(CheckUserExist){
            
        const {password} = CheckUserExist;

        if (password === UserPassword) {
            // Passwords match, proceed with login
            return response.status(200).json({message:'Login Successfully',data:CheckUserExist,Loginstatus:1});
        } else {
            // Passwords don't match
            return response.status(400).json({error:"Password not match"});
        }        
    }
        else{
             return response.status(400).json({error:"User not found"});
        }
   } catch (error) {
       return response.status(500).json(error);
   }

};

const Login1 = async (request, response) => {

    return response.status(200).json('Success');

};


export {CreateUser,Login,Login1};

export default CreateUser;
