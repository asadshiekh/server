import { request, response } from 'express';
import User from '../model/user_model.js';

const UserController = async (request, response) => {
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


export default UserController;

