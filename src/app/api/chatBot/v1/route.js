import { AIBotModel, userModel } from "@/lib/models";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    try {
        if (userId) {
            const userData = await userModel.findOne({ _id: userId }).select({ password: 0 });
            let AIChats = [];
            AIChats = userData?.AIbotChats || [];
            let ChatCollection = new AIBotModel({
                userId:userId,
                chatTitle: "My Chat.."
            });
            let result = await ChatCollection.save();
            AIChats.push(result._id);
            let userChatsUpdate = await userModel.updateOne({ _id: userId }, { $set: { AIbotChats: AIChats } });
            return NextResponse.json({ status: true, message: "Chat Addedd Successfully !" }, { status: 201 });
        } else {
            return NextResponse.json({ status: false, message: "Please Provide user ID !" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, message: "Unable to Provide Service !", error: error });
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    try {
        const updatedUserChats = await AIBotModel.find({ userId: userId });
        if(updatedUserChats){
            return NextResponse.json({ status: true, message: "Chat Fetched Successfully !", data: updatedUserChats }, { status: 201 });
        }else{
            return NextResponse.json({status:false,message:"Not Available Chats !"});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, message: "Unable to Provide Service !", error: error });
    }

}