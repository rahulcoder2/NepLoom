import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const response = await axios.post(
      "http://localhost:8000/api/user/register",
      formData
    );
    return NextResponse.json(
        response.data,
      { status: response.status }
    );
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
