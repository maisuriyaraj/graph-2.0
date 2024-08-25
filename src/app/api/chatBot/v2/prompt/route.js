import { AIBotModel } from "@/utils/models";
import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * @description AI Integration API
 * @param {*} request contains Request Details about Endpoint 
 * @returns Response 
 */
export async function POST(request) {
    try {
        const payload = await request.json();

        const prompt = payload.prompt.trim();
        if(prompt.length >= 5000){
            return NextResponse.json({status:false,message:"Your Prompt is too long !"});
        }
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return NextResponse.json({status:true,message:"Prompt Generated Successfully !",prompt:text});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: false, message: "Unbale to Provide Service !" });
    }
}