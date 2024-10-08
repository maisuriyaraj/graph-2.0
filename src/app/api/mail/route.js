import { sendEmailService } from "@/utils/helperFunctions";
import { userModel } from "@/utils/models";
import jwt from 'jsonwebtoken';
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const secreate_key = process.env.SECREATE_KEY


export async function POST(request) {
    const payload = await request.json();
    let userToken = headers();
    let token = userToken.get('Authorization') || null;

    try {
        try {
            jwt.verify(token, secreate_key);
            if (payload?.email) {
                sendEmailService(payload.email, payload.mailBody);
                return NextResponse.json({ status: true, message: "Mail Sent Successfully !" }, { status: 201 });
                // sendEmailService(payload.email,payload.mailBody);
                // return NextResponse.json({status:true,message:"Mail Sent Successfully !"});
            } else {
                return NextResponse.json({ status: false, message: "Please Provide Email Address !!" })
            }
        } catch (error) {
            return NextResponse.redirect('/',302);
            // return NextResponse.json({ status: false, message: "Your Session is Expired !" }, { status: 200 })

        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: false, message: "Unable to provide service !" });
    }
}