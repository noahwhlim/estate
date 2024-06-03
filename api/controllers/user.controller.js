import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
    res.json({
        message: "API Route is working"
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account!"));
    }

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: { // $set is a MongoDB operator that allows you to update the fields of a document
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        }, { new: true });

        const { password, ...rest } = updatedUser._doc; // Remove password from the response

        res.status(200).json(rest)

    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account!"));
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("User has been deleted")
    } catch (err) {
        next(err)
    }
}

export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings)
        } catch (err) {
            next(err)
        
        }
    }
    else {
        return next(errorHandler(401, "You can only view your own listings!")); next
    }
}