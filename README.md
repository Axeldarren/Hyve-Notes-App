# Hyve: Collaborative Study Platform  
Hyve is a centralized platform designed for students to share academic notes, quizzes, and exam materials across cohorts. By fostering collaboration, Hyve aims to improve the efficiency and quality of exam preparation.  

## Table of Contents  
1. [Background](#background)  
2. [Features](#features)  
3. [Tech Stack and Architecture](#tech-stack-and-architecture)  
4. [Setup Instructions](#setup-instructions)  
5. [Roadmap](#roadmap)  

---

## Background  
Students often struggle to find reliable study materials during exam seasons, resorting to informal exchanges that result in scattered and inconsistent resources. Hyve solves this problem by offering a dedicated platform where students can upload, share, and access organized study materials.  

### Key Benefits  
- Centralized repository for academic notes.  
- Gamification features to motivate contributions.  
- Enhanced accessibility and collaboration across cohorts.  

---

## Features  

### User Authentication  
- Secure login and registration using email, Google, or Apple accounts.  

### Notes Module  
- Upload, view, and download academic notes.  
- Search and filter notes by subject, topic, or course name.  
- Save selected notes to personal collections.  

### Gamification  
- Users earn Nectar points for uploading, sharing, and reviewing study materials.  
- Unlock badges as you contribute more to the community.  
- Leaderboards display top contributors, fostering healthy competition.  

---

## Tech Stack and Architecture  

- **Front-End**: React.js, TailwindCSS  
- **Back-End**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: OAuth 2.0 (Google, Apple)  
- **Hosting**: Vercel (Frontend), Heroku (Backend)  
- **Version Control**: GitHub  

### System Architecture:  
- **Client-Server Model**: React-based client connects with an Express.js API.  
- **Database**: MongoDB used for storing user data, notes, and metadata.  
- **Authentication**: Integrated using OAuth for secure login.  

---

## Setup Instructions

### Steps
1. Clone the repository:
   ```
   git clone https://github.com/Axeldarren/Hyve-Notes-App.git
   ```
2. Navigate to the project directory:
   ```
   cd Hyve-Front-End
   ```
4. Install dependencies
   For backend
   ```
   npm i
   ```
   For client
   ```
   npm i --f
   ```
5. Set Up .env File
6. Start the development server
   For backend
   ```
   node index.js
   ```
   For client
   ```
   npm run dev
   ```

## Roadmap
- Implement real-time collaboration for study groups.  
- Add support for multilingual resources.  
- Expand gamification with new badges and rewards.

---

## Acknowledgments  

Hyve is the result of the collaborative efforts of a dedicated and talented team. This project wouldn’t have been possible without their creativity, hard work, and passion for improving the academic experience for students.  

### Core Team  
- **Amanda Georgina Singgih** - Product Manager  
- **Axel Darren Suryanto** - Full Stack Developer  
- **Jeremy Triutomo** - Front-End Developer and UI/UX Designer  
- **Valereyna Jingga Kinantya** - Front-End Developer  
- **I Putu Dharma Puspa** - Front-End Developer

### Inspiration  
Hyve is fueled by the belief that collaborative learning can empower students worldwide and that technology can bridge gaps in access to reliable academic resources.  

---  

Thank you for your support and interest in Hyve! Together, we can make learning smarter, simpler, and more inclusive.  
