import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { v4 as uuidv4 } from "uuid";
import supabase from "../../connection/supabase";
import "../styles/TemplateDemo.css";

export default function TemplateDemo({
  resume,
  setResume,
  updateCandidateData,
}) {
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const onTemplateUpload = async (event) => {
    try {
      const files = event.files;

      if (!files || files.length === 0) {
        toast.current?.show({
          severity: "warn",
          summary: "No File",
          detail: "Please upload a valid file.",
        });
        return;
      }

      let newUploadedFiles = [];

      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const uniqueFileName = `${uuidv4()}.${fileExt}`;

        const { error } = await supabase.storage
          .from("Resumes")
          .upload(uniqueFileName, file, {
            upsert: true,
            contentType: file.type,
          });

        if (error) throw error;

        const { data } = supabase.storage
          .from("Resumes")
          .getPublicUrl(uniqueFileName);

        const publicUrl = data.publicUrl;
        newUploadedFiles.push({ fileName: file.name, fileURL: publicUrl });
      }

      // Merge new files with previous resumes
      setResume((prev) => {
        const updatedResumes = [...prev, ...newUploadedFiles];
        return updatedResumes;
      });

      // Update backend with full list of resumes
      if (updateCandidateData) {
        await updateCandidateData({ resume: [...resume, ...newUploadedFiles] });
      }

      toast.current?.show({
        severity: "success",
        summary: "Upload Successful",
        detail: "Files uploaded successfully!",
      });
    } catch (err) {
      console.error("Upload Error:", err);
      toast.current?.show({
        severity: "error",
        summary: "Upload Failed",
        detail: "Something went wrong. Please try again.",
      });
    }
  };

  const emptyTemplate = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i
          className="pi pi-upload"
          style={{
            fontSize: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--primary-color)",
            border: "2px dashed var(--primary-color)",
            padding: "15px",
            transition: "all 0.3s ease-in-out",
            cursor: "pointer",
            opacity: "0.6",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--surface-c)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--surface-b)")
          }
        ></i>

        <div
          style={{
            fontSize: "1.2em",
            color: "var(--text-color-secondary)",
            marginTop: "15px",
            marginBottom: "-15px",
          }}
          className="my-5"
        >
          Drag and Drop Resume Here
        </div>
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />

      <FileUpload
        ref={fileUploadRef}
        name="resume-upload"
        multiple
        accept="application/pdf"
        maxFileSize={1000000}
        onUpload={onTemplateUpload}
        emptyTemplate={emptyTemplate}
        chooseOptions={{
          icon: "pi pi-fw pi-file",
          className: "custom-choose-btn p-button-rounded p-button-outlined",
        }}
        uploadOptions={{
          icon: "pi pi-fw pi-cloud-upload",
          className:
            "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
        }}
        cancelOptions={{
          icon: "pi pi-fw pi-times",
          className:
            "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
        }}
      />

      {/* Uploaded Files List */}
    </div>
  );
}
