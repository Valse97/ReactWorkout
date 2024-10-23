export function formatSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    // Pad the seconds with a leading zero if needed
    const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${minutes}:${paddedSeconds}`;
  }

  export function formatSeconds_letter(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
  
    // Pad the seconds with a leading zero if needed
    const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${hours > 0 ? `${hours}H` : ''}${hours >0 && remainingMinutes> 0? ' e ':''}${remainingMinutes > 0 ? `${remainingMinutes}min` : ''}${remainingMinutes >0 && remainingSeconds> 0? ' e ':''}${remainingSeconds === 0 ? '': `${remainingSeconds}sec`}`;
  }