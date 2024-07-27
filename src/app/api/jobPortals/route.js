import { jobPortals } from "@/lib/models";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
       
            const jobPortalLists = await jobPortals.find({});
            return NextResponse.json({ status: true, message: "All Job Portal Fetch Successfully !", data: jobPortalLists });

    } catch (error) {
        return NextResponse.json({ status: false, message: "Unable to provide service !" }, { status: 500 });
    }
}