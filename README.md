React CLI - For creating fast react-project
============================================

The React CLI project for react js developer
The React CLI containes simple command for generating - Sample react project, container file, component
file, Action creator file, reducer file and its very easy to use.


```````
### Note

This project is under development and will update on regular basis. 
If you feel any issue please raise it.
Yours suggestion is more welcome for making this project more useful.

```````

### Usage

```
npm install -g react-cli

<!--type -->

react-cli 

If you want to create sample project and want to play with react 

<!--type -->

init

1. move to sample project - 

   npm install
   npm run local
   open http://localhost:3000

2. Create container component (Higher level component) -  It will create component, Action, Reducer

3. create --file container -f fileName

4. create --file press tab tab : It will show the option for creating the different type of file

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

<!--Under development -->

npm run api



