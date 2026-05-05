![CI Pipeline](https://github.com/RoyalPreshoss/Zedu_api_automation/actions/workflows/ci.yml/badge.svg)

# Zedu API Automation Suite

## Project Overview
This project is a specialized API automation framework built to validate the Zedu Platform's backend services. The suite focuses on end-to-end testing of user lifecycles, ensuring that registration, authentication, and security protocols meet industry standards.

## Tech Stack
* **Framework:** Jest (Testing Engine)
* **HTTP Client:** Axios (API Communication)
* **Environment Management:** Dotenv (Secure Configuration)
* **CI/CD:** GitHub Actions (Automated Workflows)
* **Language:** JavaScript (Node.js)

---

## Architecture & Best Practices
The framework is designed with modularization and security at its core:
* **Test Isolation:** Each module is decoupled to ensure targeted testing.
* **Utility Helpers:** A centralized `auth.js` utility handles token generation programmatically.
* **Security:** Sensitive credentials use `.env` files locally and GitHub Secrets in CI/CD.
* **Sequential Execution:** Uses `--runInBand` to prevent race conditions during session-dependent tests.

---

## CI/CD Implementation
This project uses **GitHub Actions** to automate the testing lifecycle.
* **Triggers:** The pipeline executes on every `push` and `pull_request` to the main branch.
* **Automated Workflow:** The CI environment automatically installs dependencies, configures the runtime, and executes the full test suite.
* **Build Integrity:** The pipeline is configured to exit with a failure code if any test fails, ensuring unstable code is never merged.

---

## Project Structure
```text
├── .github/workflows/  # CI/CD pipeline configuration
├── tests/              # Test suites organized by module
│   ├── auth.test.js    # Login & Authentication logic
│   ├── register.test.js# User onboarding & Validation
│   ├── users.test.js   # Profile management & Session tests
│   └── security.test.js# Authorization & Negative scenarios
├── utils/              # Global helper functions (Auth utility)
├── .env.example        # Template for environment variables
└── package.json        # Dependencies and test scripts
```

---

## Setup and Installation

### 1. Installation
```bash
# Clone the repository
git clone [https://github.com/RoyalPreshoss/Zedu_api_automation.git](https://github.com/RoyalPreshoss/Zedu_api_automation.git)

# Navigate to directory
cd Zedu_api_automation

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory. This file is mandatory for the suite to execute successfully. Ensure it includes the following variables:

```text
BASE_URL=[https://api.staging.zedu.chat/api/v1](https://api.staging.zedu.chat/api/v1)
USER_EMAIL=your_email@example.com
USER_PASSWORD=your_password
USER_FIRSTNAME=YourFirstName
USER_LASTNAME=YourLastName
USER_PHONE=080XXXXXXXX
USER_USERNAME=your_username
```

### 3. Running the Suite
```bash
npm test -- --runInBand
```

---

## QA Audit & Defect Report
The suite executes core test scenarios. Execution against the current environment has flagged **3 Identified Defects** which serve as markers of API discrepancies.

### Test Summary
* **Total Automated Scenarios:** 17
* **Passed:** 15
* **Identified Bugs:** 3 (2 caught by automation, 1 via status code analysis)

### Defect Log
| Test ID | Scenario | Severity | Observed Behavior |
| :--- | :--- | :--- | :--- |
| **TSC-004** | Duplicate Registration | **High** | API returns `201 Created` for existing emails. |
| **TSC-021** | Case Sensitivity | **Medium** | Login returns `400 Bad Request` if email is UPPERCASE. |
| **TSC-013** | Status Mismatch | **Low** | API returns `400` where `422` or `401` is standard. |

---

## Documentation & Approach
A detailed technical breakdown of the engineering discipline, project methodology, and CI/CD strategy used in this project can be found here:

👉 **[Technical Approach & Project Methodology](https://www.linkedin.com/posts/precious-praise-moses-011b91241_qaengineering-hngtech-automationtesting-share-7457410241358426112-XxtY?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwnM80BgehdJV7xGe3yf4j61QBz3PPyS28)**
```