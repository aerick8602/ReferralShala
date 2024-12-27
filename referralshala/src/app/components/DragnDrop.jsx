import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GiCloudUpload } from "react-icons/gi";
import { MdClear } from "react-icons/md";

const DragnDrop = ({ onFilesSelected, width, height }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            setFiles([selectedFiles[0]]);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setFiles([droppedFiles[0]]);
        }
    };

    const handleRemoveFile = () => {
        setFiles([]);
    };

    useEffect(() => {
        onFilesSelected(files[0]); // Pass the first file to the parent component
    }, [files, onFilesSelected]);

    return (
        <section className="bg-white border border-gray-300 rounded-xl p-3">
            <div
                className="border-dashed border-2 border-sky-500 bg-blue-50 p-2 flex flex-col items-center justify-center rounded-lg cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
            >
                <div className="flex flex-col items-center mb-1">
                    <GiCloudUpload className="text-6xl mb-4 text-sky-500" />
                    <div>
                        <p className="text-base font-semibold font-sans text-center">Drag and drop your file here</p>
                        <p className="text-xs font-sans">Limit 15MB per file. Supported files: .PDF, .DOCX, .PPTX, .TXT, .XLSX</p>
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
                    onMouseEnter={(e) => {
                        e.currentTarget.classList.remove("bg-sky-500", "text-white");
                        e.currentTarget.classList.add("bg-transparent", "text-sky-500");
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.classList.remove("bg-transparent", "text-sky-500");
                        e.currentTarget.classList.add("bg-sky-500", "text-white");
                    }}
                >
                    Browse file
                </label>

                {files.length > 0 && (
                    <div className="flex flex-col gap-2 w-full mt-2 overflow-y-auto">
                        <div className="flex justify-between items-center p-1 border border-gray-300 rounded-lg">
                            <div className="flex flex-col flex-1">
                                <p className="text-sm text-gray-700">{files[0].name}</p>
                            </div>
                            <div className="cursor-pointer" onClick={handleRemoveFile}>
                                <MdClear className="text-lg text-gray-600 hover:text-red-500" />
                            </div>
                        </div>
                    </div>
                )}

                {files.length > 0 && (
                    <div className="flex items-center text-green-500 mt-0.5">
                        <AiOutlineCheckCircle className="text-green-500 mr-1" />
                        <p className="text-sm font-semibold">1 file selected</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DragnDrop;