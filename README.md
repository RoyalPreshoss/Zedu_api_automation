
![CI Pipeline](https://github.com/RoyalPreshoss/Zedu_api_automation/actions/workflows/ci.yml/badge.svg)
## Zedu API Automation Suite

## Project Overview

This project is a specialized API automation framework built to validate the Zedu Platform's backend services. The suite focuses on end-to-end testing of user lifecycles, ensuring that registration, authentication, and security protocols meet industry standards and the provided Swagger documentation.

## Tech Stack

•	Framework: Jest (Testing Engine)
•	HTTP Client: Axios (API Communication)
•	Environment Management: Dotenv (Secure Configuration)
•	CI/CD: GitHub Actions (Automated Workflows)
•	Language: JavaScript (Node.js)
________________________________________
## Architecture & Best Practices

The framework is designed with modularization and security at its core:
•	Test Isolation: Each module (auth, register, users, security) is decoupled to ensure targeted testing.
•	Utility Helpers: A centralized auth.js utility handles token generation to reduce code duplication.
•	Security: Sensitive credentials are never hardcoded. The suite utilizes .env files locally and GitHub Secrets in the CI/CD pipeline.
•	Sequential Execution: Uses --runInBand to prevent race conditions during session-dependent tests (e.g., logout/login).
________________________________________
## Project Structure

```text
├── .github/workflows/  # CI/CD pipeline configuration
├── tests/              # Test suites organized by module
│   ├── auth.test.js    # Login & Authentication logic
│   ├── register.test.js# User onboarding & Validation
│   ├── users.test.js   # Profile management & Session tests
│   └── security.test.js# Authorization & Negative scenarios
├── utils/              # Global helper functions
├── .env.example        # Template for environment variables
└── package.json        # Dependencies and test scripts
________________________________________
Setup and Installation.

1. Prerequisites
•	Node.js: v18.x or higher
•	VS Code: (Recommended IDE)

2. Installation
Bash
# Clone the repository
git clone https://github.com/RoyalPreshoss/Zedu_api_automation.git

# Navigate to directory
cd Zedu_api_automation

# Install dependencies
npm install

3. Environment Configuration
Create a .env file in the root directory:
Code snippet
BASE_URL=https://staging.zedu.chat/api/v1
USER_EMAIL=your_email@example.com
USER_PASSWORD=your_password
USER_FIRSTNAME=John
USER_LASTNAME=Doe

4. Running the Suite
Bash
npm test -- --runInBand
________________________________________

QA Audit & Defect Report

The suite executes 17 core test scenarios. While the framework is technically sound, execution against the current API environment has flagged 2 Discovered Defects. These failures are intentional markers of discrepancies in the API logic.
Test Summary
•	Total Scenarios: 17
•	Passed: 15
•	Identified Bugs: 2

Defect Log

Test ID	Scenario	                   Severity	              Observed Behavior
TSC-004	Duplicate Registration	       High	                  The API returns 201 Created when registering an already existing email.
TSC-021	Case Sensitivity	           Medium	              Login returns 400 Bad Request if the email is provided in UPPERCASE.
TSC-013	Status Mismatch	               Low	                  The API consistently returns 400 for validation errors where 422 or 401 is expected.
________________________________________

CI/CD Implementation

The project is integrated with GitHub Actions. Every push to the main branch triggers an automated test run, ensuring continuous validation of the API's health.

