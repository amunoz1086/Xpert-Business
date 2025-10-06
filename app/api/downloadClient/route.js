import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";


export const POST = async (req) => {

    const { idSolicitud, fileName } = await req.json();

    try {

        const directory = path.resolve(process.cwd(), 'public', 'documentos', `${idSolicitud}`);
        const filePath = path.join(directory, fileName);

        const fileBuffer = await readFile(filePath);

        const fileStream = new ReadableStream({
            start(controller) {
                controller.enqueue(fileBuffer);
                controller.close();
            }
        });

        const headers = new Headers();
        headers.append("Content-Disposition", `attachment; filename=${fileName}`);
        headers.append("Content-Type", "application/octet-stream");

        return new NextResponse(fileStream, {
            headers,
        });

    } catch (error) {
        console.log(error);
    };

};