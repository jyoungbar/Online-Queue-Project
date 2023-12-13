Features:
	-Users enter name upon landing using pop-up element
		-Users will also choose whether they are voting, active, or associate (can be verified by admin)
	-Users can edit their name at any time (although the number of times they have spoken must still be properly tracked)
	-User names (along with brother status) kept track in localstorage or sessionstorage (and/or on server)
		-maybe create rooms for each status, and emit most stuff to all rooms
	-Button leading to pop-up for logging in as admin (unless I go with checking IP address for admin)
	-Multiple queues open at once
	-Queue info stored in sessionstorage of admin (or possibly mongodb or just a server-side variable)
	-Max 3 queues per row
	-Button for admin to open/close new queue
	-(Maybe) History/record section that admin can add to and/or automatically updates for things like a motion passed, rule change, etc.
	-Admin can send out some sort of pop-up message
	-Robert's rules section
	-Some way for experience to be configured based on if this is a senate meeting or an APO meeting (either settings for admin to change or different endpoints on server or users choose when the land)
		-with this, there may be a need for admin to start and end meetings (can choose what type of meeting to start)
			-maybe have site allow for anyone to create a new meeting (which will be on its own endpoint) in which they are the admin
		-maybe have separate admin endpoint where admin can start/manage meetings

	Each queue should have:
		-title
		-list of people (kept track of using priority queue object)
		-section with button to join/leave queue
		-voting capabilities (upon release of admin)
			-when a vote is opened, a pop-up will appear for users to cast their vote
			-while voting is open, number of people who have voted will be shown out of people who can vote
			-will need to distinguish between voting members, active, and associate brothers
				-admin should be able to choose who is allowed to vote when opening a vote
			-use recharts or something to create graphs of voting results
			-voting will close either once everyone has voted or admin closes voting
		-buttons for admin to remove, add, or otherwise edit queue
		-time that the queue started





Resources:
https://www.codershood.info/2016/01/24/sending-message-specific-user-socket-io/
https://www.scaler.com/topics/nodejs/socket-io-node-js/
https://levelup.gitconnected.com/set-up-and-run-a-simple-node-server-project-38b403a3dc09
https://blog.logrocket.com/deploying-react-apps-github-pages/
https://github.com/gitname/react-gh-pages
https://socket.io/docs/v4/client-api/
https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
https://www.loginradius.com/blog/engineering/password-hashing-with-nodejs/
https://www.w3schools.com/nodejs/ref_crypto.asp
https://socket.io/how-to/use-with-react
https://stackoverflow.com/questions/20007453/how-can-i-detect-disconnects-on-socket-io
https://socket.io/docs/v3/rooms/
https://popupsmart.com/blog/react-popup
https://www.robinwieruch.de/react-checkbox/
https://www.w3schools.com/react/react_forms.asp
https://www.npmjs.com/package/react-modal
https://stackoverflow.com/questions/40481270/socket-io-page-refresh-disconnects-from-the-room
https://socket.io/docs/v3/handling-cors/
https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
https://www.freecodecamp.org/news/react-router-tutorial/
https://www.clipartmax.com/middle/m2H7G6b1Z5N4A0m2_q-gold-foil-decals-q-gold-foil-decals/
https://marketsplash.com/tutorials/react-js/how-to-route-pages-in-react-js/#link5
https://www.perssondennis.com/articles/react-hook-use-run-once
https://stackoverflow.com/questions/18093638/socket-io-rooms-get-list-of-clients-in-specific-room
https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
https://socket.io/how-to/deal-with-cookies
https://www.makeuseof.com/redirect-user-after-login-react/
https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3#:~:text=Import%20the%20JS%2DCookie%20library%20in%20your%20React%20component.&text=You%20can%20set%20a%20cookie,stored%2C%20and%20an%20options%20object.&text=You%20can%20retrieve%20the%20value,using%20the%20get()%20method.
https://stackoverflow.com/questions/49748384/how-to-use-res-send-return-set-or-map-object
https://stackoverflow.com/questions/17973207/how-to-remove-line-break-after-div-in-css
https://react-bootstrap.netlify.app/docs/components/
https://dev.to/yuridevat/how-to-create-a-timer-with-react-7b9
https://www.geeksforgeeks.org/how-to-navigate-on-path-by-button-click-in-react-router/
https://stackoverflow.com/questions/23045245/one-line-check-if-socket-is-in-given-room
https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/

