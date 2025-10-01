# Airbnb MERN Clone

A full-stack web application inspired by Airbnb, built with the MERN stack (MongoDB, Express.js, React, and Node.js). This project demonstrates how to create a modern booking platform where users can browse listings, make reservations, and manage their stays.

## Features

- **User Authentication:** Sign up, log in, and secure sessions.
- **Property Listings:** View, filter, and search properties.
- **Booking System:** Reserve properties and manage bookings.
- **Profile Management:** Edit user information and view booking history.
- **Host Dashboard:** Add new listings, manage properties and reservations.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Image Uploads:** Add photos to listings with cloud storage integration.

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Cloud Storage:** (e.g., Cloudinary or AWS S3)
- **Deployment:** (e.g., Vercel, Render, Netlify)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB (local or cloud instance)
- Cloud storage account (optional for image uploads)

### Installation

```bash
git clone https://github.com/Sricharan106/Airbnb-MERN-Clone.git
cd Airbnb-MERN-Clone
npm install
```

### Environment Variables

Create a `.env` file in the root and provide the following:

```
MONGO_URl=your_mongodb_url
MAP_TOKEN=your_mpabox_token (if using mapbox)
CLOUDINARY_URL=your_cloudinary_url (if using Cloudinary)
```

### Running the App

#### Start Backend

```bash
npm run server
or
node app.js
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or suggestions.


## Contact

- **Author:** Sricharan106
- [GitHub Issues](https://github.com/Sricharan106/Airbnb-MERN-Clone/issues)
