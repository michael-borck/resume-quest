 // Game state
 const gameState = {
  currentDeck: 'main',
  cardsLeft: 20,
  skills: 0,
  experience: 0,
  achievements: 0,
  skillsInventory: [],
  currentCardIndex: 0,
  previousDeck: null, // Track previous deck for returning from mini-games
};

// Card data
const cardDecks = {
  main: [
       {
        type: 'main',
        title: 'Choose Your Path',
        text: 'You stand at the crossroads of possibility. The Keeper of Records gestures to two glowing decks of cards. "Professional or Personal? Which aspect of Michael\'s journey interests you most?"',
        icon: '🧭',
        leftChoice: 'Professional Path',
        rightChoice: 'Personal Path',
        leftResult: function() { switchDeck('professional'); },
        rightResult: function() { switchDeck('personal'); }
       }
    ],
    
 professional: [
    {
        type: 'main',
        title: 'Professional Focus',
        text: 'The Keeper nods approvingly. "A wise choice. Michael\'s professional journey is rich with experience. Which area would you like to explore first?"',
        icon: '💼',
        leftChoice: 'Work Experience',
        rightChoice: 'Education',
        leftResult: function() { switchDeck('work'); },
        rightResult: function() { switchDeck('education'); }
    }
],
 personal: [
    {
        type: 'main',
        title: 'Personal Journey',
        text: 'The Keeper\'s eyes twinkle. "Ah, you wish to know the person behind the professional. Michael\'s personal journey reveals much about their character."',
        icon: '🧩',
        leftChoice: 'Projects & Hobbies',
        rightChoice: 'Values & Interests',
        leftResult: function() { switchDeck('projects'); },
        rightResult: function() { showMiniGame('personalValues'); }
    }
],
  work: [
      {
          type: 'work',
          title: 'Senior Developer',
          text: 'Innovation Inc. (2022-Present): Leading a team of 5 developers on a customer-facing web application. Implemented CI/CD pipeline that reduced deployment errors by 40%.',
          icon: '👨‍💻',
          leftChoice: 'Focus on leadership',
          rightChoice: 'Focus on tech',
          leftResult: function() {
              addSkill('Leadership');
              increaseStats(1, 2, 1);
              // No setTimeout needed - next card is handled automatically
          },
          rightResult: function() {
              addSkill('CI/CD');
              increaseStats(1, 1, 0);
              showMiniGame('deploymentChallenge');
          }
      },
      {
          type: 'work',
          title: 'Frontend Engineer',
          text: 'WebSolutions (2020-2022): Developed responsive web applications using React and Redux. Optimized rendering performance and implemented advanced UI components.',
          icon: '🖥️',
          leftChoice: 'Optimize code',
          rightChoice: 'Improve UX',
          leftResult: function() {
              addSkill('React');
              increaseStats(1, 1, 0);
              // Don't manipulate the index here - it's now handled in handleLeftChoice
          },
          rightResult: function() {
              addSkill('UX Design');
              increaseStats(1, 1, 1);
              // Don't manipulate the index here - it's now handled in handleRightChoice
          }
      },
      {
          type: 'work',
          title: 'Software Developer',
          text: 'Tech Corp. (2018-2020): Built backend services with Node.js and Express. Created RESTful APIs and implemented database solutions with MongoDB.',
          icon: '⚙️',
          leftChoice: 'Database focus',
          rightChoice: 'API design',
          leftResult: function() {
              addSkill('MongoDB');
              increaseStats(1, 1, 0);
              // Don't manipulate the index here - it's now handled in handleLeftChoice
          },
          rightResult: function() {
              addSkill('Node.js');
              increaseStats(1, 1, 0);
              showMiniGame('apiChallenge');
          }
      },
      {
          type: 'work',
          title: 'Key Achievement',
          text: 'Led the migration from monolithic architecture to microservices, reducing deployment time by 60% and improving system scalability.',
          icon: '🏆',
          leftChoice: 'Learn more',
          rightChoice: 'Continue journey',
          leftResult: function() {
              addSkill('Microservices');
              increaseStats(1, 0, 1);
              showNotification('Achievement unlocked: System Architect!');
              // Just directly switch to main deck
              switchDeck('main');
          },
          rightResult: function() {
              switchDeck('main');
          }
      }
  ],

  education: [
      {
          type: 'education',
          title: 'Computer Science Degree',
          text: 'B.S. in Computer Science (2014-2018): Specialized in software engineering and distributed systems. Graduated with honors.',
          icon: '🎓',
          leftChoice: 'Focus on theory',
          rightChoice: 'Focus on practice',
          leftResult: function() {
              addSkill('Algorithms');
              increaseStats(1, 0, 0);
              // No setTimeout needed - next card is handled automatically
          },
          rightResult: function() {
              addSkill('Software Design');
              increaseStats(1, 1, 0);
              // No setTimeout needed - next card is handled automatically
          }
      },
      {
          type: 'education',
          title: 'Online Learning',
          text: 'Continuous self-improvement through specialized courses in web development, cloud architecture, and machine learning on platforms like Coursera and Udemy.',
          icon: '📚',
          leftChoice: 'Deep dive: Cloud',
          rightChoice: 'Deep dive: ML',
          leftResult: function() {
              addSkill('AWS');
              increaseStats(1, 0, 1);
              // No setTimeout needed - next card is handled automatically
          },
          rightResult: function() {
              addSkill('TensorFlow');
              increaseStats(1, 0, 0);
              // Use the skillAssessment minigame for ML challenge 
              showMiniGame('skillAssessment');
          }
      },
      {
          type: 'education',
          title: 'Professional Certifications',
          text: 'AWS Certified Solutions Architect and Google Cloud Professional Cloud Developer certifications, demonstrating expertise in cloud technologies.',
          icon: '📜',
          leftChoice: 'Apply knowledge',
          rightChoice: 'Learn more',
          leftResult: function() {
              increaseStats(0, 1, 1);
              showNotification('Achievement unlocked: Cloud Expert!');
              // No setTimeout needed - next card is handled automatically
          },
          rightResult: function() {
              addSkill('GCP');
              increaseStats(1, 0, 0);
              // No setTimeout needed - next card is handled automatically
          }
      },
      {
          type: 'education',
          title: 'Senior Project',
          text: 'Developed a distributed system for real-time data processing that could handle 10,000 transactions per second. Project received recognition from faculty.',
          icon: '🔬',
          leftChoice: 'Technical details',
          rightChoice: 'Continue journey',
          leftResult: function() {
              addSkill('Distributed Systems');
              increaseStats(1, 0, 1);
              // Just directly switch to main deck
              switchDeck('main');
          },
          rightResult: function() {
              switchDeck('main');
          }
      }
  ],

  projects: [
      {
          type: 'projects',
          title: 'E-commerce Platform',
          text: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product search, cart management, and payment processing.',
          icon: '🛒',
          leftChoice: 'Technical specs',
          rightChoice: 'User features',
          leftResult: function() {
              addSkill('Full-Stack');
              increaseStats(1, 0, 0);
              // No setTimeout needed - next card is handled automatically
          },
          rightResult: function() {
              addSkill('UI/UX');
              increaseStats(1, 0, 1);
              showMiniGame('ecommerceFeature');
          }
      },
      {
          type: 'projects',
          title: 'Fitness App',
          text: 'Created a mobile fitness application with Flutter that tracks workouts, provides personalized recommendations, and visualizes progress over time.',
          icon: '💪',
          leftChoice: 'Data analysis',
          rightChoice: 'UI animations',
          leftResult: function() {
              addSkill('Data Viz');
              increaseStats(1, 0, 0);
              // No setTimeout needed - next card is handled automatically
          },
          rightResult: function() {
              addSkill('Flutter');
              increaseStats(1, 0, 0);
              // No setTimeout needed - next card is handled automatically
          }
      },
      {
          type: 'projects',
          title: 'Recipe Generator',
          text: 'Developed an AI-powered recipe generator that creates custom recipes based on available ingredients, dietary restrictions, and flavor preferences.',
          icon: '🍳',
          leftChoice: 'ML algorithm',
          rightChoice: 'User testing',
          leftResult: function() {
              addSkill('Python');
              increaseStats(1, 0, 0);
              // Use the ecommerceFeature minigame as a substitute for AI challenge
              showMiniGame('ecommerceFeature');
          },
          rightResult: function() {
              addSkill('Product Design');
              increaseStats(1, 0, 1);
              // No setTimeout needed - next card is handled automatically
          }
      },
      {
          type: 'projects',
          title: 'Open Source',
          text: 'Contributed to several open source projects, including a popular JavaScript utility library and a React component framework.',
          icon: '🌐',
          leftChoice: 'View contributions',
          rightChoice: 'Continue journey',
          leftResult: function() {
              addSkill('Open Source');
              increaseStats(1, 0, 1);
              showNotification('Achievement unlocked: Community Contributor!');
              // We manually switch to main deck - disable automatic next card creation
              document.querySelectorAll('.card').forEach(c => c.classList.add('temp-card'));
              // Switch to main deck after showing achievement
              setTimeout(() => {
                  switchDeck('main');
              }, 2000);
          },
          rightResult: function() {
              switchDeck('main');
          }
      }
  ]
};

// Mini-games data
const miniGames = {
  deploymentChallenge: {
      title: 'DEPLOYMENT CRISIS',
      description: 'Production deployment failed minutes before launch. What do you do?',
      options: [
          {
              text: 'Rollback immediately',
              result: function() {
                  showNotification('Good choice! You minimized downtime.');
                  increaseStats(0, 1, 1);
              }
          },
          {
              text: 'Debug in production',
              result: function() {
                  showNotification('Risky move that extended downtime.');
                  increaseStats(1, 0, 0);
              }
          },
          {
              text: 'Check CI/CD logs',
              result: function() {
                  showNotification('Methodical approach! Issue identified.');
                  increaseStats(1, 1, 0);
              }
          }
      ]
  },
  apiChallenge: {
      title: 'API DESIGN CHALLENGE',
      description: 'The API needs to handle 10x more requests. How do you approach this?',
      options: [
          {
              text: 'Implement caching',
              result: function() {
                  showNotification('Great solution! Response time improved by 70%');
                  increaseStats(1, 1, 1);
              }
          },
          {
              text: 'Add more servers',
              result: function() {
                  showNotification('Works but costly. Consider optimization too.');
                  increaseStats(0, 1, 0);
              }
          },
          {
              text: 'Optimize queries',
              result: function() {
                  showNotification('Good start! Database load reduced.');
                  increaseStats(1, 0, 0);
              }
          }
      ]
  },
  skillAssessment: {
      title: 'TECHNICAL INTERVIEW',
      description: 'You\'re asked to solve a complex algorithm problem during an interview. How do you approach it?',
      options: [
          {
              text: 'Think aloud & test',
              result: function() {
                  showNotification('Perfect approach! You got the job!');
                  increaseStats(1, 1, 1);
                  addSkill('Problem Solving');
              }
          },
          {
              text: 'Code immediately',
              result: function() {
                  showNotification('Too rushed! Missed some edge cases.');
                  increaseStats(1, 0, 0);
              }
          },
          {
              text: 'Ask clarifying Qs',
              result: function() {
                  showNotification('Good start! Shows thoroughness.');
                  increaseStats(1, 0, 0);
              }
          }
      ]
  },
  ecommerceFeature: {
      title: 'FEATURE REQUEST',
      description: 'Customer wants real-time inventory updates. What\'s your implementation?',
      options: [
          {
              text: 'WebSockets',
              result: function() {
                  showNotification('Perfect for real-time updates!');
                  increaseStats(1, 0, 1);
                  addSkill('WebSockets');
              }
          },
          {
              text: 'Polling API',
              result: function() {
                  showNotification('Works but not very efficient.');
                  increaseStats(0, 1, 0);
              }
          },
          {
              text: 'Server-sent events',
              result: function() {
                  showNotification('Good alternative! One-way comms.');
                  increaseStats(1, 0, 0);
              }
          }
      ]
  },
  personalValues: {
    title: 'VALUES & INTERESTS',
    description: 'What aspect of Michael\'s personal approach would you like to explore?',
    options: [
        {
            text: 'Creativity & Innovation',
            result: function() {
                showNotification('Michael values creative problem-solving above all!');
                addSkill('Creativity');
                increaseStats(1, 0, 1);
                // Show personal card immediately
                showPersonalCard('creativity');
            }
        },
        {
            text: 'Teamwork & Collaboration',
            result: function() {
                showNotification('Michael thrives in collaborative environments!');
                addSkill('Teamwork');
                increaseStats(1, 1, 0);
                // Show personal card immediately
                showPersonalCard('teamwork');
            }
        },
        {
            text: 'Continuous Learning',
            result: function() {
                showNotification('Michael is dedicated to lifelong learning!');
                addSkill('Learning');
                increaseStats(1, 1, 1);
                // Show personal card immediately
                showPersonalCard('learning');
            }
        }
    ]
}

};



// DOM elements
const storyScreen = document.getElementById('storyScreen');
const startBtn = document.getElementById('startBtn');
const cardArea = document.getElementById('cardArea');
const deckName = document.getElementById('deckName');
const currentDeckIcon = document.getElementById('currentDeckIcon');
const cardsLeft = document.getElementById('cardsLeft');
const skillStat = document.getElementById('skillStat');
const expStat = document.getElementById('expStat');
const achieveStat = document.getElementById('achieveStat');
const inventory = document.getElementById('inventory');
const notification = document.getElementById('notification');
const gameOver = document.getElementById('gameOver');
const restartBtn = document.getElementById('restartBtn');
const contactBtn = document.getElementById('contactBtn');
const finalSkills = document.getElementById('finalSkills');
const finalExp = document.getElementById('finalExp');
const finalAchieve = document.getElementById('finalAchieve');
const miniGame = document.getElementById('miniGame');
const gameDescription = document.getElementById('gameDescription');
const gameButtons = document.getElementById('gameButtons');
const swipeLeft = document.getElementById('swipeLeft');
const swipeRight = document.getElementById('swipeRight');

// Initialize game
function initGame() {
  // Start button event listener
  startBtn.addEventListener('click', () => {
      storyScreen.style.opacity = '0';
      // Use CSS transition end event instead of setTimeout
      storyScreen.addEventListener('transitionend', function handler() {
          storyScreen.style.display = 'none';
          createCard(0);
          // Remove the event listener to prevent multiple calls
          storyScreen.removeEventListener('transitionend', handler);
      });
  });

  // Restart button event listener
  restartBtn.addEventListener('click', () => {
      gameOver.classList.remove('show');
      resetGame();
  });

  // Contact button (would typically link to contact info)
  contactBtn.addEventListener('click', () => {
      window.alert('Thank you for reviewing my resume! Please contact me at michael.borck@curtin.edu.au');
  });

  // Update stats display
  updateStats();
}

// Reset game state
function resetGame() {
  gameState.currentDeck = 'main';
  gameState.cardsLeft = 20;
  gameState.skills = 0;
  gameState.experience = 0;
  gameState.achievements = 0;
  gameState.skillsInventory = [];
  gameState.currentCardIndex = 0;
  gameState.previousDeck = null; // Reset previous deck tracking

  // Clear the card area
  cardArea.innerHTML = `
      <div class="swipe-indicator swipe-left" id="swipeLeft">◀</div>
      <div class="swipe-indicator swipe-right" id="swipeRight">▶</div>
  `;

  // Clear inventory
  inventory.innerHTML = '';

  // Update stats display
  updateStats();

  // Create first card
  createCard(0);
}

// Update stats display
function updateStats() {
  skillStat.textContent = gameState.skills;
  expStat.textContent = gameState.experience;
  achieveStat.textContent = gameState.achievements;
  cardsLeft.textContent = `Cards: ${gameState.cardsLeft}`;
}


function setupCardDragHandlers(card, cardData) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let isClick = false;
    let clickStartTime = 0;
    
    // Debug info - show what card we're on
    console.log(`Setting up handlers for card: ${cardData.title}`);
    console.log(`Current deck: ${gameState.currentDeck}, Current index: ${gameState.currentCardIndex}`);
    
    // Add click handlers for the left and right choices
    const leftChoice = card.querySelector('.choice-left');
    const rightChoice = card.querySelector('.choice-right');
    
    // Set up click handlers
    leftChoice.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click event
        console.log(`Left choice clicked on ${cardData.title} in ${gameState.currentDeck} deck`);
        handleLeftChoice();
    });
    
    rightChoice.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click event
        console.log(`Right choice clicked on ${cardData.title} in ${gameState.currentDeck} deck`);
        handleRightChoice();
    });
    
    function handleLeftChoice() {
        console.log(`Executing left result for ${cardData.title}`);
        
        // Remove the card immediately without animation
        card.remove();
        
        // Special handling for main card to ensure consistent behavior
        if (gameState.currentDeck === 'main' && cardData.title === 'Choose Your Path') {
            console.log("Special handling for main card left choice - going to Professional");
            switchDeck('professional');
            gameState.cardsLeft--;
            updateStats();
            return;
        }
        
        // Increment the currentCardIndex BEFORE executing the result
        // This is to ensure the next card references work correctly
        if (gameState.currentCardIndex < cardDecks[gameState.currentDeck].length - 1) {
            gameState.currentCardIndex++;
            console.log(`Incremented index to ${gameState.currentCardIndex} before left result`);
        }
        
        // Execute the result function
        cardData.leftResult();
        gameState.cardsLeft--;
        updateStats();
        
        // Check if game should end after this move
        if (gameState.cardsLeft <= 0 && gameState.currentDeck === 'main') {
            showGameOver();
            return;
        }
        
        // Debug after left result
        console.log(`After left result: Deck: ${gameState.currentDeck}, Index: ${gameState.currentCardIndex}`);
        
        // If no transition happened in leftResult, create next card
        // Skip if we've marked cards as temp (used for cards that handle their own transitions)
        if (document.querySelectorAll('.card').length === 0 && 
            document.querySelectorAll('.temp-card').length === 0) {
            console.log("No cards found after left result - creating next card");
            if (gameState.currentCardIndex < cardDecks[gameState.currentDeck].length) {
                createCard(gameState.currentCardIndex);
            }
        }
    }
    
    function handleRightChoice() {
        console.log(`Executing right result for ${cardData.title}`);
        
        // Remove the card immediately without animation
        card.remove();
        
        // Special handling for main card to ensure consistent behavior
        if (gameState.currentDeck === 'main' && cardData.title === 'Choose Your Path') {
            console.log("Special handling for main card right choice - going to Personal");
            switchDeck('personal');
            gameState.cardsLeft--;
            updateStats();
            return;
        }
        
        // Increment the currentCardIndex BEFORE executing the result
        // This is to ensure the next card references work correctly
        if (gameState.currentCardIndex < cardDecks[gameState.currentDeck].length - 1) {
            gameState.currentCardIndex++;
            console.log(`Incremented index to ${gameState.currentCardIndex} before right result`);
        }
        
        // Execute the result function
        cardData.rightResult();
        gameState.cardsLeft--;
        updateStats();
        
        // Check if game should end after this move
        if (gameState.cardsLeft <= 0 && gameState.currentDeck === 'main') {
            showGameOver();
            return;
        }
        
        // Debug after right result
        console.log(`After right result: Deck: ${gameState.currentDeck}, Index: ${gameState.currentCardIndex}`);
        
        // If no transition happened in rightResult, create next card
        // Skip if we've marked cards as temp (used for cards that handle their own transitions)
        if (document.querySelectorAll('.card').length === 0 && 
            document.querySelectorAll('.temp-card').length === 0) {
            console.log("No cards found after right result - creating next card");
            if (gameState.currentCardIndex < cardDecks[gameState.currentDeck].length) {
                createCard(gameState.currentCardIndex);
            }
        }
    }
    
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        isDragging = true;
        isClick = true;
        clickStartTime = Date.now();
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        card.classList.add('dragging');
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const diffX = currentX - startX;
        
        // If dragged more than 10px, it's not a click
        if (Math.abs(diffX) > 10) {
            isClick = false;
        }
        
        card.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.05}deg)`;
        
        // Show swipe indicators
        if (diffX < -50) {
            swipeLeft.style.opacity = '0.7';
            swipeRight.style.opacity = '0';
        } else if (diffX > 50) {
            swipeRight.style.opacity = '0.7';
            swipeLeft.style.opacity = '0';
        } else {
            swipeLeft.style.opacity = '0';
            swipeRight.style.opacity = '0';
        }
    }
    
    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = currentX - startX;
        const clickDuration = Date.now() - clickStartTime;
        
        // Reset swipe indicators
        swipeLeft.style.opacity = '0';
        swipeRight.style.opacity = '0';
        
        if (diffX < -100) {
            // Swipe left
            handleLeftChoice();
        } else if (diffX > 100) {
            // Swipe right
            handleRightChoice();
        } else {
            // Return to center
            card.style.transform = '';
            card.classList.remove('dragging');
        }
    }
}


// Create a new card
function createCard(index) {
    console.log(`Creating card with index: ${index}`);
    const deck = cardDecks[gameState.currentDeck];
    
    if (!deck) {
        console.error(`Deck "${gameState.currentDeck}" not found!`);
        return;
    }

    // Update the current card index
    gameState.currentCardIndex = index;
    console.log(`Updated current index to: ${gameState.currentCardIndex}`);

    if (index >= deck.length) {
        console.log(`Index ${index} is >= deck.length ${deck.length}`);
        // End of current deck
        if (gameState.currentDeck !== 'main') {
            console.log(`Switching to main deck from ${gameState.currentDeck}`);
            switchDeck('main');
            return;
        } else if (gameState.cardsLeft <= 0) {
            console.log('Game over - no cards left');
            // Game over
            showGameOver();
            return;
        }
    }

    // Update deck info
    updateDeckInfo();

    const cardData = deck[index];
    console.log(`Card data loaded: ${cardData.title}`);
    console.log(`Left choice: ${cardData.leftChoice}, Right choice: ${cardData.rightChoice}`);

    // Create card element
    const card = document.createElement('div');
    card.classList.add('card', cardData.type);

    card.innerHTML = `
        <div class="card-header">${cardData.title}</div>
        <div class="card-content">
            <div class="card-icon">${cardData.icon}</div>
            <div class="card-text">${cardData.text}</div>
            <div class="card-choices">
                <div class="choice-left">${cardData.leftChoice}</div>
                <div class="choice-right">${cardData.rightChoice}</div>
            </div>
        </div>
    `;

    cardArea.appendChild(card);

    // Set up drag handling with the extracted function
    setupCardDragHandlers(card, cardData);
}

// Switch to a different card deck
function switchDeck(deckName) {
  console.log(`Switching deck from ${gameState.currentDeck} to ${deckName}`);
  
  // Check if the deck exists
  if (!cardDecks[deckName]) {
    console.error(`Deck "${deckName}" not found!`);
    showNotification('Error loading deck');
    return;
  }
  
  // Check if the deck has cards
  if (!cardDecks[deckName] || cardDecks[deckName].length === 0) {
    console.error(`Deck "${deckName}" has no cards!`);
    showNotification('Error loading deck');
    return;
  }
  
  // Clear all UI elements that might be persisting
  document.querySelectorAll('.card').forEach(card => card.remove());
  swipeLeft.style.opacity = '0';
  swipeRight.style.opacity = '0';
  
  gameState.currentDeck = deckName;
  gameState.currentCardIndex = 0;
  console.log(`Reset currentCardIndex to 0 for new deck`);

  // Update deck info with the new deck
  updateDeckInfo();
  
  // Create first card from new deck
  console.log(`Creating first card of ${deckName} deck`);
  createCard(0);
}

// Updated function to ensure proper deck name display
function updateDeckInfo() {
  let deckDisplayName;
  let iconClass = 'deck-icon';

  switch(gameState.currentDeck) {
      case 'main':
          deckDisplayName = 'Main Path';
          break;
      case 'professional':
          deckDisplayName = 'Professional Path';
          iconClass += ' work';
          break;
      case 'personal':
          deckDisplayName = 'Personal Path';
          iconClass += ' personal';
          break;
      case 'work':
          deckDisplayName = 'Work Experience';
          iconClass += ' work';
          break;
      case 'education':
          deckDisplayName = 'Education Path';
          iconClass += ' education';
          break;
      case 'projects':
          deckDisplayName = 'Projects & Hobbies';
          iconClass += ' projects';
          break;
      default:
          deckDisplayName = gameState.currentDeck;
          break;
  }

  deckName.textContent = deckDisplayName;
  currentDeckIcon.className = iconClass;
}

// Add a skill to inventory - modified to show only first letter
function addSkill(skillName) {
  // Don't add duplicate skills or show notification if already acquired
  if (gameState.skillsInventory.includes(skillName)) {
      return;
  }

  gameState.skillsInventory.push(skillName);

  const skillItem = document.createElement('div');
  skillItem.classList.add('skill-item');

  // Use just the first letter as the badge content
  skillItem.textContent = skillName.charAt(0);

  // Add a title attribute to show the full skill name on hover
  skillItem.title = skillName;

  inventory.appendChild(skillItem);

  showNotification(`Skill unlocked: ${skillName}!`);
}

// Increase stats
function increaseStats(skillInc, expInc, achieveInc) {
  gameState.skills += skillInc;
  gameState.experience += expInc;
  gameState.achievements += achieveInc;
  updateStats();
}

// Show notification
function showNotification(message) {
  // Clear any existing notification timeout
  if (window.notificationTimeout) {
    clearTimeout(window.notificationTimeout);
  }
  
  notification.textContent = message;
  notification.classList.add('show');

  // Store the timeout ID so we can cancel it if needed
  window.notificationTimeout = setTimeout(() => {
      notification.classList.remove('show');
      window.notificationTimeout = null;
  }, 3000);
}

// Show game over screen
function showGameOver() {
  finalSkills.textContent = gameState.skills;
  finalExp.textContent = gameState.experience;
  finalAchieve.textContent = gameState.achievements;

  gameOver.classList.add('show');
}

// Show mini-game
function showMiniGame(gameId) {
  const game = miniGames[gameId];

  if (!game) {
    console.error(`Mini-game "${gameId}" not found!`);
    showNotification('Could not load mini-game');
    return;
  }

  // Save current deck before showing mini-game
  gameState.previousDeck = gameState.currentDeck;
  
  gameDescription.textContent = game.description;
  document.querySelector('.game-title').textContent = game.title;

  // Create game buttons
  gameButtons.innerHTML = '';
  game.options.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('game-btn');
      button.textContent = option.text;

      button.addEventListener('click', () => {
          option.result();
          hideMiniGame();
          
          // Return to previous deck immediately
          if (gameState.previousDeck) {
              switchDeck(gameState.previousDeck);
              gameState.previousDeck = null;
          }
      });

      gameButtons.appendChild(button);
  });

  miniGame.classList.add('show');
}

// Hide mini-game
function hideMiniGame() {
  miniGame.classList.remove('show');
}


// Simplified showPersonalCard function that reuses existing drag handling
function showPersonalCard(valueType) {
    // Define personal value cards
    const personalCards = {
        creativity: {
            type: 'personal',
            title: 'Creative Approach',
            text: 'Michael approaches problems with creativity and outside-the-box thinking. He enjoys finding innovative solutions to complex challenges and bringing fresh perspectives to projects.',
            icon: '💡',
            leftChoice: 'Learn more',
            rightChoice: 'Continue journey',
            leftResult: function() {
                showNotification('Michael\'s creativity shines in both work and hobbies!');
                // Just directly switch to projects deck
                switchDeck('projects');
            },
            rightResult: function() {
                switchDeck('main');
            }
        },
        teamwork: {
            type: 'personal',
            title: 'Collaborative Spirit',
            text: 'Michael believes the best results come from diverse teams working together. He values clear communication, mutual respect, and the unique strengths each team member brings to the table.',
            icon: '👥',
            leftChoice: 'Learn more',
            rightChoice: 'Continue journey',
            leftResult: function() {
                showNotification('Michael has led multiple successful team projects!');
                // Just directly switch to work deck
                switchDeck('work');
            },
            rightResult: function() {
                switchDeck('main');
            }
        },
        learning: {
            type: 'personal',
            title: 'Lifelong Learner',
            text: 'Michael is constantly expanding his knowledge and skills. Whether through formal education, side projects, or self-directed study, he embraces new challenges and technologies.',
            icon: '📚',
            leftChoice: 'Learn more',
            rightChoice: 'Continue journey',
            leftResult: function() {
                showNotification('Michael dedicates time every week to learning!');
                // Just directly switch to education deck
                switchDeck('education');
            },
            rightResult: function() {
                switchDeck('main');
            }
        }
    };
    
    // Clear any existing cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.remove());
    
    // This is the key difference - use the createCard function but with a custom card
    const cardData = personalCards[valueType];
    gameState.currentDeck = 'personal'; // Set the deck type for proper header display
    updateDeckInfo(); // Update the deck info display
    
    // Create the card element just like in createCard but don't add event handlers
    const card = document.createElement('div');
    card.classList.add('card', 'personal');
    
    card.innerHTML = `
        <div class="card-header">${cardData.title}</div>
        <div class="card-content">
            <div class="card-icon">${cardData.icon}</div>
            <div class="card-text">${cardData.text}</div>
            <div class="card-choices">
                <div class="choice-left">${cardData.leftChoice}</div>
                <div class="choice-right">${cardData.rightChoice}</div>
            </div>
        </div>
    `;
    
    cardArea.appendChild(card);
    
    // Set up drag handling by directly using the createCard's approach
    setupCardDragHandlers(card, cardData);
}


// Initialize the game when the page loads
window.onload = initGame;
