import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';

const JSON_PATH = process.env.TODO_JSON_FILE || "";

const saveTodos = async (values: any) => {
    try {
        await fs.writeFile(JSON_PATH, JSON.stringify(values));
    } catch (error) {
        console.error("saveTodos:", error);
    }
};

export async function POST(req: NextRequest) {
    const data = await req.json()
    saveTodos(data);
    return NextResponse.json(data);
}