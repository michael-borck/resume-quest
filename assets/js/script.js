// Main Game Script
// Handles UI, DOM interaction, and game logic

// Import modules
import { cardDecks, miniGames, personalCards } from './decks.js';
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

// Card drag handling
function setupCardDragHandlers(card, cardData) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let isClick = false;
    let clickStartTime = 0;
    
    // Debug info - show what card we're on
    console.log(`Setting up handlers for card: ${cardData.title}`);
    console.log(`Current deck: ${gameState.getCurrentDeck()}, Current index: ${gameState.getCurrentCardIndex()}`);
    
    // Add click handlers for the left and right choices
    const leftChoice = card.querySelector('.choice-left');
    const rightChoice = card.querySelector('.choice-right');
    
    // Set up click handlers
    leftChoice.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click event
        console.log(`Left choice clicked on ${cardData.title} in ${gameState.getCurrentDeck()} deck`);
        handleLeftChoice();
    });
    
    rightChoice.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click event
        console.log(`Right choice clicked on ${cardData.title} in ${gameState.getCurrentDeck()} deck`);
        handleRightChoice();
    });
    
    function handleLeftChoice() {
        console.log(`Executing left result for ${cardData.title}`);
        
        // Remove the card immediately without animation
        card.remove();
        
        // Special handling for main card to ensure consistent behavior
        if (gameState.getCurrentDeck() === 'main' && cardData.title === 'Choose Your Path') {
            console.log("Special handling for main card left choice - going to Professional");
            switchDeck('professional');
            gameState.decrementCardsLeft();
            updateStats();
            return;
        }
        
        // Increment the currentCardIndex BEFORE executing the result
        // This is to ensure the next card references work correctly
        if (gameState.getCurrentCardIndex() < cardDecks[gameState.getCurrentDeck()].length - 1) {
            gameState.setCurrentCardIndex(gameState.getCurrentCardIndex() + 1);
            console.log(`Incremented index to ${gameState.getCurrentCardIndex()} before left result`);
        }
        
        // Execute the result function
        cardData.leftResult();
        gameState.decrementCardsLeft();
        updateStats();
        
        // Check if game should end after this move
        if (gameState.shouldEndGame()) {
            showGameOver();
            return;
        }
        
        // Debug after left result
        console.log(`After left result: Deck: ${gameState.getCurrentDeck()}, Index: ${gameState.getCurrentCardIndex()}`);
        
        // If no transition happened in leftResult, create next card
        // Skip if we've marked cards as temp (used for cards that handle their own transitions)
        if (document.querySelectorAll('.card').length === 0 && 
            document.querySelectorAll('.temp-card').length === 0) {
            console.log("No cards found after left result - creating next card");
            if (gameState.getCurrentCardIndex() < cardDecks[gameState.getCurrentDeck()].length) {
                createCard(gameState.getCurrentCardIndex());
            }
        }
    }
    
    function handleRightChoice() {
        console.log(`Executing right result for ${cardData.title}`);
        
        // Remove the card immediately without animation
        card.remove();
        
        // Special handling for main card to ensure consistent behavior
        if (gameState.getCurrentDeck() === 'main' && cardData.title === 'Choose Your Path') {
            console.log("Special handling for main card right choice - going to Personal");
            switchDeck('personal');
            gameState.decrementCardsLeft();
            updateStats();
            return;
        }
        
        // Increment the currentCardIndex BEFORE executing the result
        // This is to ensure the next card references work correctly
        if (gameState.getCurrentCardIndex() < cardDecks[gameState.getCurrentDeck()].length - 1) {
            gameState.setCurrentCardIndex(gameState.getCurrentCardIndex() + 1);
            console.log(`Incremented index to ${gameState.getCurrentCardIndex()} before right result`);
        }
        
        // Execute the result function
        cardData.rightResult();
        gameState.decrementCardsLeft();
        updateStats();
        
        // Check if game should end after this move
        if (gameState.shouldEndGame()) {
            showGameOver();
            return;
        }
        
        // Debug after right result
        console.log(`After right result: Deck: ${gameState.getCurrentDeck()}, Index: ${gameState.getCurrentCardIndex()}`);
        
        // If no transition happened in rightResult, create next card
        // Skip if we've marked cards as temp (used for cards that handle their own transitions)
        if (document.querySelectorAll('.card').length === 0 && 
            document.querySelectorAll('.temp-card').length === 0) {
            console.log("No cards found after right result - creating next card");
            if (gameState.getCurrentCardIndex() < cardDecks[gameState.getCurrentDeck()].length) {
                createCard(gameState.getCurrentCardIndex());
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
  
  // Clear all UI elements that might be persisting
  document.querySelectorAll('.card').forEach(card => card.remove());
  swipeLeft.style.opacity = '0';
  swipeRight.style.opacity = '0';
  
  gameState.setCurrentDeck(deckName);
  gameState.setCurrentCardIndex(0);
  console.log(`Reset currentCardIndex to 0 for new deck`);

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
  const stats = gameState.getFinalStats();
  finalSkills.textContent = stats.skills;
  finalExp.textContent = stats.experience;
  finalAchieve.textContent = stats.achievements;

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
  gameState.setPreviousDeck(gameState.getCurrentDeck());
  
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
          if (gameState.getPreviousDeck()) {
              switchDeck(gameState.getPreviousDeck());
              gameState.setPreviousDeck(null);
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