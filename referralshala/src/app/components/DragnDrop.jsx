import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GiCloudUpload } from "react-icons/gi";
import { MdClear } from "react-icons/md";

const DragnDrop = ({ onFilesSelected, resumePath, setResumePath, width, height }) => {
  const [file, setFile] = useState(null);

  // Handle file change (either from browsing or drag & drop)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle file drop (drag & drop)
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  // Remove the selected file
  const handleRemoveFile = () => {
    setFile(null);
    setResumePath(null); // Clear the path in the parent component if file is removed
  };

  // Notify the parent component of file selection
  useEffect(() => {
    onFilesSelected(file); // Pass the file to the parent component
  }, [file, onFilesSelected]);

  // Open the file (either from file input or resumePath)
  const openFile = () => {
    const fileURL = file ? URL.createObjectURL(file) : resumePath;
    window.open(fileURL, "_blank");
  };

  return (
    <section className="bg-white border border-gray-300 rounded-xl p-3">
      <div
        className="border-dashed border-2 border-sky-500 bg-blue-50 p-2 flex flex-col items-center justify-center rounded-lg cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {/* Check if resumePath is provided, if yes, show file name, otherwise show upload instructions */}
        {resumePath || file ? (
          <div className="flex flex-col gap-2 w-full mt-2 overflow-y-auto">
            <div className="flex justify-between items-center p-1 border border-gray-300 rounded-lg">
              <div
                className="flex flex-col flex-1 cursor-pointer text-sky-500 hover:underline"
                onClick={openFile}
              >
                <p className="text-sm font-semibold">
                  {file ? file.name : resumePath.split("/").pop()}
                </p>
              </div>
              <div className="cursor-pointer" onClick={handleRemoveFile}>
                <MdClear className="text-lg text-gray-600 hover:text-red-500" />
              </div>
            </div>
            <div className="flex items-center text-green-500 mt-0.5">
              <AiOutlineCheckCircle className="text-green-500 mr-1" />
              <p className="text-sm font-semibold">File ready to view</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-1">
              <GiCloudUpload className="text-6xl mb-4 text-sky-500" />
              <div>
                <p className="text-base font-semibold font-sans text-center">
                  Drag and drop your file here
                </p>
                <p className="text-xs font-sans">
                  Limit 15MB per file. Supported files: .PDF, .DOCX, .PPTX, .TXT, .XLSX
                </p>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              id="browse"
              onChange={handleFileChange}
              accept=".pdf,.docx,.pptx,.txt,.xlsx"
            />
            <label
              htmlFor="browse"
              className="text-sm flex items-center justify-center px-3 py-1 border border-gray-300 rounded-xl cursor-pointer bg-sky-500 text-white transition duration-300 hover:bg-transparent hover:text-sky-500"
            >
              Browse file
            </label>
          </>
        )}
      </div>
    </section>
  );
};

export default DragnDrop;
