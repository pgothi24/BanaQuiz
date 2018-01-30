# Installation
- Download the quizapp project folder
- cd quizapp/
- npm install
- npm start -> This command will start application in development environment

# Description
Frontend for simple mobile friendly(responsive) quiz 

# Features
- React
- Redux
- React Router v4
- React-bootstrap

# Folder Structure
```
quizapp
 └── src
    ├── actions
    │    └── index.js
    ├── components
    │    ├── About.js
    │    ├── Answer.js       
    │    ├── Contact.js
    │    ├── Footer.js
    │    ├── Home.js
    │    ├── Privacy.js
    │    ├── Question.js
    │    ├── Quiz.js
    │    ├── QuizIntro.js
    │    ├── Result.js
    │    ├── SearchBar.js
    │    ├── Thumbnail.js
    │    ├── ThumbnailList.js
    │    └── ThumbnailMain.js
    ├── images
    │    ├── image_loader.gif
    │    ├── logo.png
    │    ├── scroll.png    
    ├── reducers
    │    ├── index.js
    │    ├── quizData.js
    ├── .babelrc
    ├── App.css
    ├── App.js
    ├── ComicSans.ttf
    ├── index.js
 └── public
    ├── favicon.ico
    ├── index.html
    ├── manifest.json
 └── package.json
 └── README.md
```

# Component Description

### index.js

- Entry point of the application
- Initialization of Redux store
- Renders App Component
We are using Redux for better data management across the application. Redux uses store to save the current application state. We can store/change any variable values in redux store using actions. Actions will call reducers which will store the data in the store. To access the data from store we have to connect the component with store. We have used 'redux' and 'react-redux' library in our application. For more information on redux, you can visit this link: https://redux.js.org/docs/basics/UsageWithReact.html

### App.js

- Responsible for routing in the application using `react-router-dom`
- Route '/' --> Home page
- Route '/quiz/:id' --> Quiz intro page for supplied id
- Route 'quiz/:id/questions' --> Quiz questions page
- Route 'quiz/:id/result' --> Quiz result page
- Route '/about' --> Renders about page
- Route '/privacy' --> Renders privacy page
- Route '/contact' --> Renders contact page

### App.css

- Contains full css code for the while application
- If you want to change/add any css then you can do it here.
- Divided by the components(Check out the comments in this file)
- Added media queries for responsiveness

### components/Home.js

This component will render the logo, application title, search bar and quiz thumbnails. When this page loads, initially loading bar will appear below search bar. Once the thumbnail data is fetched from API, user can scroll the webpage to see available quizes.
This component will load ThumbnailMail.js and SearchBar.js component.

### components/SearchBar.js

Simply loads the static searchbar on the home page. If you want any custom search bar then you need to change in this component.

### components/ThumbnailMain.js

- Get the access token using api and store the token in redux store using setJWTtoken() action.
- Get thumbnail data using the access token and store it in redux store using setThumbnailData() action.
- Once the thumbnail data is available, it will render ThumbnailList.js component

### components/ThumbnailList.js

- Expects two props
  - data: which will contain all the thumbnail data
  - title: Quiz type title to display above each thumbnail list
- Creates the grid(2x2) of thumbnails using React-bootstrap
- For each thumbnails of the grid, renders Thumbnail.js component.
- If number of quizes are more than 4 then 'Load more quizzes' button will appear. Once all the quizzes are displayed, this button will go away.
- State variable `load` will keep track of number of quizzes which are being shown on the page.
- Onclick of 'Load more' button `load` state will be increased by 4. If you want to display more quizes in batch sizes of 2 then increment `load` state by 2 everytime.

### components/Thumbnail.js

- Expects 3 props
 - Quiz Title
 - Quiz Id
 - Quiz Image
- I've wrapped full thumbnail code in `Link` tag to make it clickable. Onclick of any thumnbnail, application will be redirectd to QuizIntro page for the given QuizId.

### components/QuizIntro.js

- Will get the quiz id from the url using `this.props.match.params.id`
- If quiz id and token is available then get the quiz data and store it Redux store using `setQuizData()` action.
- If one of these two are not available then again script will poll the API to get the token and get the thumnbnaildata. Of course again we will store this data in Redux store using perticular actions.(This part of code is same as ThumbnailMain.js. We have to get this data here as well because someone may load the quiz directly by hitting the exact url with quiz id)
- It renders Home button which will redirect user to home page
- It will render either quiz description or quiz image depending on whatever is available in the data.
- It renders start quiz button. This button will be disable until the code fetches the quiz data from API. Once this data is available, user will be able to start the quiz.

### components/Quiz.js

- Based on the question index we are loading either quiz or result component. If the question index is less than the length of quiz then Question.js will be rendered otherwise Result.js will be loaded in the browser.
- CalculateResult()
 Depending on the quiz structure(correct ans or no correct ans), this function will calculate the result and return the result value. This will follow the logic that was given by you initially
- setCorrectAnswer()
 If the quiz structure is 'correct answer' then only this function will be called. It will iterate through all the answers to find the answer with value 1. Once that is done, it will change the state `correctAns`.
- onClickHandler()
 For 'correctans' quiz structure, if the answer matches with the selected ans then it will increase `score` state by 1.
 For 'Nocorrectans' quiz structure, code will create a list ['ans_value'] and their count. Then it will get the highest ans value questions's descriptions.
- State information
 - questionIndex: current question's index
 - score: calculated score by calculateResult() function
 - structure: quiz type
 - totalQuestions: number of questions
 - correctAns: Store the value of correct answer for a perticular question
 
 ### component/Question.js
 
 - Expects 2 props:
  - question: contains perticular question and answer
  - onClickHandler: onClick event function as props which will be called on click of every answers
 - Render the question and AnswerListItem component

### component/Answer.js

- Expects 2 props:
 - answer: all answer of questions
 - onClickHandler: onClick event handler of quiz component to calculate score.
- Renders answer text or answer image if available

### component/Result.js

- Expects 2 props:
 - result: Quiz result according to quiz score
 - score: Quiz score
- Render home button to return to home page(using Link component of react-router)
- Render Try again button to laod the same quiz again(using Link component of react-router)
- Render Thumbnail list of same category except the current quiz(using ThumnbnailList component)
- Render the result and the score based on the quiz structure(using props)
- morequizList()
 This function will filter the current quiz from the Quiz list and loads the remaining quizes using ThumbnailList.js component.
 
 ### component/Footer.js, About.js, Contact.js, Privacy.js
 
 - All are static component to render some static information about the website
 
 ### actions/index.js
 
 - Contain all the actoins to store the information in Redux store
 
 ### reducers/index.js
 
 - Combines all the reducer files into single one.
 
 ### reducers/quizData.js
 
 - Change the Redux state according the action type using switch sstatement. Finally return the full state of the store to the component.
 
 ### package.json
 
 - File created by npm which will contain all the dependencies of this project.
 



