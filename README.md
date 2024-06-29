# Candidate Job Hub Monorepo

Welcome to the **Candidate Job Hub** monorepo. This repository contains the complete codebase for managing candidates and job applications, including both the front-end and back-end components.

## Live URLs

Explore the live versions of the applications, which are deployed on Vercel with continuous integration and continuous deployment (CI/CD) set up to the main branch. This allows for a live preview of the latest changes:

- **Backend API**: [Candidate Management API](https://candidate-management-api.vercel.app/)
- **Frontend App**: [Candidate Management App](https://candidate-job-hub.vercel.app/)

## Directory Structure

This monorepo is divided into two main directories:

1. **candidate-management-api**: The back-end API server built with Node.js, TypeScript, Nodemon, PostgreSQL, Redis for caching, and Sequelize ORM.
2. **candidate-management-app**: The front-end application built with React, Vite, TypeScript, Redux, Redux-saga, and SWC.

## candidate-management-api

This directory contains the source code for the back-end API server. The server is built with Node.js and TypeScript, using Nodemon for development, PostgreSQL as the database, Redis for caching, and Sequelize as the ORM for managing database interactions.

For detailed setup instructions and more information, please refer to the [candidate-management-api README](./candidate-management-api/README.md).

## candidate-management-app

This directory contains the source code for the front-end application. The app is developed using modern technologies like React, Vite, TypeScript, and SWC to ensure a fast, efficient, and scalable client-side experience.

For detailed setup instructions and more information, please refer to the [candidate-management-app README](./candidate-management-app/README.md).

## Getting Started

To get started with the Candidate Job Hub monorepo, clone the repository and follow the setup instructions in the respective `README.md` files of `candidate-management-api` and `candidate-management-app`.

### Clone the Repository

```sh
git clone https://github.com/stevejoels54/candidate-job-hub.git
cd candidate-job-hub
```

### Setting Up

Navigate to the respective directories and follow the setup instructions provided in their `README.md` files:

1. [Set up the back-end API server](./candidate-management-api/README.md)
2. [Set up the front-end application](./candidate-management-app/README.md)

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting any pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Contact

For any questions or issues, please open an issue on GitHub or contact the repository owner.

---

Thank you for checking out Candidate Job Hub!
