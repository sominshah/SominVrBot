module.exports = {
msToTime:(ms) =>{
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 7);
    const weeks = Math.floor((ms / (1000 * 60 * 60 * 24 * 7)) % 4.345);
    const months = Math.floor((ms / (1000 * 60 * 60 * 24 * 30.44)) % 12);
    const years = Math.floor(ms / (1000 * 60 * 60 * 24 * 365.25)); // Considering leap years
    
    let timeString = [];
    if (years > 0) timeString.push(`${years}y`);
    if (months > 0) timeString.push(`${months}mo`);
    if (weeks > 0) timeString.push(`${weeks}w`);
    if (days > 0) timeString.push(`${days}d`);
    if (hours > 0) timeString.push(`${hours}h`);
    if (minutes > 0) timeString.push(`${minutes}m`);
    if (seconds > 0 || timeString.length === 0) timeString.push(`${seconds}s`);

    return timeString.join(" ");


}

}

