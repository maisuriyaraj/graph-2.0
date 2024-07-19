import { userModel } from "@/lib/models";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from 'jsonwebtoken';

const secreate_key = process.env.SECREATE_KEY


export async function POST(request) {
    try {
        const payload = await request.json();
        let userToken = headers();
        let token = userToken.get('Authorization') || null;
        try {
            jwt.verify(token, secreate_key);
            let user = await userModel.findOne({ _id: payload.userId }).select({ email: 1, phone_number: 1, isEmailVerified: 1, isMobileVerified: 1 });
            if (user) {
                if (payload["verification"] == 'email') {
                    let result = await userModel.updateOne({ _id: payload.userId }, { $set: { isEmailVerified: true } });
                    return NextResponse.json({ status: true, message: "Email Verified Successfully !" }, { status: 201 });
                } else {
                    let result = await userModel.updateOne({ _id: payload.userId }, { $set: { isMobileVerified: true } }, { status: 201 });
                    return NextResponse.json({ status: true, message: "Mobile Verified Successfully !" });
                }
            } else {
                return NextResponse.json({ stauts: false, message: "User Not Found !!" });
            }
        } catch (error) {
            return NextResponse.json({ status: false, message: "Your Session is Expired !" }, { status: 200 })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: false, messsage: "Unable to provide service" });
    }
}

export async function PUT(request) {
    try {
        const payload = await request.json();
        let userToken = headers();
        let token = userToken.get('Authorization') || null;
        try {
            jwt.verify(token, secreate_key);
            if (payload.userId) {
                let user = await userModel.findOne({ _id: payload.userId }).select({ email: 1, phone_number: 1, isEmailVerified: 1, isMobileVerified: 1 });
                if (user) {
                    if (payload["email"]) {
                        let isRegistred = await userModel.findOne({ email: payload.email })
                        if (!isRegistred) {
                            let result = await userModel.updateOne({ _id: user._id }, { $set: { email: payload.email } });
                            return NextResponse.json({ status: true, message: "Email Updated !!" }, { status: 201 });
                        } else {
                            return NextResponse.json({ status: true });
                        }
                    } else {
                        let isRegistred = await userModel.findOne({ phone_number: payload.phone })
                        if (!isRegistred) {
                            let result = await userModel.updateOne({ _id: user._id }, { $set: { phone_number: payload.phone } });
                            return NextResponse.json({ status: true, message: "Mobile Updated !!" }, { status: 201 });
                        } else {
                            return NextResponse.json({ status: true });
                        }
                    }
                } else {
                    return NextResponse.json({ status: false, message: "User Not Found !!" });
                }
            } else {
                return NextResponse({ status: false, message: "Please Provide user ID" });
            }
        } catch (error) {
            return NextResponse.json({ status: false, message: "Your Session is Expired !" }, { status: 200 })

        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: false, messsage: "Unable to provide service" });
    }
}