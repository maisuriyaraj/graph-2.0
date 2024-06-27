import { jobPortals } from "@/lib/models";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const url = new URL(request.url);
        const jobPortalId = url.searchParams.get('jobPortalId') || null;
        if (jobPortalId) {
            const jobPortal = await jobPortals.findOne({ _id: jobPortalId });
            return NextResponse.json({ status: true, message: "Job Portal Data Fetched Successfully !", data: jobPortal });
        } else {
            const jobPortalLists = await jobPortals.find({});
            return NextResponse.json({ status: true, message: "All Job Portal Fetch Successfully !", data: jobPortalLists });

        }
    } catch (error) {
        return NextResponse.json({ status: false, message: "Unable to provide service !" }, { status: 500 });
    }
}