# Investors

This is a SPA built using react. The bootstrapping was done using create-react-app. This makes use of the Preqin service, to a display a list of Investors and the Commitment details related to an Investor.

# Routes

`/`

This is the root of the application. This route displays the list of Investors in a tabular format. Clicking on any of the IDs, directs us to the Investors Details page.

`/investor/:investorId`

In this route, given an Investor Id, the user can select an asset class and see a list of commitments made, against the particular Investor Id and the asset class.

`/not-found`

This is the fallback route, the users will be redirected to, if they try to visit a route which is not present on our possible routes. It has a link to take you to the root of the application.

## Components

`InvestorsList`

This component is rendered in the root of the application. It calls an api, when it's mounted, to get the list of investors. It's displayed in a tabular format with columns **FirmId**, **Firm Name**, **Type**, **Date Added**, **Address**. The **FirmId** is a clickable link. It will take you

`InvestorDetails`

This component is used to get the list of Commitments for an Investor, on the basis if an asset class. When you select an asset class, an api is called to get the list of Commitments, corresponding the Investor and Asset class.

## Environment Variables

`REACT_APP_SERVICE_BASE_URL`

This is the base Url of the preqin service, which we are using to power our UI. This is being set on build time.

I have created two environment files. One for development and the other for production.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run test:ci`

This test command is especially for to be run on CI of the app. This can be used as a stage in Jenkins, as a gate to not pass the build, if the test fails.
