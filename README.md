# The Celestern Times
**AI-Powered Modern News Platform**

## Overview
The Celestern Times is a modern, AI-integrated digital news platform built to deliver a seamless and efficient content management experience. It combines automated moderation, scalable architecture, and clean design for both readers and editorial teams.

This system is designed with security, scalability, and maintainability in mind — using a modular full-stack architecture that integrates modern web technologies with AI-assisted content workflows.

## Features
- AI-Assisted Content Management – Automated moderation and headline generation support.
- Role-Based Access Control (RBAC) – Secure, tiered permission system for admins, editors, and writers.
- Google OAuth Integration – Simplified and secure user authentication.
- AdSense Integration – Monetization-ready advertising setup.
- RESTful API Architecture – Consistent, versioned API design for all services.
- PostgreSQL Data Layer – Optimized relational database for structured content and analytics.
- Dynamic Content Caching – Improved load speed through caching strategy and CDN configuration.
- Activity Monitoring – IP-based tracking and admin-side audit trail.

## Tech Stack
**Frontend:**
- React.js  
- Tailwind CSS  
- Vite  

**Backend:**
- Laravel 12 (PHP 8+)  
- RESTful API Design  
- PostgreSQL  

**Infrastructure:**
- Nginx  
- Docker  
- Cloud Deployment (Platform-agnostic configuration)  

## System Architecture
The system follows a client-server architecture with modular service boundaries.  
- Frontend (React.js) communicates via secure REST API endpoints.  
- Backend (Laravel) manages authentication, content logic, and data transactions.  
- Database (PostgreSQL) enforces relational integrity and query optimization.  
- Reverse Proxy (Nginx) handles routing and SSL termination.

## Security Practices
- Implemented CSRF protection, XSS sanitization, and input validation across endpoints.  
- API endpoints protected with JWT-based authentication and role middleware.  
- Passwords stored using bcrypt hashing with unique salts.  
- Rate limiting applied to prevent brute force and DoS attacks.  
- Environment configuration secured via `.env` (excluded from version control).
