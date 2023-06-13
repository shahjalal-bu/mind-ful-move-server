# Project Readme

## Mindful Move

![Logo](https://mindfulmove.netlify.app/assets/logo-9bfb98c9.png)

## Project Overview

This project is a server-side implementation of a website for Mindful Move, a Yoga and Meditation Summer Camp for learners. The website provides a platform to engage and educate campers about yoga and meditation practices. The goal is to create a peaceful and immersive experience for campers to learn and practice these ancient disciplines.

## Features

The website offers the following features:

1. **Show Classes**: Campers can browse and view the available yoga and meditation classes offered at the summer camp. They can see class timings, descriptions, and levels of difficulty. This feature allows campers to plan their schedules and choose the classes that interest them.

2. **Show Instructors**: Provides a list of experienced and certified yoga and meditation instructors who will be leading the camp. Campers can explore instructor profiles, including their background, expertise, and teaching styles. This feature helps campers gain insights into the instructors' qualifications and choose the ones they resonate with.

3. **Select Instructor**: Campers have the option to select a preferred instructor when registering for the summer camp. This feature allows campers to personalize their camp experience and learn from the instructor they feel most connected to.

4. **Payment**: Facilitates secure online payment for camp registration fees. Campers can enter their payment details and complete the registration process seamlessly. This feature integrates with the Stripe payment processing platform to ensure a smooth and reliable payment experience.

5. **Firebase Authentication**: Utilizes Firebase Authentication to provide a secure and user-friendly login and registration system for campers. Campers can create accounts, log in, and access personalized features such as class registration, instructor selection, and payment. Firebase Authentication ensures the privacy and security of camper data.

## Used Packages/Technologies

The project utilizes the following packages and technologies:

- **cors** (version 2.8.5): Enables cross-origin resource sharing, allowing the client-side application to make requests to different domains.
- **dotenv** (version 16.0.3): Loads environment variables from a `.env` file, providing a convenient way to manage configuration settings.
- **express** (version 4.18.2): A web application framework for Node.js used to build the server-side of the application.
- **jsonwebtoken** (version 9.0.0): Provides JSON Web Token (JWT) authentication for secure transmission of information between parties.
- **mongodb** (version 5.5.0): A NoSQL database used to store and retrieve data related to campers, classes, instructors, and payments.
- **morgan** (version 1.10.0): An HTTP request logger middleware for Node.js used to log incoming HTTP requests.
- **nodemon** (version 2.0.22): Automatically restarts the server whenever changes are detected in the source code, enhancing the development process.
- **stripe** (version 12.9.0): Integrates the Stripe payment processing platform to facilitate online payments for camp registration fees.
- **Firebase Authentication**: A service provided by Firebase that offers user authentication, allowing campers to create accounts, log in, and access personalized features.

## Live Site

You can access the live site of this project at [Mindful Move](https://mind-ful-move.vercel.app).
