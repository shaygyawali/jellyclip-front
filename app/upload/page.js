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
  
    // Simulate the file upload process with a delay
    setUploadStatus('Uploading...');
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay of 2 seconds
  
      // Mock response data
      const mockData = {
        videoId: 'mock-video-id-123',
      };
  
      // Simulate successful upload and redirect to results page with mock video ID
      setUploadStatus('Upload successful!');
      router.push(`/results?videoId=${mockData.videoId}`);
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Failed to upload');
    }
  };

  const stack2 = (
    <div
      className={styles.uploadSection} // Apply your custom class
      style={{
        borderRadius: '16px',
        border: '2px dashed #ffffff',
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
