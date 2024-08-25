import { communityModel } from "@/utils/models";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const communityList = await communityModel.find({});
        return NextResponse.json({ status: true, message: "All Communities Fetch Successfully !", data: communityList });
    } catch (error) {
        return NextResponse.json({ status: false, message: "Unable to provide service !" }, { status: 500 });
    }
}