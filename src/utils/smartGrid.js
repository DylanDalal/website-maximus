// src/utils/smartGrid.js

/**
 * Smart Grid Algorithm for optimal video arrangement
 * 
 * Rules:
 * - 3 vertical videos = 1 horizontal video (3:1 ratio)
 * - Always try to fill rows completely
 * - Reorder content to maximize space efficiency
 */

export function createSmartGrid(videoData, containerWidth = 1200, baseUnitSize = 113) {
  // Calculate how many base units fit in the container width
  const unitsPerRow = Math.floor(containerWidth / baseUnitSize);
  
  // Separate videos by aspect ratio
  const horizontalVideos = videoData.filter(video => video.aspectRatio === 'horizontal');
  const verticalVideos = videoData.filter(video => video.aspectRatio === 'vertical');
  
  const rows = [];
  let currentRow = [];
  let currentRowUnits = 0;
  
  // Process all videos
  const allVideos = [...horizontalVideos, ...verticalVideos];
  
  for (const video of allVideos) {
    const videoUnits = video.aspectRatio === 'horizontal' ? 3 : 1;
    
    // If adding this video would exceed the row capacity, start a new row
    if (currentRowUnits + videoUnits > unitsPerRow && currentRow.length > 0) {
      rows.push([...currentRow]);
      currentRow = [];
      currentRowUnits = 0;
    }
    
    // Add video to current row
    currentRow.push(video);
    currentRowUnits += videoUnits;
    
    // If row is full, start a new row
    if (currentRowUnits === unitsPerRow) {
      rows.push([...currentRow]);
      currentRow = [];
      currentRowUnits = 0;
    }
  }
  
  // Add any remaining videos in the last row
  if (currentRow.length > 0) {
    rows.push([...currentRow]);
  }
  
  return rows;
}

/**
 * Optimize grid arrangement by trying different combinations
 * to minimize wasted space
 */
export function optimizeGrid(videoData, containerWidth = 1200, baseUnitSize = 113) {
  const unitsPerRow = Math.floor(containerWidth / baseUnitSize);
  
  // Separate videos by aspect ratio
  const horizontalVideos = videoData.filter(video => video.aspectRatio === 'horizontal');
  const verticalVideos = videoData.filter(video => video.aspectRatio === 'vertical');
  
  let bestArrangement = [];
  let minWastedSpace = Infinity;
  
  // Try different combinations of horizontal and vertical videos
  for (let h = 0; h <= Math.min(horizontalVideos.length, Math.floor(unitsPerRow / 3)); h++) {
    const remainingUnits = unitsPerRow - (h * 3);
    const v = Math.min(verticalVideos.length, remainingUnits);
    
    if (h * 3 + v <= unitsPerRow) {
      const wastedSpace = unitsPerRow - (h * 3 + v);
      
      if (wastedSpace < minWastedSpace) {
        minWastedSpace = wastedSpace;
        bestArrangement = [
          ...horizontalVideos.slice(0, h),
          ...verticalVideos.slice(0, v)
        ];
      }
    }
  }
  
  return bestArrangement;
}

/**
 * Create responsive grid with fixed thumbnail sizes
 * Finds optimal combination to fill available width
 */
export function createResponsiveGrid(videoData, containerWidth) {
  // Fixed sizes with proper aspect ratios
  const THUMBNAIL_HEIGHT = 200; // px - preserve height as requested
  const HORIZONTAL_WIDTH = Math.round(THUMBNAIL_HEIGHT * (16/9)); // 16:9 aspect ratio = ~356px
  const VERTICAL_WIDTH = Math.round((HORIZONTAL_WIDTH - 2 * 10) / 3); // 3:1 ratio with gaps = ~112px
  const GAP = 10;              // px
  
  console.log(`Container width: ${containerWidth}px`);
  console.log(`Horizontal width: ${HORIZONTAL_WIDTH}px, Vertical width: ${VERTICAL_WIDTH}px`);
  
  const rows = [];
  let remainingVideos = [...videoData];
  
  while (remainingVideos.length > 0) {
    const row = [];
    let currentRowWidth = 0;
    
    // Try to fill the row to maximum capacity
    for (let i = remainingVideos.length - 1; i >= 0; i--) {
      const video = remainingVideos[i];
      const videoWidth = video.aspectRatio === 'horizontal' ? HORIZONTAL_WIDTH : VERTICAL_WIDTH;
      const gapWidth = row.length > 0 ? GAP : 0;
      const totalItemWidth = videoWidth + gapWidth;
      
      // Check if this video fits in the current row
      if (currentRowWidth + totalItemWidth <= containerWidth) {
        row.unshift(video); // Add to beginning to maintain order
        currentRowWidth += totalItemWidth;
        remainingVideos.splice(i, 1);
        console.log(`Added ${video.aspectRatio} video. Row width: ${currentRowWidth}px`);
      }
    }
    
    // If we couldn't fit any video, force add the first one
    if (row.length === 0) {
      row.push(remainingVideos.shift());
    }
    
    rows.push(row);
    console.log(`Row ${rows.length}: ${row.length} videos, width: ${currentRowWidth}px`);
  }
  
  return rows;
}

