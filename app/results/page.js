'use client';

import styles from './ResultsPage.module.css';
import { SignedIn, UserButton } from '@clerk/nextjs';

export default function ResultsPage() {
  // Directly assign the video URL instead of using useState
  const videoUrl = '/mockVid.mp4'; // Set your video URL here

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mockNav}>
        <div className={styles.jellyCut}>JellyClip</div>
        <SignedIn>
          <UserButton className={styles.userButton} />
        </SignedIn>
      </div>
      <div className={styles.resultsContainer}>
        {videoUrl && (
          <video controls src={videoUrl} className={styles.videoPlayer}></video>
        )}
        <a href={videoUrl} download="uploaded-video.mp4" className={styles.downloadButton}>
          Download Video
        </a>
      </div>
    </div>
  );
}
