// src/components/SmartGrid.jsx
import { useState, useEffect, useRef } from 'react';
import { createResponsiveGrid } from '../utils/smartGrid';

export default function SmartGrid({ videoData, className = '', disableHover = false, showCategoryButtons = true }) {
  const [gridRows, setGridRows] = useState([]);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const isInitialLoadRef = useRef(true);
  const containerRef = useRef(null);

  // Get unique categories from video data
  const categories = ['All', ...new Set(videoData.map(video => video.category))];

  // Filter videos based on selected category
  const filteredVideos = selectedCategory === 'All' 
    ? videoData 
    : videoData.filter(video => video.category === selectedCategory);

  // Function to randomize the order of videos within each row
  const randomizeRowOrder = (rows) => {
    return rows.map(row => {
      const shuffledRow = [...row];
      for (let i = shuffledRow.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledRow[i], shuffledRow[j]] = [shuffledRow[j], shuffledRow[i]];
      }
      return shuffledRow;
    });
  };

  useEffect(() => {
    const updateGrid = () => {
      if (containerRef.current) {
        // Get the actual container width (which is constrained to 80vw by CSS)
        const containerWidth = containerRef.current.offsetWidth;
        console.log(`Container width: ${containerWidth}px`);
        setContainerWidth(containerWidth);
        const rows = createResponsiveGrid(filteredVideos, containerWidth);
        
        // Randomize row order only on initial load
        const finalRows = isInitialLoadRef.current ? randomizeRowOrder(rows) : rows;
        console.log(`SmartGrid: isInitialLoad=${isInitialLoadRef.current}, randomizing=${isInitialLoadRef.current}`);
        setGridRows(finalRows);
        
        // Mark as no longer initial load after first calculation
        if (isInitialLoadRef.current) {
          isInitialLoadRef.current = false;
        }
      }
    };

    // Initial calculation
    updateGrid();

    // Update on resize
    const handleResize = () => {
      updateGrid();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [filteredVideos]);

  return (
    <div 
      ref={containerRef}
      className={`smart-grid ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '100%',
        width: '100%',
        margin: '0 auto',
        padding: '0 1rem'
      }}
    >
      {/* Category Filter Buttons */}
      {showCategoryButtons && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          padding: '0 1rem'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
              }}
            >
              {category === 'All' ? 'All' : category + 's'}
            </button>
          ))}
        </div>
      )}
      {gridRows.map((row, rowIndex) => (
        <div 
          key={rowIndex}
          className="smart-grid-row"
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          {row.map((video, videoIndex) => (
            <div
              key={`${video.id}-${rowIndex}-${videoIndex}`}
              className={`smart-video-thumbnail ${video.aspectRatio === 'horizontal' ? 'horizontal' : 'vertical'}`}
              style={{
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                position: 'relative',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                width: video.aspectRatio === 'horizontal' ? '356px' : '112px', // 16:9 and 3:1 ratios
                flexShrink: 0
              }}
              onMouseEnter={!disableHover ? (e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
              } : undefined}
              onMouseLeave={!disableHover ? (e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              } : undefined}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(https://img.youtube.com/vi/${video.videoUrl.split('/').pop()}/maxresdefault.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => window.open(video.videoUrl.replace('/embed/', '/watch?v='), '_blank')}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '15px solid white',
                    borderTop: '9px solid transparent',
                    borderBottom: '9px solid transparent',
                    marginLeft: '4px'
                  }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
