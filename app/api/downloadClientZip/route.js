import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";


export const POST = async (req) => {

    const { idSolicitud } = await req.json();
    const directory = path.resolve(process.cwd(), 'public', 'documentos');
    const filePath = path.join(directory, idSolicitud + '.zip');

    try {
        const fileBuffer = await readFile(filePath);
        const headers = new Headers();

        headers.append("Content-Disposition", `attachment; filename= ${idSolicitud}.zip`);
        headers.append("Content-Type", "application/zip");

        return new NextResponse(fileBuffer, {
            headers,
        });

    } catch (error) {
        console.log(error);
    };

};