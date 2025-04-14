const month = new Date().getMonth();
let season = 'winter';

if (month >= 2 && month <= 4) season = 'spring';
else if (month >= 5 && month <= 7) season = 'summer';
else if (month >= 8 && month <= 10) season = 'autumn';

document.documentElement.classList.add(`season-${season}`);
initParticles(season);
