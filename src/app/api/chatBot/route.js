import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request) {
    try {
        const payload = await request.json();

        const prompt = payload.prompt;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return NextResponse.json({status:false,message:"Prompt Generated Successfully !",prompt:text});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, message: "Unbale to Provide Service !" });
    }
}