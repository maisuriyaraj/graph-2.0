import { jobListingModel } from "@/lib/models";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
            const jobLists = await jobListingModel.find({});
            return NextResponse.json({ status: true, message: "All Jobs Fetch Successfully !", data: jobLists });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: false, message: "Unable to provide service !" }, { status: 500 });
    }
}