// app/api/image/[imageName]/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: Request, { params }: { params: { imageName: string } }) {
  const imagePath = path.join(process.cwd(), 'public', 'output', params.imageName);
  return NextResponse.file(imagePath);
}

export async function DELETE(request: Request, { params }: { params: { imageName: string } }) {
  const imageName = params.imageName;
  const imageNameWithoutNumber = imageName.replace(/_\d+\.png$/, '.png');
  const imagePath = path.join(process.cwd(), 'public', 'output', imageName);
  const jsonName = imageNameWithoutNumber.replace('.png', '_response.json');
  const jsonPath = path.join(process.cwd(), 'public', 'output', jsonName);
  const deletedFolder = path.join(process.cwd(), 'deleted');
  const deletedImagePath = path.join(deletedFolder, imageName);
  const deletedJsonPath = path.join(deletedFolder, jsonName);

  try {
    await fs.promises.rename(imagePath, deletedImagePath);
    await fs.promises.rename(jsonPath, deletedJsonPath);
    return NextResponse.json({ message: 'Image and metadata deleted successfully' });
  } catch (error) {
    console.error('Error deleting image and metadata:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}