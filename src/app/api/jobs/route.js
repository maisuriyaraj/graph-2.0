import { jobListingModel } from "@/lib/models";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const url = new URL(request.url);
        const jobId = url.searchParams.get('jobId') || null;
        if (jobId) {
            const job = await jobListingModel.findOne({ _id: jobId });
            return NextResponse.json({ status: true, message: "Job Data Fetched Successfully !", data: job });
        } else {
            const jobLists = await jobListingModel.find({});
            return NextResponse.json({ status: true, message: "All Jobs Fetch Successfully !", data: jobLists });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: false, message: "Unable to provide service !" }, { status: 500 });
    }
}