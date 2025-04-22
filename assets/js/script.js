// Main Game Script
// Handles UI, DOM interaction, and game logic

// Import modules
import { cardDecks, miniGames, personalCards, initDeckFunctions } from './decks.js';
import { gameState } from './gameState.js';

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
const helpBtn = document.getElementById('helpBtn');
const helpScreen = document.getElementById('helpScreen');
const closeHelpBtn = document.getElementById('closeHelpBtn');

// Initialize game
function initGame() {
  // Initialize deck functions first
  initDeckFunctions({
    switchDeck: switchDeck,
    showMiniGame: showMiniGame,
    addSkill: addSkill,
    increaseStats: increaseStats,
    showNotification: showNotification
  });
  
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
  
  // Help button event listener
  helpBtn.addEventListener('click', () => {
      showHelpScreen();
  });
  
  // Close help button event listener
  closeHelpBtn.addEventListener('click', () => {
      hideHelpScreen();
  });

  // Update stats display
  updateStats();
}

// Reset game state
function resetGame() {
  gameState.reset();

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
  skillStat.textContent = gameState.getSkills();
  expStat.textContent = gameState.getExperience();
  achieveStat.textContent = gameState.getAchievements();
  cardsLeft.textContent = `Cards: ${gameState.getCardsLeft()}`;
}

// Card event handling - unified for clicks and swipes
function setupCardDragHandlers(card, cardData) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let isClick = false;
    let clickStartTime = 0;
    
    // Debug info - show what card we're on
    console.log(`Setting up handlers for card: ${cardData.title}`);
    console.log(`Current deck: ${gameState.getCurrentDeck()}, Current index: ${gameState.getCurrentCardIndex()}`);
    
    // All card choice handling is now done by handleLeftAction and handleRightAction
    
    // Define shared handlers for both click and swipe - simplified to rely on the card's result functions
    function handleLeftAction() {
        console.log(`Left action on ${cardData.title} in ${gameState.getCurrentDeck()} deck`);
        
        // Clean up and remove card
        cleanupEventListeners();
        card.remove();
        
        // Increment index before executing
        if (gameState.getCurrentCardIndex() < cardDecks[gameState.getCurrentDeck()].length - 1) {
            gameState.setCurrentCardIndex(gameState.getCurrentCardIndex() + 1);
        }
        
        // Execute the card's leftResult function - this is where the path is defined
        cardData.leftResult();
        
        // Update game state
        gameState.decrementCardsLeft();
        updateStats();
        
        // Check if game should end
        if (gameState.getCardsLeft() <= 0) {
            showGameOver();
            return;
        }
        
        // If no transition happened, create next card
        if (document.querySelectorAll('.card').length === 0 && 
            document.querySelectorAll('.temp-card').length === 0) {
            if (gameState.getCurrentCardIndex() < cardDecks[gameState.getCurrentDeck()].length) {
                createCard(gameState.getCurrentCardIndex());
            }
        }
    }
    
    function handleRightAction() {
        console.log(`Right action on ${cardData.title} in ${gameState.getCurrentDeck()} deck`);
        
        // Clean up and remove card
        cleanupEventListeners();
        card.remove();
        
        // Increment index before executing
        if (gameState.getCurrentCardIndex() < cardDecks[gameState.getCurrentDeck()].length - 1) {
            gameState.setCurrentCardIndex(gameState.getCurrentCardIndex() + 1);
        }
        
        // Execute the card's rightResult function - this is where the path is defined
        cardData.rightResult();
        
        // Update game state
        gameState.decrementCardsLeft();
        updateStats();
        
        // Check if game should end
        if (gameState.getCardsLeft() <= 0) {
            showGameOver();
            return;
        }
        
        // If no transition happened, create next card
        if (document.querySelectorAll('.card').length === 0 && 
            document.querySelectorAll('.temp-card').length === 0) {
            if (gameState.getCurrentCardIndex() < cardDecks[gameState.getCurrentDeck()].length) {
                createCard(gameState.getCurrentCardIndex());
            }
        }
    }
    
    // Add click handlers for the left and right choices
    const leftChoice = card.querySelector('.choice-left');
    const rightChoice = card.querySelector('.choice-right');
    
    // Set up click handlers using the shared functions
    leftChoice.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click event
        handleLeftAction();
    });
    
    rightChoice.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click event
        handleRightAction();
    });
    
    // Set up drag handlers (which will use the same choice functions)
    // Use these to track event handlers for cleanup
    const moveHandler = (e) => drag(e);
    const endHandler = (e) => endDrag(e);
    
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler, { passive: false });
    
    document.addEventListener('mouseup', endHandler);
    document.addEventListener('touchend', endHandler);
    
    // Function to clean up event listeners when card is removed
    function cleanupEventListeners() {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('touchmove', moveHandler);
        document.removeEventListener('mouseup', endHandler);
        document.removeEventListener('touchend', endHandler);
    }
    
    // Add a custom cleanup event listener
    card.addEventListener('cardCleanup', cleanupEventListeners);
    
    // Simple drag handling functions
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
        
        // Make sure card still exists in DOM before continuing
        if (!document.body.contains(card)) {
            cleanupEventListeners();
            return;
        }
        
        const diffX = currentX - startX;
        
        // Reset swipe indicators
        swipeLeft.style.opacity = '0';
        swipeRight.style.opacity = '0';
        
        if (diffX < -100) {
            // LEFT SWIPE - use the same handler as left button click
            handleLeftAction();
        } else if (diffX > 100) {
            // RIGHT SWIPE - use the same handler as right button click
            handleRightAction();
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
    const deck = cardDecks[gameState.getCurrentDeck()];
    
    if (!deck) {
        console.error(`Deck "${gameState.getCurrentDeck()}" not found!`);
        return;
    }

    // Update the current card index
    gameState.setCurrentCardIndex(index);
    console.log(`Updated current index to: ${gameState.getCurrentCardIndex()}`);

    if (index >= deck.length) {
        console.log(`Index ${index} is >= deck.length ${deck.length}`);
        // End of current deck
        if (gameState.getCurrentDeck() !== 'main') {
            console.log(`Switching to main deck from ${gameState.getCurrentDeck()}`);
            switchDeck('main');
            return;
        } else if (gameState.getCardsLeft() <= 0) {
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

    // Determine image path based on card type and title
    let imagePath = '';
    
    if (cardData.imagePath) {
        // Use the explicit image path if provided
        imagePath = cardData.imagePath;
    } else {
        // Fallback to category-based path
        const folder = gameState.getCurrentDeck();
        const sanitizedTitle = cardData.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        imagePath = `assets/img/${folder}/${sanitizedTitle}.png`;
    }
    
    card.innerHTML = `
        <div class="card-header">${cardData.title}</div>
        <div class="card-content">
            <div class="card-icon">
                <img src="${imagePath}" alt="${cardData.title}" onerror="this.onerror=null; this.src='assets/img/${gameState.getCurrentDeck()}/developer.png';">
            </div>
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
  console.log(`Switching deck from ${gameState.getCurrentDeck()} to ${deckName}`);
  
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
  
  // Clear all UI elements that might be persisting and safely remove event listeners
  document.querySelectorAll('.card').forEach(card => {
    // Create a custom event to trigger cleanup before removal
    const cleanupEvent = new CustomEvent('cardCleanup');
    card.dispatchEvent(cleanupEvent);
    card.remove();
  });
  swipeLeft.style.opacity = '0';
  swipeRight.style.opacity = '0';
  
  gameState.setCurrentDeck(deckName);
  gameState.setCurrentCardIndex(0);
  console.log(`Reset currentCardIndex to 0 for new deck`);

  // Check if game should end before creating a new card
  if (gameState.getCardsLeft() <= 0) {
    console.log('Game over condition reached in switchDeck');
    showGameOver();
    return;
  }

  // Update deck info with the new deck
  updateDeckInfo();
  
  // If help screen is visible, update the highlighted node
  if (helpScreen.classList.contains('show')) {
    updateQuestMapHighlight();
  }
  
  // Create first card from new deck
  console.log(`Creating first card of ${deckName} deck`);
  createCard(0);
}

// Updated function to ensure proper deck name display
function updateDeckInfo() {
  let deckDisplayName;
  let iconClass = 'deck-icon';

  switch(gameState.getCurrentDeck()) {
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
          deckDisplayName = gameState.getCurrentDeck();
          break;
  }

  deckName.textContent = deckDisplayName;
  currentDeckIcon.className = iconClass;
}

// Add a skill to inventory - modified to show only first letter
function addSkill(skillName) {
  // Don't add duplicate skills or show notification if already acquired
  if (gameState.addSkill(skillName)) {
    const skillItem = document.createElement('div');
    skillItem.classList.add('skill-item');

    // Use just the first letter as the badge content
    skillItem.textContent = skillName.charAt(0);

    // Add a title attribute to show the full skill name on hover
    skillItem.title = skillName;

    inventory.appendChild(skillItem);

    showNotification(`Skill unlocked: ${skillName}!`);
  }
}

// Increase stats
function increaseStats(skillInc, expInc, achieveInc) {
  gameState.increaseStats(skillInc, expInc, achieveInc);
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
  console.log('Showing game over screen. Cards left:', gameState.getCardsLeft());
  
  // Set cards left to 0 to ensure no more actions can be taken
  while (gameState.getCardsLeft() > 0) {
    gameState.decrementCardsLeft();
  }
  
  // Make sure we properly clean up any remaining cards
  document.querySelectorAll('.card').forEach(card => {
    const cleanupEvent = new CustomEvent('cardCleanup');
    card.dispatchEvent(cleanupEvent);
    card.remove();
  });
  
  // Close mini-game if open
  hideMiniGame();
  
  // Reset indicators
  swipeLeft.style.opacity = '0';
  swipeRight.style.opacity = '0';
  
  // Update stats display
  const stats = gameState.getFinalStats();
  finalSkills.textContent = stats.skills;
  finalExp.textContent = stats.experience;
  finalAchieve.textContent = stats.achievements;

  // Show game over screen
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

  // Clear any old buttons to prevent duplicate event listeners
  gameButtons.innerHTML = '';
  
  // Make sure to clean up any existing cards to prevent event issues
  document.querySelectorAll('.card').forEach(card => {
    const cleanupEvent = new CustomEvent('cardCleanup');
    card.dispatchEvent(cleanupEvent);
    card.remove();
  });

  // Save current deck before showing mini-game
  gameState.setPreviousDeck(gameState.getCurrentDeck());
  
  gameDescription.textContent = game.description;
  document.querySelector('.game-title').textContent = game.title;
  
  // Add mini-game image if not already present
  const gameImageContainer = document.querySelector('.game-image');
  if (!gameImageContainer) {
    const imageEl = document.createElement('div');
    imageEl.classList.add('game-image');
    imageEl.innerHTML = '<img src="assets/img/mini-game/challenge.png" alt="Mini-Game Challenge">';
    // Insert before the game description directly
    try {
      // First, ensure gameDescription is actually in the DOM and a child of miniGame
      if (document.body.contains(gameDescription) && miniGame.contains(gameDescription)) {
        miniGame.insertBefore(imageEl, gameDescription);
      } else {
        // Fallback: just append to miniGame
        miniGame.appendChild(imageEl);
      }
    } catch (error) {
      console.error("Error inserting game image:", error);
      // Fallback: just append to miniGame
      miniGame.appendChild(imageEl);
    }
  }

  // Create game buttons
  game.options.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('game-btn');
      button.textContent = option.text;

      // Use a single click handler function
      const clickHandler = () => {
          // Remove the event listener first to prevent double-triggers
          button.removeEventListener('click', clickHandler);
          
          // Execute the result and continue
          try {
              option.result();
          } catch (error) {
              console.error('Error in mini-game option result:', error);
          }
          
          hideMiniGame();
          
          // Return to previous deck immediately
          if (gameState.getPreviousDeck()) {
              const prevDeck = gameState.getPreviousDeck();
              gameState.setPreviousDeck(null);
              switchDeck(prevDeck);
          }
      };

      button.addEventListener('click', clickHandler);
      gameButtons.appendChild(button);
  });

  miniGame.classList.add('show');
}

// Hide mini-game
function hideMiniGame() {
  miniGame.classList.remove('show');
}

// Show personal card
function showPersonalCard(valueType) {
    // Clear any existing cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.remove());
    
    // Get the card data
    const cardData = personalCards[valueType];
    gameState.setCurrentDeck('personal'); // Set the deck type for proper header display
    updateDeckInfo(); // Update the deck info display
    
    // Create the card element
    const card = document.createElement('div');
    card.classList.add('card', 'personal');
    
    // Determine image path for personal card
    let imagePath = `assets/img/personal/${valueType}.png`;
    
    card.innerHTML = `
        <div class="card-header">${cardData.title}</div>
        <div class="card-content">
            <div class="card-icon">
                <img src="${imagePath}" alt="${cardData.title}" onerror="this.onerror=null; this.src='assets/img/personal/creativity.png';">
            </div>
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

// Show help screen
function showHelpScreen() {
    // Update current position in quest map
    updateQuestMapHighlight();
    helpScreen.classList.add('show');
}

// Hide help screen
function hideHelpScreen() {
    helpScreen.classList.remove('show');
}

// Update the quest map to highlight the current position
function updateQuestMapHighlight() {
    // Remove current class from all nodes
    document.querySelectorAll('.map-node').forEach(node => {
        node.classList.remove('current');
    });
    
    // Add current class to the node corresponding to the current deck
    const currentDeckNode = document.querySelector(`.map-node.${gameState.getCurrentDeck()}`);
    if (currentDeckNode) {
        currentDeckNode.classList.add('current');
    } else if (gameState.getCurrentDeck() === 'main') {
        // Handle main deck separately (special case)
        document.querySelector('.map-node.main').classList.add('current');
    }
}

// Initialize the game when the page loads
window.onload = initGame;