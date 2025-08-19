// src/App.jsx
import { useState, useEffect } from "react";
import LightRays from "./resources/LightRays";
import "./App.css";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate fade values based on scroll position
  const videoOpacity = Math.max(0, 1 - (scrollY / 300)); // Fade out over 300px
  const scrollTextOpacity = Math.max(0, 1 - (scrollY / 200)); // Fade out over 200px
  
  // Calculate ticker visibility based on scroll position
  const tickerOpacity = Math.min(1, Math.max(0, (scrollY - 100) / 200)); // Start appearing at 100px, fully visible at 300px
  
  // Calculate highlighted work section visibility
  const highlightedWorkOpacity = Math.min(1, Math.max(0, (scrollY - 600) / 200)); // Start appearing at 600px, fully visible at 800px

  // Video data with calculated aspect ratios
  const videoData = [
    {
      id: 1,
      title: "Brand Campaign - Tech Startup",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "horizontal" // 3 vertical cards + gaps
    },
    {
      id: 2,
      title: "Product Launch - Mobile App",
      thumbnail: "/thumbnails/916.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "vertical" // 9:16 portrait
    },
    {
      id: 3,
      title: "Corporate Overview - Manufacturing",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "horizontal"
    },
    {
      id: 4,
      title: "Social Media - Lifestyle Brand",
      thumbnail: "/thumbnails/916.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "vertical"
    },
    {
      id: 6,
      title: "Behind the Scenes - Production",
      thumbnail: "/thumbnails/916.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "vertical"
    },
    {
      id: 5,
      title: "Event Coverage - Conference",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "horizontal"
    },
    {
      id: 7,
      title: "Commercial Spot - Automotive",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "horizontal"
    },
    {
      id: 8,
      title: "Music Video - Indie Artist",
      thumbnail: "/thumbnails/916.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "vertical"
    },
    {
      id: 9,
      title: "Documentary - Environmental",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "horizontal"
    }
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <main className="app" style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {/* First Light Ray Layer - Background */}
      <div style={{
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "230vh", 
        zIndex: 1
      }}>
        <div style={{
          position: "sticky", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100vh", 
          zIndex: 1
        }}>
          <LightRays
            raysOrigin="top-left"
            raysColor="#ae8f47"
            raysSpeed={.7}
            lightSpread={8}
            rayLength={12}
            fadeDistance={6}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.2}
            distortion={0.00}
            className="background-rays"
          />
          {/* Black gradient fade at the end */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "30vh",
            background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))",
            pointerEvents: "none",
            zIndex: 2
          }} />
        </div>
      </div>
      
      {/* YouTube Video Background */}
      <div style={{
        position: "absolute", 
        top: `${scrollY * 0.3}px`, 
        left: 0, 
        width: "100%", 
        height: "100vh", 
        zIndex: 2
      }}>
        <div 
          className="video-container"
          style={{
            opacity: videoOpacity,
            transition: 'opacity 0.1s ease-out'
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/Kq8MBfpi8CM?autoplay=1&mute=1&loop=1&playlist=Kq8MBfpi8CM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            title="Background Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="background-video"
          ></iframe>
        </div>
      </div>
      
      {/* Second Light Ray Layer - Foreground */}
      <div style={{
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "230vh", 
        zIndex: 3
      }}>
        <div style={{
          position: "sticky", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100vh", 
          zIndex: 3
        }}>
          <LightRays
            raysOrigin="top-left"
            raysColor="#ae8f47"
            raysSpeed={.3}
            lightSpread={4}
            rayLength={4}
            fadeDistance={1}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.1}
            distortion={0.00}
            className="custom-rays"
          />
          {/* Black gradient fade at the end */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "30vh",
            background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))",
            pointerEvents: "none",
            zIndex: 4
          }} />
        </div>
      </div>
      
      {/* Main content */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "180vh",
        zIndex: 3
      }}>
        <div className="logo-container">
          <img 
            src="/Logo2.png" 
            alt="Logo" 
            className="logo"
          />
        </div>
      </div>
      <div className="content-container" style={{opacity: scrollTextOpacity, transition: 'opacity 0.15s ease-out'}}>
        <h1 className="main-heading">
          We craft high-performing brand video and build the pipelines that scale production.
        </h1>
        <p 
          className="scroll-text"
        >
          scroll for complete portfolio
        </p>
      </div>

      {/* Client Logo Ticker Section */}
      <div 
        className="ticker-section"
        style={{
          opacity: tickerOpacity,
          transition: 'opacity 0.1s ease-out',
          position: 'absolute',
          top: '80vh',
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2
        }}
      >
        <h2 className="ticker-header">Trusted by professionals at</h2>
        <div className="ticker-container">
          <div className="ticker-track">
            <div className="ticker-item">
              <img src="/clientlogo_airtab.png" alt="Airtab" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fc.png" alt="FC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fmc.png" alt="FMC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_jp.png" alt="JP" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_ofai.png" alt="OFAI" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_airtab.png" alt="Airtab" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fc.png" alt="FC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fmc.png" alt="FMC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_jp.png" alt="JP" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_ofai.png" alt="OFAI" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_airtab.png" alt="Airtab" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fc.png" alt="FC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fmc.png" alt="FMC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_jp.png" alt="JP" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_ofai.png" alt="OFAI" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_airtab.png" alt="Airtab" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fc.png" alt="FC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fmc.png" alt="FMC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_jp.png" alt="JP" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_ofai.png" alt="OFAI" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_airtab.png" alt="Airtab" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fc.png" alt="FC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_fmc.png" alt="FMC" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_jp.png" alt="JP" />
            </div>
            <div className="ticker-item">
              <img src="/clientlogo_ofai.png" alt="OFAI" />
            </div>
          </div>
        </div>
      </div>

            {/* Highlighted Work Section */}
      <div 
        className="highlighted-work-section"
        style={{
          opacity: highlightedWorkOpacity,
          transition: 'opacity 0.1s ease-out',
          position: 'absolute',
          top: '150vh', // Positioned on top of background
          left: '0',
          width: '100%',
          height: '80vh', // Increased height for 3 rows
          zIndex: 4
        }}
      >
        <h2 className="section-heading">Our Work</h2>
        <div className="video-grid">
          {videoData.map((video) => (
            <div 
              key={video.id} 
              className="video-thumbnail" 
              data-aspect={video.aspectRatio}
              onClick={() => handleVideoClick(video)}
            >
              <img src={video.thumbnail} alt={video.title} />
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedVideo.title}</h2>
            <div className="video-container">
              <iframe
                src={`${selectedVideo.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${selectedVideo.videoUrl.split('/').pop()}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button onClick={closeVideo}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
