// app/api/images/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const imageDirectory = path.join(process.cwd(), 'public', 'output');
  const files = await fs.promises.readdir(imageDirectory);
  const pngFiles = files.filter((file) => path.extname(file).toLowerCase() === '.png');
  const imagesWithMetadata = pngFiles.map((pngFile) => ({ image: pngFile }));
  return NextResponse.json(imagesWithMetadata);
}