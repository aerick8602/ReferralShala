import { unlink } from "fs/promises";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData(); // Get the form data

  const file = data.get("file"); // Get the file from form data
  console.log("files" ,file)
  if (!file) {
    return NextResponse.json({
      message: "No image found",
      success: false,
    });
  }

  const byteData = await file.arrayBuffer(); // Convert file to byte array
  const buffer = Buffer.from(byteData); // Convert byte array to buffer

  const uploadPath = `./public/uploads/${file.name}`; // Define the path where the file will be saved
  const relativePath = `/uploads/${file.name}`; // Relative path for access via URL

  try {
    await writeFile(uploadPath, buffer); // Write the file to the path

    return NextResponse.json({
      message: "File uploaded successfully",
      success: true,
      filePath: relativePath, // Return the relative path
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error uploading file: ${error.message}`,
      success: false,
    });
  }
}


export async function DELETE(req) {
  try {
    const { filePath } = await req.json(); // Get the file path from request body

    if (!filePath) {
      return NextResponse.json({
        message: "No file path provided",
        success: false,
      });
    }
    const fullPath = `./public${filePath}`; // Construct the full path for deletion
    await unlink(fullPath); // Delete the file

    return NextResponse.json({
      message: "File deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error deleting file: ${error.message}`,
      success: false,
    });
  }
}