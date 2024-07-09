import { calenderModel } from "@/lib/models";
import { NextResponse } from "next/server";
import { google } from "googleapis";


const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECREATE, process.env.REDIRECT_URI)

function getCalenderEvents(){
    return new Promise((resolve,reject)=>{
        let calendarId = 'primary';
        const calendar = google.calendar({
            version: 'v3',
            auth: oauth2Client
        });
        calendar.events.list({calendarId,maxResults:10},(err,response)=>{
            if(err){
                console.log("<><><><><><><><><><><><><><><<><><><>",err);
                reject(err)
                // return NextResponse.json({status:false,message:"Can't fetch Events !"});
            }
            let data = response?.data?.items;
            resolve(data);
            // return NextResponse.json({status:true,data:data,message:"Calender Details Fetched Successfully !"},{status:201});
        })
    })
}

function addCalenderEvents(event){
    return new Promise((resolve,reject)=>{
        let calendarId = 'primary';
        const calendar = google.calendar({
            version: 'v3',
            auth: oauth2Client
        });
        calendar.events.insert({
            auth:oauth2Client,
            calendarId:'primary',
            resource: event,
        },(err,response)=>{
            if(err){
                console.log("<><><><><><><><><><><><><><><<><><><>",err);
                reject(err)
            }
            let res = response;
            console.log(response);
            resolve(response);
        })
    })
}

export async function GET(request,content) {
    let userId = content.params.userId;

    try {
        let calenderCrediatials = await calenderModel.findOne({userId:userId});
        if(calenderCrediatials){
            oauth2Client.setCredentials({
                access_token:calenderCrediatials.access_token,
                refresh_token:calenderCrediatials.refresh_token
                // scope:calenderCrediatials.scope,
                // token_type:calenderCrediatials.token_type,
                // expiry_date:calenderCrediatials.expiry_date
            });

           const response = await getCalenderEvents();
            return NextResponse.json({status:true,message:"User Connected Successfully !",data:calenderCrediatials,calenderData:response},{status:201});
        }else{
            return NextResponse.json({status:false,message:"User is Not Connected !",accountConnected:false});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({status:false,message:"Unable to Provide Service !"})
    }
}

export async function POST(request,content){
    let userId = content.params.userId;
    const payload = await request.json();

    try {
        let calenderCrediatials = await calenderModel.findOne({userId:userId});
        var event = {
            'summary': payload?.title || "",
            'location': payload?.location || null,
            'allDay' : payload?.allDay ,
            'description': payload?.description || "",
            'start': {
              'dateTime': payload?.start,
              'timeZone': payload?.zone,
            },
            'end': {
              'dateTime': payload?.end,
              'timeZone': payload?.zone,
            },
            'attendees': [],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
              ],
            },
          };
        if(calenderCrediatials){
            oauth2Client.setCredentials({
                access_token:calenderCrediatials.access_token,
                refresh_token:calenderCrediatials.refresh_token
            });

           const response = await addCalenderEvents(event);
            return NextResponse.json({status:true,message:"Event Addedd Successfully !",data:calenderCrediatials,calenderData:response},{status:201});
        }else{
            return NextResponse.json({status:false,message:"User is Not Connected !",accountConnected:false});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({status:false,message:"Unable to Provide Service !"})
    }
}

// export async function POST(request,content){
 
//     // const { searchParams } = new URL(request.url);
//     // const userId = searchParams.get('userId');
//     let userId = content.params.userId;


//     try {
        
//     } catch (error) {
//         console.log(error);
//         return NextResponse.send({status:false,message:"Unable to provide service (Event List) !"});
//     }   
// }