import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.json();
        const response = await axios.post("http://localhost:8000/api/user/login", formData);

        const setCookie = response.headers["set-cookie"];
        console.log(setCookie);
        const nextRes = NextResponse.json(response.data, { status: response.status });
        if (setCookie) {
            nextRes.headers.set("Set-Cookie", setCookie.toString());
        }

        return nextRes;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return NextResponse.json(
                { message: error.response?.data?.message || "Something went wrong" },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
