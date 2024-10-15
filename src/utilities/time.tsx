export function formatSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    // Pad the seconds with a leading zero if needed
    const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${minutes}:${paddedSeconds}`;
  }

  export function formatSeconds_letter(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    // Pad the seconds with a leading zero if needed
    const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${minutes > 0 ? `${minutes}min` : ''}${minutes >0 && remainingSeconds> 0? ' e ':''}${remainingSeconds === 0 ? '': `${remainingSeconds}sec`}`;
  }