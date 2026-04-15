// src/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LightRays from "./resources/LightRays";
import SmartGrid from "./components/SmartGrid";
import "./App.css";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [logoFadeElapsed, setLogoFadeElapsed] = useState(0);

  // Logo to URL mapping
  const logoUrls = {
    '/clientlogo_flg.png': 'https://www.liquid8rs.com',
    '/clientlogo_tipt.webp': 'https://www.tipt.co',
    '/clientlogo_ofai.png': 'https://www.openforanicon.com',
    '/clientlogo_airtab.png': 'https://www.airtabmedia.com',
    '/clientlogo_clip.png': 'https://clipmoney.com/',
    '/clientlogo_jp.png': 'https://www.jacksonproperties.com',
    '/clientlogo_fc.png': 'https://www.floridacavernsrvresort.com',
    '/clientlogo_lisbeth.png': 'https://www.etsy.com/shop/LisBETHSilk',
    '/clientlogo_fmc.png': 'https://www.fendermarine.com/'
  };

  // Helper function to render a ticker item
  const renderTickerItem = (logoPath, index) => {
    const url = logoUrls[logoPath];
    const alt = logoPath.split('_')[1]?.split('.')[0] || 'Client';
    return (
      <div key={index} className="ticker-item">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            textDecoration: 'none'
          }}
        >
          <img src={logoPath} alt={alt} />
        </a>
      </div>
    );
  };

  // Array of logos for the ticker (repeated 4 times for seamless loop)
  const tickerLogos = [
    '/clientlogo_airtab.png',
    '/clientlogo_clip.png',
    '/clientlogo_fc.png',
    '/clientlogo_fmc.png',
    '/clientlogo_jp.png',
    '/clientlogo_ofai.png',
    '/clientlogo_lisbeth.png',
    '/clientlogo_tipt.webp',
    '/clientlogo_flg.png'
  ];
  const tickerLogosRepeated = [...tickerLogos, ...tickerLogos, ...tickerLogos, ...tickerLogos];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fade-in after video loads: no delay, 500ms fade-in
  useEffect(() => {
    if (!videoLoaded) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);
      if (elapsed >= 500) {
        clearInterval(interval);
        setElapsedTime(500);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [videoLoaded]);

  // Time-based fade for logos: Logo3 (3s delay, 5s fade to 5%), Logo2 (5s delay, 15s fade to 30%)
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setLogoFadeElapsed(elapsed);
      // Stop updating after Logo2's full fade completes (5s delay + 15s fade = 20s)
      if (elapsed >= 20000) {
        clearInterval(interval);
        setLogoFadeElapsed(20000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Video fades in over 500ms after loading (no delay), then fades out on scroll
  const fadeInProgress = Math.min(1, elapsedTime / 500);
  const videoOpacity = Math.max(0, (1 - (scrollY / 300)) * fadeInProgress);

  // Logo3 (opaque bg, low z-index): 3s delay, 5s fade to 5% opacity — unchanged
  const logoFadeDelay = 3000;
  const logoFadeDuration = 5000;
  const logoFadeProgress = logoFadeElapsed < logoFadeDelay
    ? 0
    : Math.min(1, (logoFadeElapsed - logoFadeDelay) / logoFadeDuration);
  const scrollRestoreFactor = Math.min(1, scrollY / 200);
  const logoFadeFactor = 1 - 0.95 * logoFadeProgress * (1 - scrollRestoreFactor);

  // Logo2 (transparent bg, high z-index): 5s delay, 15s fade to 30% opacity
  const logo2FadeDelay = 5000;
  const logo2FadeDuration = 15000;
  const logo2FadeProgress = logoFadeElapsed < logo2FadeDelay
    ? 0
    : Math.min(1, (logoFadeElapsed - logo2FadeDelay) / logo2FadeDuration);
  const logo2FadeFactor = 1 - 0.7 * logo2FadeProgress * (1 - scrollRestoreFactor);
  const baseLogo2Opacity = 1 - videoOpacity;
  const logo2Opacity = baseLogo2Opacity * logo2FadeFactor;
  const scrollTextOpacity = Math.max(0, 1 - (scrollY / 200)); // Fade out over 200px
  
  // Calculate ticker visibility based on scroll position
  const tickerOpacity = Math.min(1, Math.max(0, (scrollY - 100) / 200)); // Start appearing at 100px, fully visible at 300px
  
  // Calculate highlighted work section visibility
  const highlightedWorkOpacity = Math.min(1, Math.max(0, (scrollY - 600) / 200)); // Start appearing at 600px, fully visible at 800px

  // Video data with real YouTube links
  const videoData = [
    {
      id: 1,
      title: "Clip Money - \"ATM Deposits, Powered by Clip\" [Internal] [Extended]",
      thumbnail: "/thumbnails/169.png",
      videoUrl: "https://www.youtube.com/embed/kJ6t7AdagsU",
      aspectRatio: "horizontal",
      category: "Internal / Corporate"
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
      }}>
        <div style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100vw",
          height: "110vh",
          zIndex: 1,
          maxWidth: "100vw",
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
            background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.5))",
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
            src="https://www.youtube-nocookie.com/embed/FUl4lWiRl9I?autoplay=1&mute=1&loop=1&playlist=FUl4lWiRl9I&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1&enablejsapi=0&start=0"
            title="Background Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            className="background-video"
            onLoad={() => setVideoLoaded(true)}
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
          height: "110vh",
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
            background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.5))",
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
          <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%', marginBottom: '10vh', verticalAlign: 'top' }}>
            <img
              src="/Logo3.png"
              alt="Logo Base"
              className="logo"
              style={{
                position: 'relative',
                display: 'block',
                marginBottom: 0,
                width: '100%',
                height: 'auto',
                zIndex: 1,
                opacity: logoFadeFactor,
                transition: 'opacity 0.1s ease-out',
                mixBlendMode: 'screen'
              }}
            />
            <img
              src="/Logo2.png"
              alt="Logo Overlay"
              className="logo logo-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'top left',
                pointerEvents: 'none',
                marginBottom: 0,
                marginTop: 0,
                zIndex: 2,
                opacity: logo2Opacity,
                transition: 'opacity 0.1s ease-out'
              }}
            />
          </div>
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
          zIndex: 10,
          pointerEvents: 'auto'
        }}
      >
        <h2 className="ticker-header">Trusted by professionals at</h2>
        <div className="ticker-container">
          <div className="ticker-track">
            {tickerLogosRepeated.map((logoPath, index) => renderTickerItem(logoPath, index))}
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
            alignItems: 'center',
            padding: '0',
            marginTop: '20vh'
          }}
        >
        <h2 className="services-heading">What We Make</h2>
        <p className="services-description">From platforms to premiere nights — built to move people and move product.</p>
        <div className="services-carousel">
          <div className="services-track">
            <div className="service-item">
              <div className="service-item-bg" style={{ backgroundImage: 'url(/thumbnails/lisbeth.gif)' }} />
              <div className="service-item-content">
                <h3>Social Content</h3>
                <p>Short-form video built for the scroll, designed to stop thumbs and grow your audience.</p>
                <button className="service-cta" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                  Start a Project
                </button>
              </div>
            </div>
            <div className="service-item">
              <div className="service-item-content">
                <h3>Product Videos</h3>
                <p>Cinematic visuals that show your product at its best, built for the moments that close a sale.</p>
                <button className="service-cta" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                  Start a Project
                </button>
              </div>
            </div>
            <div className="service-item">
              <div className="service-item-bg" style={{ backgroundImage: 'url(/thumbnails/fmc1.gif)' }} />
              <div className="service-item-content">
                <h3>Advertisements</h3>
                <p>High-impact spots crafted to convert, from concept through final delivery.</p>
                <button className="service-cta" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                  Start a Project
                </button>
              </div>
            </div>
            <div className="service-item">
              <div className="service-item-bg" style={{ backgroundImage: 'url(/thumbnails/ofai.gif)' }} />
              <div className="service-item-content">
                <h3>Concert Films</h3>
                <p>Multi-camera live productions edited as a film worth watching on its own.</p>
                <button className="service-cta" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                  Start a Project
                </button>
              </div>
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
