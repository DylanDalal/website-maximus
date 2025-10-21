// src/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LightRays from "./resources/LightRays";
import SmartGrid from "./components/SmartGrid";
import "./App.css";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

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

  // Video data with real YouTube links
  const videoData = [
    {
      id: 1,
      title: "Brand Campaign - Tech Startup",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/DJArpjLktqg",
      aspectRatio: "horizontal",
      category: "Website Banner"
    },
    {
      id: 2,
      title: "Product Launch - Mobile App",
      thumbnail: "/thumbnails/916.png",
      videoUrl: "https://www.youtube.com/embed/qIxHhyWgYUU",
      aspectRatio: "vertical",
      category: "Promo Reel"
    },
    {
      id: 3,
      title: "Corporate Overview - Manufacturing",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/XQjtRLgWvfE",
      aspectRatio: "horizontal",
      category: "Website Banner"
    },
    {
      id: 4,
      title: "Social Media - Lifestyle Brand",
      thumbnail: "/thumbnails/916.png",
      videoUrl: "https://www.youtube.com/embed/nVObwK_ISG8",
      aspectRatio: "vertical",
      category: "Ad"
    },
    {
      id: 5,
      title: "Behind the Scenes - Production",
      thumbnail: "/thumbnails/916.png",
      videoUrl: "https://www.youtube.com/embed/7MTAqe8iidg",
      aspectRatio: "vertical",
      category: "Ad"
    },
    {
      id: 6,
      title: "Event Coverage - Conference",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/yLO1iPC0U6U",
      aspectRatio: "horizontal",
      category: "Website Banner"
    },
    {
      id: 7,
      title: "Commercial Spot - Automotive",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/briKVzcxssA",
      aspectRatio: "horizontal",
      category: "Ad"
    },
    {
      id: 8,
      title: "Music Video - Indie Artist",
      thumbnail: "/thumbnails/916.png",
      videoUrl: "https://www.youtube.com/embed/xQ-R-XPs_08",
      aspectRatio: "vertical",
      category: "Promo Reel"
    },
    {
      id: 9,
      title: "Documentary - Environmental",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/klEVBSD7k84",
      aspectRatio: "horizontal",
      category: "Short Film"
    },
    {
      id: 10,
      title: "Creative Project - Art Direction",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/x6IZ6bCGbMg",
      aspectRatio: "horizontal",
      category: "Short Film"
    }
  ];



  return (
    <main className="home" style={{ position: "relative", height: "90vh", width: "100vw" }}>
      
      {/* First Light Ray Layer - Background */}
      <div style={{
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100vw", 
        height: "230vh", 
        zIndex: 1,
        maxWidth: "100vw",
        overflow: "hidden"
      }}>
        <div style={{
          position: "sticky", 
          top: 0, 
          left: 0, 
          width: "100vw", 
          height: "100vh", 
          zIndex: 1,
          maxWidth: "100vw",
          overflow: "hidden"
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
        zIndex: 2
      }}>
        <div style={{
          position: "sticky", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100vh", 
          zIndex: 2
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
            zIndex: 3
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
        zIndex: 4
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
          We craft high-performing brand video and social media content.
        </h1>
        <p 
          className="scroll-text"
        >
          scroll to view our work
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

      {/* Sections Container - Highlighted Work, Services, Contact */}
      <div 
        className="sections-container"
        style={{
          position: 'absolute',
          top: '160vh',
          left: '0',
          width: '100%',
          zIndex: 4,
        }}
      >
        {/* Highlighted Work Section */}
        <div 
          className="highlighted-work-section"
          style={{
            opacity: highlightedWorkOpacity,
            transition: 'opacity 0.1s ease-out',
            position: 'relative',
            width: '100%',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
        <h2 className="section-heading">Highlighted Work</h2>
        <p className="section-description">Explore our portfolio of high-impact video productions that drive engagement and deliver results for brands across industries.</p>
        <div style={{
          width: '100%',
          maxWidth: '80vw',
          position: 'relative',
          zIndex: 1
        }}>
          <SmartGrid 
            videoData={videoData}
            className="highlighted-work-grid"
            disableHover={true}
            showCategoryButtons={false}
          />
        </div>
        
        {/* View Complete Portfolio Button */}
        <div style={{
          marginTop: '3rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Link 
            to="/portfolio"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            View Complete Portfolio
          </Link>
        </div>
        </div>
        
        {/* Our Services Section */}
        <div 
          className="services-section"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0',
            marginTop: '20vh'
          }}
        >
        <h2 className="services-heading" style={{ paddingLeft: '8vw' }}>Our Services</h2>
        <p className="services-description" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>From concept to completion, we deliver comprehensive video solutions tailored to your brand's unique needs and objectives.</p>
        <div className="services-carousel">
          <div className="services-track">
            <div className="service-item">
              <h3>Brand Campaigns</h3>
              <p>Complete brand storytelling and campaign development</p>
            </div>
            <div className="service-item">
              <h3>Social Media Content</h3>
              <p>Engaging video content for all social platforms</p>
            </div>
            <div className="service-item">
              <h3>Commercial Production</h3>
              <p>Professional commercial and promotional videos</p>
            </div>
            <div className="service-item">
              <h3>Event Coverage</h3>
              <p>Live event documentation and highlight reels</p>
            </div>
            <div className="service-item">
              <h3>Documentary</h3>
              <p>Compelling documentary and storytelling content</p>
            </div>
            <div className="service-item">
              <h3>Music Videos</h3>
              <p>Creative music video production and direction</p>
            </div>
            <div className="service-item">
              <h3>Product Launches</h3>
              <p>Strategic product launch and marketing videos</p>
            </div>
            <div className="service-item">
              <h3>Corporate Videos</h3>
              <p>Professional corporate communication content</p>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div 
          className="contact-section"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            marginTop: '20vh'
          }}
        >
        <h2 className="contact-heading">Get In Touch</h2>
        <p className="section-description">Ready to bring your vision to life? Let's discuss your project and create something extraordinary together.</p>
        <div className="contact-content">
          <div className="contact-info">
            <a 
              href="mailto:contact@maximus.productions" 
              className="contact-email"
            >
              contact@maximus.productions
            </a>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="contact-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="contact-input"
              />
            </div>
            <div className="form-group">
              <textarea 
                placeholder="Your Message" 
                className="contact-textarea"
                rows="4"
              ></textarea>
            </div>
            <button type="submit" className="contact-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
      </div>
      </div>

    </main>
  );
}
