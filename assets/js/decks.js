// Card Decks and Mini-Games Data
// This file contains all the data for the card decks and mini-games

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
        switchDeck("professional");
      },
      rightResult: function () {
        switchDeck("personal");
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
        switchDeck("work");
      },
      rightResult: function () {
        switchDeck("education");
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
        switchDeck("projects");
      },
      rightResult: function () {
        showMiniGame("personalValues");
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
        addSkill("Leadership");
        increaseStats(1, 2, 1);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        addSkill("CI/CD");
        increaseStats(1, 1, 0);
        showMiniGame("deploymentChallenge");
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
        addSkill("React");
        increaseStats(1, 1, 0);
        // Don't manipulate the index here - it's now handled in handleLeftChoice
      },
      rightResult: function () {
        addSkill("UX Design");
        increaseStats(1, 1, 1);
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
        addSkill("MongoDB");
        increaseStats(1, 1, 0);
        // Don't manipulate the index here - it's now handled in handleLeftChoice
      },
      rightResult: function () {
        addSkill("Node.js");
        increaseStats(1, 1, 0);
        showMiniGame("apiChallenge");
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
        addSkill("Microservices");
        increaseStats(1, 0, 1);
        showNotification("Achievement unlocked: System Architect!");
        // Just directly switch to main deck
        switchDeck("main");
      },
      rightResult: function () {
        switchDeck("main");
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
        addSkill("Algorithms");
        increaseStats(1, 0, 0);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        addSkill("Software Design");
        increaseStats(1, 1, 0);
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
        addSkill("AWS");
        increaseStats(1, 0, 1);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        addSkill("TensorFlow");
        increaseStats(1, 0, 0);
        // Use the skillAssessment minigame for ML challenge
        showMiniGame("skillAssessment");
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
        increaseStats(0, 1, 1);
        showNotification("Achievement unlocked: Cloud Expert!");
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        addSkill("GCP");
        increaseStats(1, 0, 0);
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
        addSkill("Distributed Systems");
        increaseStats(1, 0, 1);
        // Just directly switch to main deck
        switchDeck("main");
      },
      rightResult: function () {
        switchDeck("main");
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
        addSkill("Full-Stack");
        increaseStats(1, 0, 0);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        addSkill("UI/UX");
        increaseStats(1, 0, 1);
        showMiniGame("ecommerceFeature");
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
        addSkill("Data Viz");
        increaseStats(1, 0, 0);
        // No setTimeout needed - next card is handled automatically
      },
      rightResult: function () {
        addSkill("Flutter");
        increaseStats(1, 0, 0);
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
        addSkill("Python");
        increaseStats(1, 0, 0);
        // Use the ecommerceFeature minigame as a substitute for AI challenge
        showMiniGame("ecommerceFeature");
      },
      rightResult: function () {
        addSkill("Product Design");
        increaseStats(1, 0, 1);
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
        addSkill("Open Source");
        increaseStats(1, 0, 1);
        showNotification("Achievement unlocked: Community Contributor!");
        // We manually switch to main deck - disable automatic next card creation
        document
          .querySelectorAll(".card")
          .forEach((c) => c.classList.add("temp-card"));
        // Switch to main deck after showing achievement
        setTimeout(() => {
          switchDeck("main");
        }, 2000);
      },
      rightResult: function () {
        switchDeck("main");
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
          showNotification("Good choice! You minimized downtime.");
          increaseStats(0, 1, 1);
        },
      },
      {
        text: "Debug in production",
        result: function () {
          showNotification("Risky move that extended downtime.");
          increaseStats(1, 0, 0);
        },
      },
      {
        text: "Check CI/CD logs",
        result: function () {
          showNotification("Methodical approach! Issue identified.");
          increaseStats(1, 1, 0);
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
          showNotification("Great solution! Response time improved by 70%");
          increaseStats(1, 1, 1);
        },
      },
      {
        text: "Add more servers",
        result: function () {
          showNotification("Works but costly. Consider optimization too.");
          increaseStats(0, 1, 0);
        },
      },
      {
        text: "Optimize queries",
        result: function () {
          showNotification("Good start! Database load reduced.");
          increaseStats(1, 0, 0);
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
          showNotification("Perfect approach! You got the job!");
          increaseStats(1, 1, 1);
          addSkill("Problem Solving");
        },
      },
      {
        text: "Code immediately",
        result: function () {
          showNotification("Too rushed! Missed some edge cases.");
          increaseStats(1, 0, 0);
        },
      },
      {
        text: "Ask clarifying Qs",
        result: function () {
          showNotification("Good start! Shows thoroughness.");
          increaseStats(1, 0, 0);
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
          showNotification("Perfect for real-time updates!");
          increaseStats(1, 0, 1);
          addSkill("WebSockets");
        },
      },
      {
        text: "Polling API",
        result: function () {
          showNotification("Works but not very efficient.");
          increaseStats(0, 1, 0);
        },
      },
      {
        text: "Server-sent events",
        result: function () {
          showNotification("Good alternative! One-way comms.");
          increaseStats(1, 0, 0);
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
          showNotification(
            "Michael values creative problem-solving above all!"
          );
          addSkill("Creativity");
          increaseStats(1, 0, 1);
          // Show personal card immediately
          showPersonalCard("creativity");
        },
      },
      {
        text: "Teamwork & Collaboration",
        result: function () {
          showNotification("Michael thrives in collaborative environments!");
          addSkill("Teamwork");
          increaseStats(1, 1, 0);
          // Show personal card immediately
          showPersonalCard("teamwork");
        },
      },
      {
        text: "Continuous Learning",
        result: function () {
          showNotification("Michael is dedicated to lifelong learning!");
          addSkill("Learning");
          increaseStats(1, 1, 1);
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
      showNotification("Michael's creativity shines in both work and hobbies!");
      // Just directly switch to projects deck
      switchDeck("projects");
    },
    rightResult: function () {
      switchDeck("main");
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
      showNotification("Michael has led multiple successful team projects!");
      // Just directly switch to work deck
      switchDeck("work");
    },
    rightResult: function () {
      switchDeck("main");
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
      showNotification("Michael dedicates time every week to learning!");
      // Just directly switch to education deck
      switchDeck("education");
    },
    rightResult: function () {
      switchDeck("main");
    },
  },
};
