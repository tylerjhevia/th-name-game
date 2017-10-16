# Tyler Hevia - Name Game Test Project
--


I used React and TypeScript for this project, and I bundled my code with webpack. I considered adding Redux so that I could take advantage of its state management, but I decided that React's state-handling tools would be sufficient for what I wanted my app to do. Limiting the number of stateful components in my project was one of my goals going in, and I managed to keep all of my state in one parent component. I find that making components stateless whenever possible helps me keep my React projects cleaner and more readable.

I chose to incorporate TypeScript into my project because it is a technology that I really want to become more comfortable with. It makes my code safer and more explicit, and helps me avoid careless errors that I might commit if I were using vanilla JavaScript. 

## Getting Started

I used create-react-app to streamline my setup process. To install the necessary dependencies, run this command: 
`npm install`

To compile webpack and start the dev server, use `npm start`.

## Testing
I used mocha, chai, jest, and enzyme to write my tests. I made an effort to thoroughly test every component and check that they were rendering the correct elements. To run the testing suite, use `npm test`.




