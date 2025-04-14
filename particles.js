function initParticles(season) {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
  
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  
    const particles = [];
  
    const numParticles = season === 'summer' ? 20 : 40;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 4 + 2,
        d: Math.random() * numParticles,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        rotate: Math.random() * 360,
      });
    }
  
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.8;
  
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotate * Math.PI) / 180);
  
        if (season === 'spring') {
          ctx.fillStyle = '#f9a8d4'; // sakura pink
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r, p.r * 1.5, Math.PI / 4, 0, 2 * Math.PI);
        } else if (season === 'winter') {
          ctx.fillStyle = '#ffffff'; // snowflake
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, 2 * Math.PI);
        } else if (season === 'autumn') {
          ctx.fillStyle = ['#d97706', '#a16207', '#92400e'][i % 3]; // orange-brown leaf colors
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r, p.r * 0.6, Math.PI / 6, 0, 2 * Math.PI); // leaf shape
        } else if (season === 'summer') {
          ctx.fillStyle = 'rgba(255, 204, 0,' + p.opacity + ')'; // glowing sun specks
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.8, 0, 2 * Math.PI);
        }
  
        ctx.fill();
        ctx.restore();
      }
  
      update();
      requestAnimationFrame(draw);
    }
  
    let angle = 0;
    function update() {
      angle += 0.01;
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.y += Math.cos(angle + p.d) + p.speed;
        p.x += Math.sin(angle) * 0.5;
  
        // Slight rotation for leaves
        if (season === 'autumn') p.rotate += 0.5;
  
        if (p.y > height || p.x > width || p.x < 0) {
          p.y = -10;
          p.x = Math.random() * width;
          p.rotate = Math.random() * 360;
        }
      }
    }
  
    draw();
  }
  