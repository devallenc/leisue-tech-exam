import { Application, Request, Response } from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

export class UserController {
    public createUser(req: Request, res: Response) {
        (async () => {
            try {
                const { username, email, password, suspend } = req.body;
                const userExists = await UserModel.findOne({ $or: [{ username, email }] }).exec();
                console.log('userExists', userExists);
                if (userExists) {
                    return res.status(500).json({ message: 'User already exists!' });
                }
                const hashedPassword = await bcrypt.hash(password, 11);
                req.body.password = hashedPassword;
                const newUser = await UserModel.create(req.body);
                if (newUser) {
                    res.status(200).json({ message: " User added successfully" });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        })(); 
    }

    public getUsers(req: Request, res: Response) {
        (async () => {
            try {
                const pageSize = Number(req.query.pageSize);
                const currentPage = Number(req.query.page);
              
                const users = await UserModel.find().skip(pageSize * (currentPage - 1)).limit(pageSize).exec();
                console.log('users', users);
                if (users) {
                    res.status(200).json({ data: users });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        })();
    }

    public updateUser(req: Request, res: Response) {
        (async () => {
            try {
                const { id } = req.params;
                const userUpdated = await UserModel.findByIdAndUpdate(id, { $set:req.body }, { new: true }).exec();
                console.log('users', userUpdated);
                if (userUpdated) {
                    res.status(200).json({ data: userUpdated });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        })();
    }

    public deleteUser(req: Request, res: Response) {
        (async () => {
            try {
                const { id } = req.params;
              
                const userDeleted = await UserModel.findByIdAndRemove(id).exec();
                console.log('userDeleted', userDeleted);

                const findUser = await UserModel.findById(id).exec();
                console.log('findUser', findUser);
                
                if (userDeleted) {
                    res.status(200).json({ data: userDeleted });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        })();
    }
}