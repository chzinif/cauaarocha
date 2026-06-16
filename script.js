const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

const particles = [];
const particleCount = 150; 
const minSize = 0.5; 
const maxSize = 2.0; 
const minSpeed = 0.5; 
const maxSpeed = 2.0; 

// Função corrigida para aceitar um parâmetro de inicialização da posição Y
function createParticle(initY = false) {
    return {
        x: Math.random() * canvas.width,
        // Se for a inicialização do site, espalha pela tela. Se for reciclagem, nasce acima do topo.
        y: initY ? Math.random() * canvas.height : -5, 
        size: Math.random() * (maxSize - minSize) + minSize,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        opacity: Math.random() * 0.5 + 0.2 
    };
}

// Função de redimensionamento corrigida para preencher o array após o canvas ter tamanho real
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Garante que as partículas sejam geradas apenas quando o canvas tiver as dimensões corretas da tela
    if (particles.length === 0) {
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle(true));
        }
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Executa para definir o tamanho correto antes da animação iniciar

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Move a partícula para baixo
        p.y += p.speed;

        // Se a partícula passar do final da tela, recicla ela no topo de forma correta
        if (p.y > canvas.height) {
            particles[i] = createParticle(false);
        }
    }

    requestAnimationFrame(animate);
}

animate();