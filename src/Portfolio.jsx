// src/Portfolio.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import SmartGrid from "./components/SmartGrid";
import "./App.css";

export default function Portfolio() {

  // Video data with all categories, randomized order
  const allVideos = [
    // Promo Reel
    { id: 1, title: "Promo Reel 1", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/_UXaELhQzao", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 2, title: "Promo Reel 2", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/NYhN5XVWBZ8", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 3, title: "Promo Reel 3", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/aN7PhtqhCwU", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 4, title: "Promo Reel 4", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/s9p6i7tDivQ", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 5, title: "Promo Reel 5", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/hPyT0vj8dUE", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 6, title: "Promo Reel 6", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/sFTGgG468bo", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 7, title: "Promo Reel 7", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/-urJLOP1jLQ", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 8, title: "Promo Reel 8", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/nnKvMc7Gw3o", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 9, title: "Promo Reel 9", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/QoLJdh7j0-4", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 10, title: "Promo Reel 10", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/QRK--fR5KU8", aspectRatio: "horizontal", category: "Promo Reel" },
    { id: 11, title: "Promo Reel Short 1", thumbnail: "/thumbnails/916.png", videoUrl: "https://www.youtube.com/embed/qIxHhyWgYUU", aspectRatio: "vertical", category: "Promo Reel" },
    { id: 12, title: "Promo Reel Short 2", thumbnail: "/thumbnails/916.png", videoUrl: "https://www.youtube.com/embed/Bhq3JjhCG-k", aspectRatio: "vertical", category: "Promo Reel" },
    { id: 13, title: "Promo Reel Short 3", thumbnail: "/thumbnails/916.png", videoUrl: "https://www.youtube.com/embed/Pf5CSCycgbQ", aspectRatio: "vertical", category: "Promo Reel" },
    { id: 14, title: "Promo Reel Short 4", thumbnail: "/thumbnails/916.png", videoUrl: "https://www.youtube.com/embed/wxosX9ivgQw", aspectRatio: "vertical", category: "Promo Reel" },
    { id: 15, title: "Promo Reel Short 5", thumbnail: "/thumbnails/916.png", videoUrl: "https://www.youtube.com/embed/qIxHhyWgYUU", aspectRatio: "vertical", category: "Promo Reel" },
    
    // Website Banner
    { id: 16, title: "Website Banner 1", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/3u2WLj3WQp8", aspectRatio: "horizontal", category: "Website Banner" },
    { id: 17, title: "Website Banner 2", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/DJArpjLktqg", aspectRatio: "horizontal", category: "Website Banner" },
    { id: 18, title: "Website Banner 3", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/XQjtRLgWvfE", aspectRatio: "horizontal", category: "Website Banner" },
    { id: 19, title: "Website Banner 4", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/yLO1iPC0U6U", aspectRatio: "horizontal", category: "Website Banner" },
    { id: 20, title: "Website Banner 5", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/vjgyIm2Jm0s", aspectRatio: "horizontal", category: "Website Banner" },
    
    // Ad
    { id: 21, title: "Ad 1", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/qQgWRWEiCQM", aspectRatio: "horizontal", category: "Ad" },
    { id: 22, title: "Ad 2", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/briKVzcxssA", aspectRatio: "horizontal", category: "Ad" },
    { id: 23, title: "Ad 3", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/4hzdqTxiRss", aspectRatio: "horizontal", category: "Ad" },
    { id: 24, title: "Ad Short 1", thumbnail: "/thumbnails/916.png", videoUrl: "https://www.youtube.com/embed/nVObwK_ISG8", aspectRatio: "vertical", category: "Ad" },
    { id: 25, title: "Ad Short 2", thumbnail: "/thumbnails/916.png", videoUrl: "https://www.youtube.com/embed/7MTAqe8iidg", aspectRatio: "vertical", category: "Ad" },
    { id: 26, title: "Ad Short 3", thumbnail: "/thumbnails/916.png", videoUrl: "https://www.youtube.com/embed/ERql6lur9yQ", aspectRatio: "vertical", category: "Ad" },
    { id: 27, title: "Ad Short 4", thumbnail: "/thumbnails/916.png", videoUrl: "https://www.youtube.com/embed/Bhq3JjhCG-k", aspectRatio: "vertical", category: "Ad" },
    { id: 33, title: "Ad 4", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/sfXZT0dHuuc", aspectRatio: "horizontal", category: "Ad" },
    
    // Short Film
    { id: 28, title: "Monotonous Dejection", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/klEVBSD7k84", aspectRatio: "horizontal", category: "Short Film" },
    { id: 29, title: "Find My Friends", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/dCT-SM94qFo", aspectRatio: "horizontal", category: "Short Film" },
    { id: 30, title: "Boss of the Month", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/x6IZ6bCGbMg", aspectRatio: "horizontal", category: "Short Film" },
    { id: 31, title: "Last Ride", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/QFIvwBPdVFc", aspectRatio: "horizontal", category: "Short Film" },
    { id: 32, title: "The River", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/1OaWBCMEDjE", aspectRatio: "horizontal", category: "Short Film" },
    { id: 36, title: "RIPB", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/AU0ZgsJKHDU", aspectRatio: "horizontal", category: "Short Film" },

    // Internal / Corporate
    { id: 34, title: "Clip Money - \"ATM Deposits, Powered by Clip\" [Internal] [Extended]", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/kJ6t7AdagsU", aspectRatio: "horizontal", category: "Internal / Corporate" },
    { id: 35, title: "Clip Money - \"ATM Deposits, Powered by Clip\" [Internal]", thumbnail: "/thumbnails/169.png", videoUrl: "https://www.youtube.com/embed/RQKMtyFeLNU", aspectRatio: "horizontal", category: "Internal / Corporate" }
  ];

  // Randomize the order
  const videoData = allVideos.sort(() => Math.random() - 0.5);


  return (
    <div className="portfolio-page" style={{
      width: '100vw',
      minHeight: 'auto',
      background: '#000000',
      paddingTop: '80px', // Account for fixed navbar
      paddingBottom: '2rem', // Add some bottom padding
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      {/* Portfolio Content */}
      <div className="portfolio-content" style={{
        width: '100%',
        maxWidth: '1200px',
        padding: '2rem 1rem',
        margin: '0 auto',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 className="portfolio-title" style={{
          fontFamily: 'Georgia, serif',
          fontWeight: 'bold',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'white',
          textAlign: 'center',
          marginBottom: '2rem',
          letterSpacing: '2px',
          width: '100%'
        }}>
          Complete Portfolio
        </h1>
        
        <p className="portfolio-description" style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '600px',
          width: '100%',
          padding: '0 1rem'
        }}>
          Explore our collection of high-performing brand videos and social media content.
        </p>

        <SmartGrid 
          videoData={videoData}
          className="portfolio-grid"
        />
      </div>

    </div>
  );
}
