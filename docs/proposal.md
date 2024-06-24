# Proposal

## D&D Campaign Companion

### Description
A web application designed to enhance the Dungeons & Dragons experience by providing tools for campaign management, character creation, and session organization.

### Context
D&D players and DMs often struggle to keep track of complex campaign details, character information, and game rules across multiple sessions, leading to unnecessary effort and time expended on managing the details from previous sessions and planning for the next session with less overall time left to play. A combination of these effects often demotivates a lot of players from starting new campaigns and causes potential DMs to view the responsibilities of a DM as daunting and something that only experienced players are able to do. This should not be the case.  
This application aims to act as a companion to the DM by providing an easily accessible store of relevant information to the DM's campaign, such as the characters in a campaign, searching up spells and items currently being used or a quick place to write up session notes while playing.  
All of these features help to lighten the workload on the DM and frees them to spend their time on more creative aspects of their session planning and enable users to play more D&D. The users of this app will be for D&D players and Dungeon Masters of all experience levels.

### Features
- User Character Profiles
- Campaign creation and management 
- Character creation and management  
- Interactive session notes  
- Spell and item lookup using D&D 5e API 

### User Interface 
- Built with React, the front-end will handle user interactions, display campaign information, and communicate with the server-side API. 
- Implements current campaign management views, user character profiles, and spells and items browsing components.

### Architecture  
- Server-Side Application: A Node.js/Express application in the Model-Controller-Service pattern as a RESTful API for the client-side application. Acting as a proxy for D&D API.
- Database: A MongoDB database to store user data, campaign information, and other application-specific data.

### RESTful Routing   
POST /api/users/register - Register a new user
POST /api/users/login - User login

GET /api/campaigns - Get all campaigns (authenticated)
POST /api/campaigns - Create a new campaign (DM only)
GET /api/campaigns/:id - Get a specific campaign
PUT /api/campaigns/:id - Update a campaign (DM only)
DELETE /api/campaigns/:id - Delete a campaign (DM only) 

GET /api/characters - Get all characters for a user
POST /api/characters - Create a new character
GET /api/characters/:id - Get a specific character
PUT /api/characters/:id - Update a character
DELETE /api/characters/:id - Delete a character

### Technologies  
- Bootstrap, JWT, MongoDB, Mongoose, D&D 5e API, React, Node.js, Express, Jest, React Testing Library, GitHub

### Deployment  
- Github Pages