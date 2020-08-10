import { Application, Request, Response } from 'express';
import UserModel from '../models/user';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthController {
    public login(req: Request, res: Response) {
        (async () => {
            try {
                const { username, email, password, suspend } = req.body;
                const userExists = await UserModel.findOne({ $or: [{ username }] });
                delete userExists?.password;
                console.log('userExists', userExists);
                if (!userExists) {
                    return res.status(500).json({ message: 'User doesn\'t exists!' });
                }

                const isValidPassword = await bcrypt.compare(password, userExists.password);
                console.log('isValidPassword', isValidPassword);
                if (!isValidPassword) {
                    return res.status(500).json({ message: 'Invalid credentials!' });
                }
                
                if (userExists?.suspended) {
                    return res.status(500).json({ message: 'User is suspended!' });
                }

                const token = jwt.sign({ userData: userExists }, 'JWT-STR1N6', { expiresIn: '1h' });
                res.status(200).json({ success: true, token: token });

            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        })(); 
    }
}