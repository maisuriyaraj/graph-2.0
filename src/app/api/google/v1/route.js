import { calenderModel } from "@/lib/models";
import { google } from "googleapis";
import { NextResponse } from "next/server";


const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECREATE, process.env.REDIRECT_URI)

export async function POST() {
    try {
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/calendar',
            prompt: 'consent', // Force consent screen to get a refresh token
        });

        if (url) {
            return NextResponse.json({ status: true, message: "URL generated Successfully !", url: url }, { status: 201 });
        } else {
            return NextResponse.json({ status: false, message: "Faild to generate URL" }, { status: 200 });
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: false, message: "Unable to Provide Service !", error: error }, { status: 200 });
    }
}

async function getVerificationToken(code){

    return new Promise((resolve,reject)=>{
        oauth2Client.getToken(code, (err, response) => {
            if (err) {
                reject(err);
                // return NextResponse.json({ status: false, message: "Faild To Get Token !!" });
            }
    
            oauth2Client.setCredentials(response);
            resolve(response);
            // return NextResponse.json({ status: true, message: "User Logged In successfully !", data: response });
        });
    })
}

export async function GET(request) {
    try {

        const { searchParams } = new URL(request.url);

        // Extract the query parameters
        const code = searchParams.get('code');
        const userId = searchParams.get('userId');
        const resp = await getVerificationToken(code);
        let calenderCrediatials = await calenderModel.findOne({userId:userId});
        if(calenderCrediatials){
            await calenderModel.updateOne({userId:userId},{
                $set:{
                    access_token:resp.access_token,
                    scope: resp.scope,
                    token_type: resp.token_type,
                    expiry_date: resp.expiry_date,
                    refresh_token:resp.refresh_token
                }
            });
        }else{
            let body = {
                userId:userId,
                calenderName:'google',
                accountConnected:true,
                access_token:resp.access_token,
                scope: resp.scope,
                token_type: resp.token_type,
                expiry_date: resp.expiry_date,
                refresh_token:resp.refresh_token
            }

            let collection = new calenderModel(body);
            let result = await collection.save();
        }
        
        return NextResponse.json({status:true,data:resp,message:"Access Token generated Successfully !!"},{status:201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: false, message: "Unable to Provide Servicce !" })
    }
}