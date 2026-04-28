# Zedu API Automation Testing

Project Description
​This project is an automated test suite designed to verify the core functionalities of the Zedu API. It covers user registration, secure authentication, and profile management using Jest and Axios.

Tech Stack
- Framework: Jest
- HTTP Client: Axios
- Environment Management: Dotenv
- Language: JavaScript (Node.js)

 Project Structure
- `tests/`: Contains all test files (Register, Auth, Users, Security).
- `utils/`: Contains the `auth.js` helper for token generation.
- `.env`: Environment variables for sensitive data (not tracked in Git).
- `.env.example`: Template for setting up environment variables.

 Setup and Installation

1. Prerequisites
Ensure you have the following installed:
* Node.js (v14 or higher)
* Node.js

2. Clone the repository:
   
   git clone (https://github.com/RoyalPreshoss/Zedu_api_automation)
   cd Zedu_api_automation

3. Install the Dependencies
Run the following command to install Jest, Axios and Dotenv
    npm install

4. Environment Configuration

​The project uses a .env file to manage sensitive data. 
​Create a new file named .env in the root folder. 
​Copy the following variables and provide your actual testing credentials: 

BASE_URL=https://staging.zedu.com/api/v1
USER_EMAIL=your_registered_email@example.com
USER_PASSWORD=your_secure_password
USER_FIRSTNAME=John
USER_LASTNAME=Doe
USER_PHONE=08031234567

5. Running the Tests
​To execute all 20 test cases in the correct order (preventing session conflicts), use:
    npm test -- --runInBand