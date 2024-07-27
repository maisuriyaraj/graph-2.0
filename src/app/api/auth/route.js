import {  NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthTableModel, userModel } from "@/lib/models";
import { generateUniqueUsername } from "@/lib/helperFunctions";
const secreate_key = process.env.SECREATE_KEY


// User Sign Up
export async function POST(request) {
    try {
        const payload = await request.json();

        let user = null;
        if (payload?.userName) {
            user = await userModel.findOne({
                $or: [
                    { email: payload?.email },
                    { userName: payload?.userName }
                ]
            }).select({ email: 1, password: 1, userName: 1 });
        }else{
            user = await userModel.findOne({email:payload?.email}).select({ email: 1, password: 1, userName: 1 });
        }
        if (user && payload.googleAccount) {
            // If User try to sign up with registered Google Account (It will directly loggedIn user)
            let tokenData = await AuthTableModel.findOne({ user_id: user._id });
            let token = tokenData?.access_token;

            try {
                let user = jwt.verify(token, secreate_key);
                return NextResponse.json({ status: true, message: 'User Logged In Successfully', token, userId: user.userId });
            } catch (err) {
                // Token expired or invalid
                let newToken = jwt.sign({ userId: user._id }, secreate_key, { expiresIn: '7d' });

                const updateData = { access_token: newToken };
                if (payload?.device_token) {
                    updateData.device_token = payload.device_token;
                }

                await AuthTableModel.updateOne({ user_id: user._id }, { $set: updateData });
                return NextResponse.json({ status: true, message: 'User Logged In Successfully', token: newToken, userId: user._id });
            }
        }
        else if (user && payload.githubAccount) {
            // If User try to sign up with registered Github Account (It will directly loggedIn user)
            let tokenData = await AuthTableModel.findOne({ user_id: user._id });
            let token = tokenData?.access_token;

            try {
                let auth = jwt.verify(token, secreate_key);
                return NextResponse.json({ status: true, message: 'User Logged In Successfully', token, userId: auths.userId });
            } catch (err) {
                // Token expired or invalid
                let newToken = jwt.sign({ userId: user._id }, secreate_key, { expiresIn: '7d' });

                const updateData = { access_token: newToken };
                if (payload?.device_token) {
                    updateData.device_token = payload.device_token;
                }

                await AuthTableModel.updateOne({ user_id: user._id }, { $set: updateData });
                return NextResponse.json({ status: true, message: 'User Logged In Successfully', token: newToken, userId: user._id });
            }
        }
        else if (user && user.email == payload.email) {
            // It user Enteres Registered Email
            return NextResponse.json({ status: false, message: 'User has already registered !' });
        }
        else {
            // User Sign Up (If this User is new user)
            let userBody = { email: payload.email };

            if (payload?.password) {
                const salt = await bcrypt.genSalt(10);
                userBody.password = await bcrypt.hash(payload.password, salt);
            }
            if (payload?.userName) {
                
                userBody.userName = payload.userName;
            }
            if(!payload?.userName){
                let aiuserName = generateUniqueUsername();
                userBody.userName =  aiuserName;
            }
            if (payload?.googleAccount) {
                userBody.googleAccount = payload.googleAccount;
            }
            if (payload?.githubAccount) {
                userBody.githubAccount = payload.githubAccount;
            }
            if (payload?.profile_picture) {
                userBody.profile_picture = payload.profile_picture;
            }

            const newUser = new userModel(userBody);
            const result = await newUser.save();

            const newToken = jwt.sign({ userId: result._id }, secreate_key, { expiresIn: '7d' });

            const authTableBody = {
                user_id: result._id,
                access_token: newToken,
                ...(payload.device_token && { device_token: payload.device_token }),
                ...(payload.fcm_token && { fcm_token: payload.fcm_token })
            };

            const newAuthRecord = new AuthTableModel(authTableBody);
            await newAuthRecord.save();

            return NextResponse.json({ status: true, message: "User Registered Successfully!", token: newToken, userId: result._id });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: false, message: "Unable to Provide Services!" });
    }
}

// User Log in 

export async function PUT(request) {
    try {
        const payload = await request.json();

        const user = await userModel.findOne({
            $or: [
                { email: payload.email },
                { userName: payload.userName }
            ]
        }).select({ email: 1, password: 1, userName: 1 });
        if (user) {
            // User Log In
            if (payload.password) {
                let isRight = await bcrypt.compare(payload.password, user?.password);
                if (payload.email == user.email && isRight) {
                    let tokenData = await AuthTableModel.findOne({ user_id: user._id });
                    let token = tokenData?.access_token;

                    try {
                        let user = jwt.verify(token, secreate_key);
                        return NextResponse.json({ status: true, message: 'User Logged In Successfully', token, userId: user.userId });
                    } catch (err) {
                        // Token expired or invalid
                        let newToken = jwt.sign({ userId: user?._id }, secreate_key, { expiresIn: '7d' });

                        const updateData = { access_token: newToken };
                        if (payload?.device_token) {
                            updateData.device_token = payload.device_token;
                        }

                        await AuthTableModel.updateOne({ user_id: user._id }, { $set: updateData });
                        return NextResponse.json({ status: true, message: 'User Logged In Successfully', token: newToken, userId: user._id });
                    }
                } else {
                    return NextResponse.json({ status: false, message: "Email or Password is not correct !", code: 501 })
                }
            }
        } else {
            return NextResponse.json({ status: false, message: "User Does Not Exists !!" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: false, message: "Unable to Provide Services!" });
    }
}