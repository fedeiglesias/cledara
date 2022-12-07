![Cledara](./frontend/src/assets/logo.svg)

Cledara is the platform to discover, buy and manage all your software subscriptions.

You can read more in [Cledara.com](https://www.cledara.com/)

## What about this project?

This project is a Job Challenge :man_technologist:!


## :dart: Objetive
Create a web application which allows a user to scan a QR code containing a URL (like the ones you can see on restaurants and bars for the menu) using one device and display the URL and page title in a browser running on a different device (can also be a different browser on the same device, doesn't matter as long as they are two separate sessions).
The application must implement at least 2 pages:

1. scanner page: runs on one of the devices. When a user visits the page, they are able to scan a QR barcode with a URL using the camera on the device. When the QR code is found and the URL recognised, it will be added to the list of pages in the other device.
2. summary page: this page will list URLs and titles of all pages that the user has scanned with the other device.

Multiple users can use the application at the same time and each of them should see only the pages they scanned.

List of scanned pages does not need to be persisted between reloads of the summary page.



### :bookmark: Requirements
For the backend we will need to install Serverless Framework and the Java JDK to run a local DynamoDB instance.

1. Serverless Framework `brew install serverless`
2. Java Dev Kit `brew install openjdk@11` 


### :rocket: Install & run!

#### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

#### Backend
1. `cd backend`
2. `npm install`
3. `npm run dev`

