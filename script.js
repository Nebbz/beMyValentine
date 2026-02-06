// Get elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContent = document.getElementById('question-content');
const successContent = document.getElementById('success-content');

// Track the number of times "No" is hovered
let noHoverCount = 0;

// Handle "Yes" button click
yesBtn.addEventListener('click', () => {
    questionContent.classList.add('hidden');
    successContent.classList.remove('hidden');
    
    // Add confetti effect
    createConfetti();
});

// Make "No" button run away on hover
noBtn.addEventListener('mouseenter', () => {
    noHoverCount++;
    
    // Get button dimensions and viewport dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    // Calculate safe boundaries (keeping button within viewport)
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;
    
    // Generate random position
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    // Apply new position
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Make the Yes button bigger each time No is avoided
    const currentScale = 1 + (noHoverCount * 0.1);
    yesBtn.style.transform = `scale(${currentScale})`;
    
    // Change No button text to be more pleading
    const messages = [
        'Are you sure?',
        'Really?',
        'Please? 🥺',
        'Think again!',
        'Noooo!',
        'But why? 😢'
    ];
    
    if (noHoverCount <= messages.length) {
        noBtn.textContent = messages[noHoverCount - 1];
    }
});

// Handle "No" button click (if they manage to click it)
noBtn.addEventListener('click', () => {
    alert('Aww, the button is too fast! Maybe try the Yes button instead? 😊');
});

// Create confetti effect
function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd700'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
