// Card Decks and Mini-Games Data
// This file contains all the data for the card decks and mini-games

// These functions will be initialized from script.js
let switchDeckFn;
let showMiniGameFn;
let addSkillFn;
let increaseStatsFn;
let showNotificationFn;

// Initialize the deck functions with references from script.js
export function initDeckFunctions(functions) {
  switchDeckFn = functions.switchDeck;
  showMiniGameFn = functions.showMiniGame;
  addSkillFn = functions.addSkill;
  increaseStatsFn = functions.increaseStats;
  showNotificationFn = functions.showNotification;
}

// Card data
export const cardDecks = {
  main: [
    {
      type: "main",
      title: "Choose Your Path",
      text: 'You stand at the crossroads of possibility. The Keeper of Records gestures to two glowing decks of cards. "Professional or Personal? Which aspect of Michael\'s journey interests you most?"',
      icon: "🧭",
      imagePath: 'assets/img/professional/office-equipment.png',
      leftChoice: "Professional Path",
      rightChoice: "Personal Path",
      leftResult: function () {
        switchDeckFn("professional");
      },
      rightResult: function () {
        switchDeckFn("personal");
      },
    },
  ],

  professional: [
    {
      type: "main",
      title: "Professional Focus",
      text: 'The Keeper nods approvingly. "A wise choice. Michael\'s professional journey is rich with experience. Which area would you like to explore first?"',
      icon: "💼",
      imagePath: 'assets/img/professional/developer.png',
      leftChoice: "Work Experience",
      rightChoice: "Education",
      leftResult: function () {
        switchDeckFn("work");
      },
      rightResult: function () {
        switchDeckFn("education");
      },
    },
  ],
  personal: [
    {
      type: "main",
      title: "Personal Journey",
      text: "The Keeper's eyes twinkle. \"Ah, you wish to know the person behind the professional. Michael's personal journey reveals much about their character.\"",
      icon: "🧩",
      imagePath: 'assets/img/personal/creativity.png',
      leftChoice: "Projects & Hobbies",
      rightChoice: "Values & Interests",
      leftResult: function () {
        switchDeckFn("projects");
      },
      rightResult: function () {
        console.log("Values & Interests selected");
        
        // Show the mini-game immediately
        showMiniGameFn("personalValues");
      },
    },
  ],
  work: [
    {
      type: "work",
      title: "Senior Developer",
      text: "Innovation Inc. (2022-Present): Leading a team of 5 developers on a customer-facing web application. Implemented CI/CD pipeline that reduced deployment errors by 40%.",
      icon: "👨‍💻",
      imagePath: "assets/img/professional/leadership.png",
      leftChoice: "Focus on leadership",
      rightChoice: "Focus on tech",
      leftResult: function () {
        addSkillFn("Leadership");
        increaseStatsFn(1, 2, 1);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        console.log("Focus on tech selected - should show deployment challenge");
        addSkillFn("CI/CD");
        increaseStatsFn(1, 1, 0);
        
        // Show the mini-game immediately
        showMiniGameFn("deploymentChallenge");
      },
    },
    {
      type: "work",
      title: "Frontend Engineer",
      text: "WebSolutions (2020-2022): Developed responsive web applications using React and Redux. Optimized rendering performance and implemented advanced UI components.",
      icon: "🖥️",
      imagePath: "assets/img/professional/developer.png",
      leftChoice: "Optimize code",
      rightChoice: "Improve UX",
      leftResult: function () {
        addSkillFn("React");
        increaseStatsFn(1, 1, 0);
        // Don't manipulate the index here - it's now handled in handleLeftChoice
      },
      rightResult: function () {
        addSkillFn("UX Design");
        increaseStatsFn(1, 1, 1);
        // Don't manipulate the index here - it's now handled in handleRightChoice
      },
    },
    {
      type: "work",
      title: "Software Developer",
      text: "Tech Corp. (2018-2020): Built backend services with Node.js and Express. Created RESTful APIs and implemented database solutions with MongoDB.",
      icon: "⚙️",
      imagePath: "assets/img/professional/developer.png",
      leftChoice: "Database focus",
      rightChoice: "API design",
      leftResult: function () {
        addSkillFn("MongoDB");
        increaseStatsFn(1, 1, 0);
        // Don't manipulate the index here - it's now handled in handleLeftChoice
      },
      rightResult: function () {
        console.log("API design selected - should show mini-game");
        addSkillFn("Node.js");
        increaseStatsFn(1, 1, 0);
        
        // Show the mini-game immediately
        showMiniGameFn("apiChallenge");
      },
    },
    {
      type: "work",
      title: "Key Achievement",
      text: "Led the migration from monolithic architecture to microservices, reducing deployment time by 60% and improving system scalability.",
      icon: "🏆",
      imagePath: "assets/img/professional/office-equipment.png",
      leftChoice: "Learn more",
      rightChoice: "Continue journey",
      leftResult: function () {
        addSkillFn("Microservices");
        increaseStatsFn(1, 0, 1);
        showNotificationFn("Achievement unlocked: System Architect!");
        // Just directly switch to main deck
        switchDeckFn("main");
      },
      rightResult: function () {
        switchDeckFn("main");
      },
    },
  ],

  education: [
    {
      type: "education",
      title: "Computer Science Degree",
      text: "B.S. in Computer Science (2014-2018): Specialized in software engineering and distributed systems. Graduated with honors.",
      icon: "🎓",
      imagePath: "assets/img/education/university.png",
      leftChoice: "Focus on theory",
      rightChoice: "Focus on practice",
      leftResult: function () {
        addSkillFn("Algorithms");
        increaseStatsFn(1, 0, 0);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        addSkillFn("Software Design");
        increaseStatsFn(1, 1, 0);
        // No setTimeout needed - next card is handled automatically
      },
    },
    {
      type: "education",
      title: "Online Learning",
      text: "Continuous self-improvement through specialized courses in web development, cloud architecture, and machine learning on platforms like Coursera and Udemy.",
      icon: "📚",
      imagePath: "assets/img/education/online-learning.png",
      leftChoice: "Deep dive: Cloud",
      rightChoice: "Deep dive: ML",
      leftResult: function () {
        addSkillFn("AWS");
        increaseStatsFn(1, 0, 1);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        console.log("Deep dive: ML selected");
        addSkillFn("TensorFlow");
        increaseStatsFn(1, 0, 0);
        
        // Show the mini-game immediately
        showMiniGameFn("skillAssessment");
      },
    },
    {
      type: "education",
      title: "Professional Certifications",
      text: "AWS Certified Solutions Architect and Google Cloud Professional Cloud Developer certifications, demonstrating expertise in cloud technologies.",
      icon: "📜",
      imagePath: "assets/img/education/certificate.png",
      leftChoice: "Apply knowledge",
      rightChoice: "Learn more",
      leftResult: function () {
        increaseStatsFn(0, 1, 1);
        showNotificationFn("Achievement unlocked: Cloud Expert!");
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        addSkillFn("GCP");
        increaseStatsFn(1, 0, 0);
        // No setTimeout needed - next card is handled automatically
      },
    },
    {
      type: "education",
      title: "Senior Project",
      text: "Developed a distributed system for real-time data processing that could handle 10,000 transactions per second. Project received recognition from faculty.",
      icon: "🔬",
      imagePath: "assets/img/education/learning.png",
      leftChoice: "Technical details",
      rightChoice: "Continue journey",
      leftResult: function () {
        addSkillFn("Distributed Systems");
        increaseStatsFn(1, 0, 1);
        // Just directly switch to main deck
        switchDeckFn("main");
      },
      rightResult: function () {
        switchDeckFn("main");
      },
    },
  ],

  projects: [
    {
      type: "projects",
      title: "E-commerce Platform",
      text: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product search, cart management, and payment processing.",
      icon: "🛒",
      imagePath: "assets/img/projects/ecommerce.png",
      leftChoice: "Technical specs",
      rightChoice: "User features",
      leftResult: function () {
        addSkillFn("Full-Stack");
        increaseStatsFn(1, 0, 0);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        console.log("User features selected");
        addSkillFn("UI/UX");
        increaseStatsFn(1, 0, 1);
        
        // Show the mini-game immediately
        showMiniGameFn("ecommerceFeature");
      },
    },
    {
      type: "projects",
      title: "Fitness App",
      text: "Created a mobile fitness application with Flutter that tracks workouts, provides personalized recommendations, and visualizes progress over time.",
      icon: "💪",
      imagePath: "assets/img/projects/mobile-app.png",
      leftChoice: "Data analysis",
      rightChoice: "UI animations",
      leftResult: function () {
        addSkillFn("Data Viz");
        increaseStatsFn(1, 0, 0);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        addSkillFn("Flutter");
        increaseStatsFn(1, 0, 0);
        // No setTimeout needed - next card is handled automatically
      },
    },
    {
      type: "projects",
      title: "Recipe Generator",
      text: "Developed an AI-powered recipe generator that creates custom recipes based on available ingredients, dietary restrictions, and flavor preferences.",
      icon: "🍳",
      imagePath: "assets/img/projects/ai-project.png",
      leftChoice: "ML algorithm",
      rightChoice: "User testing",
      leftResult: function () {
        console.log("ML algorithm selected");
        addSkillFn("Python");
        increaseStatsFn(1, 0, 0);
        
        // Show the mini-game immediately
        showMiniGameFn("ecommerceFeature");
      },
      rightResult: function () {
        addSkillFn("Product Design");
        increaseStatsFn(1, 0, 1);
        // No setTimeout needed - next card is handled automatically
      },
    },
    {
      type: "projects",
      title: "Open Source",
      text: "Contributed to several open source projects, including a popular JavaScript utility library and a React component framework.",
      icon: "🌐",
      leftChoice: "View contributions",
      rightChoice: "Continue journey",
      leftResult: function () {
        addSkillFn("Open Source");
        increaseStatsFn(1, 0, 1);
        showNotificationFn("Achievement unlocked: Community Contributor!");
        // We manually switch to main deck - disable automatic next card creation
        document
          .querySelectorAll(".card")
          .forEach((c) => c.classList.add("temp-card"));
        // Switch to main deck after showing achievement
        // Keep a small delay so users can see the notification
        setTimeout(() => {
          switchDeckFn("main");
        }, 2000);
      },
      rightResult: function () {
        switchDeckFn("main");
      },
    },
  ],
};

// Mini-games data
export const miniGames = {
  deploymentChallenge: {
    title: "DEPLOYMENT CRISIS",
    description:
      "Production deployment failed minutes before launch. What do you do?",
    options: [
      {
        text: "Rollback immediately",
        result: function () {
          showNotificationFn("Good choice! You minimized downtime.");
          increaseStatsFn(0, 1, 1);
        },
      },
      {
        text: "Debug in production",
        result: function () {
          showNotificationFn("Risky move that extended downtime.");
          increaseStatsFn(1, 0, 0);
        },
      },
      {
        text: "Check CI/CD logs",
        result: function () {
          showNotificationFn("Methodical approach! Issue identified.");
          increaseStatsFn(1, 1, 0);
        },
      },
    ],
  },
  apiChallenge: {
    title: "API DESIGN CHALLENGE",
    description:
      "The API needs to handle 10x more requests. How do you approach this?",
    options: [
      {
        text: "Implement caching",
        result: function () {
          showNotificationFn("Great solution! Response time improved by 70%");
          increaseStatsFn(1, 1, 1);
        },
      },
      {
        text: "Add more servers",
        result: function () {
          showNotificationFn("Works but costly. Consider optimization too.");
          increaseStatsFn(0, 1, 0);
        },
      },
      {
        text: "Optimize queries",
        result: function () {
          showNotificationFn("Good start! Database load reduced.");
          increaseStatsFn(1, 0, 0);
        },
      },
    ],
  },
  skillAssessment: {
    title: "TECHNICAL INTERVIEW",
    description:
      "You're asked to solve a complex algorithm problem during an interview. How do you approach it?",
    options: [
      {
        text: "Think aloud & test",
        result: function () {
          showNotificationFn("Perfect approach! You got the job!");
          increaseStatsFn(1, 1, 1);
          addSkillFn("Problem Solving");
        },
      },
      {
        text: "Code immediately",
        result: function () {
          showNotificationFn("Too rushed! Missed some edge cases.");
          increaseStatsFn(1, 0, 0);
        },
      },
      {
        text: "Ask clarifying Qs",
        result: function () {
          showNotificationFn("Good start! Shows thoroughness.");
          increaseStatsFn(1, 0, 0);
        },
      },
    ],
  },
  ecommerceFeature: {
    title: "FEATURE REQUEST",
    description:
      "Customer wants real-time inventory updates. What's your implementation?",
    options: [
      {
        text: "WebSockets",
        result: function () {
          showNotificationFn("Perfect for real-time updates!");
          increaseStatsFn(1, 0, 1);
          addSkillFn("WebSockets");
        },
      },
      {
        text: "Polling API",
        result: function () {
          showNotificationFn("Works but not very efficient.");
          increaseStatsFn(0, 1, 0);
        },
      },
      {
        text: "Server-sent events",
        result: function () {
          showNotificationFn("Good alternative! One-way comms.");
          increaseStatsFn(1, 0, 0);
        },
      },
    ],
  },
  personalValues: {
    title: "VALUES & INTERESTS",
    description:
      "What aspect of Michael's personal approach would you like to explore?",
    options: [
      {
        text: "Creativity & Innovation",
        result: function () {
          showNotificationFn(
            "Michael values creative problem-solving above all!"
          );
          addSkillFn("Creativity");
          increaseStatsFn(1, 0, 1);
          // Show personal card immediately
          showPersonalCard("creativity");
        },
      },
      {
        text: "Teamwork & Collaboration",
        result: function () {
          showNotificationFn("Michael thrives in collaborative environments!");
          addSkillFn("Teamwork");
          increaseStatsFn(1, 1, 0);
          // Show personal card immediately
          showPersonalCard("teamwork");
        },
      },
      {
        text: "Continuous Learning",
        result: function () {
          showNotificationFn("Michael is dedicated to lifelong learning!");
          addSkillFn("Learning");
          increaseStatsFn(1, 1, 1);
          // Show personal card immediately
          showPersonalCard("learning");
        },
      },
    ],
  },
};

// Personal value cards data
export const personalCards = {
  creativity: {
    type: "personal",
    title: "Creative Approach",
    text: "Michael approaches problems with creativity and outside-the-box thinking. He enjoys finding innovative solutions to complex challenges and bringing fresh perspectives to projects.",
    icon: "💡",
    leftChoice: "Learn more",
    rightChoice: "Continue journey",
    leftResult: function () {
      showNotificationFn("Michael's creativity shines in both work and hobbies!");
      // Just directly switch to projects deck
      switchDeckFn("projects");
    },
    rightResult: function () {
      switchDeckFn("main");
    },
  },
  teamwork: {
    type: "personal",
    title: "Collaborative Spirit",
    text: "Michael believes the best results come from diverse teams working together. He values clear communication, mutual respect, and the unique strengths each team member brings to the table.",
    icon: "👥",
    leftChoice: "Learn more",
    rightChoice: "Continue journey",
    leftResult: function () {
      showNotificationFn("Michael has led multiple successful team projects!");
      // Just directly switch to work deck
      switchDeckFn("work");
    },
    rightResult: function () {
      switchDeckFn("main");
    },
  },
  learning: {
    type: "personal",
    title: "Lifelong Learner",
    text: "Michael is constantly expanding his knowledge and skills. Whether through formal education, side projects, or self-directed study, he embraces new challenges and technologies.",
    icon: "📚",
    leftChoice: "Learn more",
    rightChoice: "Continue journey",
    leftResult: function () {
      showNotificationFn("Michael dedicates time every week to learning!");
      // Just directly switch to education deck
      switchDeckFn("education");
    },
    rightResult: function () {
      switchDeckFn("main");
    },
  },
};
