USP-UI-CLIENT
=====================

The ReactJS project for the Honeywell USP application.
The UI framework here has components build using ReactJS + Redux framework.

### Usage

```
npm install
npm start
open http://localhost:3000
```

### Building the project and creating distributables

Execute the command below and it will generate the updated distributables in the 'dist' directory.
```
webpack --config conf/webpack.config.prod.js
webpack --config conf/webpack.config.onboarding.prod.js
```

### Linting

This boilerplate project includes React-friendly ESLint configuration.

```
npm run lint
```


### Dependencies

* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)

### Resources

### Running the express server for mock apis
npm run api


#### Running the Protractor Test Cases
```
1. npm install
2. Download, update the webdriver-manager. below commands are for updating the webdriver-manager.

```
..........................................................................

# Install Locally

# Install protractor
npm install protractor --save-dev


# Download the selenium standalone server

```
./node_modules/protractor/bin/webdriver-manager update

```
......................................................................

#Install Globally

# Install protractor
npm install protractor -g

# Download the selenium standalone server
```
webdriver-manager update

```
...........................................................................

1. Open usp-ui-client\src\tests\conf.js
2. Update the physical path like -  specs: ['E:\\HoneyWell\\usp-ui-client\\src\\tests\\Integration.js']
   Integration.js - File is exist in usp-ui-client\src\tests
3. Open node.js cmd and navigate to "usp-ui-client" folder   
4. execute command - webdriver-manager start
5. open another instance of node.js cmd  and  navigate to usp-ui-client\src\tests
6. execute command - protractor conf.js
7. Note: make sure your application is running during this test.
8. It should open the browser and will check for toggle in SideBar and Filters selection.


#### Running the Jest Test Cases
```
1. npm install
2. npm test

................................................................................

# Install Locally
npm install --save-dev jest-cli babel-jest react-addons-test-utils

................................................................................

#Install Globally
npm install -g jest-cli babel-jest react-addons-test-utils

................................................................................

#Run test cases for a single file
jest <FileName>

................................................................................

#Code coverage report
Code coverage report will we generated automatically after running the unit test cases.
You can see the code coverage report in html format in the following directory
'coverage/lcov-report/index.html'
