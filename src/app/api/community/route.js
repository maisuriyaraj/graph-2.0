import { communityModel } from "@/lib/models";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const url = new URL(request.url);
        const communityId = url.searchParams.get('communityId') || null;
        if (communityId) {
            const community = await communityModel.findOne({ _id: communityId });
            return NextResponse.json({ status: true, message: "Comminity Data Fetched Successfully !", data: community });
        } else {
            const communityList = await communityModel.find({});
            return NextResponse.json({ status: true, message: "All Communities Fetch Successfully !", data: communityList });

        }
    } catch (error) {
        return NextResponse.json({ status: false, message: "Unable to provide service !" }, { status: 500 });
    }
}