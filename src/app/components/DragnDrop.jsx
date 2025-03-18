import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GiCloudUpload } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import "../styles/DragnDrop.css";
import Divider from "@mui/material/Divider";
import { FaExclamationCircle } from "react-icons/fa";

const DragnDrop = ({
  isauth,
  onFilesSelected,
  resumePath,
  setResumePath,
  updateCandidateData,
  width,
  height,
}) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file change (either from browsing or drag & drop)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      simulateUpload(); // Simulate the upload process
    }
  };

  // Handle file drop (drag & drop)
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      simulateUpload(); // Simulate the upload process
    }
  };

  // Handle file removal
  const handleRemoveFile = async () => {
    const response = await fetch("/api/upload", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath: resumePath }),
    });

    const result = await response.json();
    if (result.success) {
      console.log("File deleted successfully");
    } else {
      console.log("Error deleting file:", result.message);
    }
    setFile(null);
    onFilesSelected(null);
    setResumePath(null);
    updateCandidateData({ resume: null });
  };

  // Simulate upload progress
  const simulateUpload = () => {
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Notify the parent component of file selection
  useEffect(() => {
    onFilesSelected(file);
  }, [file, onFilesSelected]);

  // Open the file (either from file input or resumePath)
  const openFile = () => {
    const fileURL = file ? URL.createObjectURL(file) : resumePath;
    window.open(fileURL, "_blank");
  };

  return (
    <section
      className="dragn-drop-container"
      style={{
        height: height || "auto",
        width: width || "100%",
      }}
    >
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {isauth ? "Upload Your Resume" : "View Resume"}
        </h2>
        <p className="text-sm text-gray-500">
          Max size: 15MB | Supported formats: .PDF, .DOCX, .PPTX, .TXT, .XLSX
        </p>
      </div>

      <div
        className={`drag-area ${
          isUploading ? "border-[#f75858]" : "border-[#f75858]"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        style={{ minHeight: "170px" }}
      >
        {resumePath ? (
          <div className="file-info flex flex-col items-center gap-3 w-11/12 mt-2">
            <GiCloudUpload className="text-6xl text-[#f75858] opacity-25" />
            <div className="file-info-box flex justify-between items-center p-3">
              <div
                className="file-name text-green-600 font-medium text-sm truncate cursor-pointer hover:underline"
                onClick={openFile}
              >
                {file ? file.name : resumePath.split("/").pop()}
              </div>
              {isauth && (
                <button className="remove-btn" onClick={handleRemoveFile}>
                  <MdClear className="text-xl" />
                </button>
              )}
            </div>
            <div className="flex items-center text-green-500">
              <AiOutlineCheckCircle className="text-lg mr-1" />
              <span className="text-sm">File is ready to view</span>
            </div>
          </div>
        ) : (
          <>
            {isUploading ? (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            ) : (
              <>
                {isauth ? (
                  <>
                    <GiCloudUpload className="text-6xl text-[#fe4949] mb-4" />
                    <p className="text-base font-medium text-gray-800 text-center">
                      Drag and drop your resume here
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      Or click the button below to browse
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      id="browse"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.pptx,.txt,.xlsx"
                    />
                    <label htmlFor="browse" className="browse-btn">
                      Browse File
                    </label>
                  </>
                ) : (
                  <p
                    className="text-gray-500"
                    style={{
                      display: "flex",
                      fontSize: "large",
                      alignContent: "center",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <FaExclamationCircle
                      style={{ color: "#f44b4b", fontSize: "xx-large" }}
                    ></FaExclamationCircle>{" "}
                    Resume not uploaded yet.
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DragnDrop;
