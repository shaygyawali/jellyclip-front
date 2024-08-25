'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { FileUploader } from "react-drag-drop-files";
import styles from './upload.module.css'; // Import the CSS module
import { GoArrowRight } from "react-icons/go";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(''); // New state to track upload status
  const router = useRouter();
  const fileTypes = ["MP4", "MOV"];

  const handleFileChange = (file) => {
    setFile(file);
    setUploadStatus('File selected. Ready to upload.'); // Update status when a file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    // Upload the file to the backend
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the response contains the ID or URL of the processed video
        router.push(`/results?videoId=${data.videoId}`);
      } else {
        console.error('Failed to upload');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const stack2 = (
    <div
      style={{
        borderRadius: '16px',
        border: '2px dashed #000000',
        width: '40vw',
        display: 'flex', // Flexbox for centering
        flexDirection: 'column',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        boxSizing: 'border-box', // Include padding and border in element's width and height
        textAlign: 'center', // Ensure text is centered
        marginBottom: '20px',
        padding: '20px'
      }}
    >
      <img src="/videoFile.webp" alt="File upload icon" style={{ width: '100px' }} />
      <p className={styles.pSemi}>Select or Drag & Drop Your Video</p>
      <p style={{paddingBottom: '20px'}} >We support .mp4 and .mov files for now</p>
      <span></span>
      <p className={styles.pSemi} >{uploadStatus}</p>
    </div>
  );

  return (
    <SignedIn>
      <div className={styles.container}>
        
        <div className={styles.mockNav}>
            <div className={styles.jellyCut}>JellyClip</div>
            <UserButton className={styles.userButton} />
        </div>

        <div className={styles.uploadBox}>
          <h1 className={styles.heading}>Upload your Video</h1>
          <p className={styles.pSemi} style={{paddingBottom: '20px'}}>We'll handle the rest</p>
          <div>
            <FileUploader
              multiple={false}
              handleChange={handleFileChange}
              name="file"
              types={fileTypes}
              children={stack2}
            />
          </div>
          <button
            onClick={handleSubmit}
            className={`${styles.submitButton} ${!uploadStatus ? 'inactive' : ''}`}
            disabled={!uploadStatus} // Disable button when upload status is blank
          > Go
            <span className={styles.arrow}>
              <GoArrowRight />
            </span>
          </button>
        </div>
      </div>
    </SignedIn>
  );
}
