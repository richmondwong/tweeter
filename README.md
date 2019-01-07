# Tweeter Project

Tweeter is a single-page homage capturing the essence of Twitter (much in the same way there are tribute watches to such classics as the Rolex Submariner, Omega Speedmaster and Cartier Tank).

Tweeter uses HTML, CSS, JS, jQuery and AJAX for the front-end, and  Node, Express and MongoDB for the back-end.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Screenshots

Composing a tweet. Clicking the Compose button on the top right upon initial page load will trigger the appearance of the Compose Tweet box. Character count is tracked in real-time.
!["Screenshot of tweet about to be sent, and tweet already sent"](https://github.com/richmondwong/tweeter/blob/master/docs/tweeter-post.png?raw=true)

The Compose box will not allow users to send Tweets over 140 characters. An error message will appear any time the user has typed ovver 140 characters, and the character count will turn negative, indicating how many characters they are over the limit.
!["Screenshot of error message when over 140 character limit"](https://github.com/richmondwong/tweeter/blob/master/docs/tweeter-over-limit.png?raw=true)

## Dependencies

- Body Parser
- Chance
- Express
- Moment
- MongoDB
- MD5
- Node 5.10.x or above