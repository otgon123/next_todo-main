import { NextResponse } from "next/server";
import fs from 'fs/promises';

const JSON_PATH = process.env.TODO_JSON_FILE || "";

const isFileExists = async (path: string) => {
    if (!path) return false;
    try {
        await fs.access(path, fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
};

const loadTodos = async () => {
    try {
        const isFile = await isFileExists(JSON_PATH);
        console.log("isFile:", isFile)
        if (isFile) {
            const data = await fs.readFile(JSON_PATH, 'utf-8');
            return await JSON.parse(data);
        } else {
            return [];
        }
    } catch (error) {
        console.error("loadTodos:", error);
    }
};


export async function GET() {
    const data = await loadTodos();
    return NextResponse.json(data);
}