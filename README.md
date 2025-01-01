# DevTinder Frontend

# Episode-15
-create vite + react project
-remove unecessary code
-configure tailwinf
-coonfigure daisyui (component library compatible with tailwind)
-add navbar component to App.jsx
-create seperate NavBar.jsx inside components folder
-installed reactRouter (https://reactrouter.com/en/main/start/tutorial#tutorial)
-create BrowserRouter  
   Routes
        Route(Parent)
           Route(children)
           Route(children)


-create outlet in Body Component
-Create Footer

# lets Design the Component
Body
   Navbar
   Route=/=>Feed
   Route=/login=>Login
   Route=/connections=>Connections
   Route=/profile=>Profile

   # Episode-16
   -create a login page
   -install axios
   -solve cors issue
   -CORS-install cors in backend => add middleware to with configurations:origin, credentials:true 
   -whenever making api call so pass 
   axios=>{withCredentials;true} in frontend to get token back to cookie
   -install redux toolkit https://redux-toolkit.js.org/introduction/getting-started
   =>configureStore=>Provider=>createSlice=>add reducer to store
   -add redux dev tool
   -login and see if data is comming properly
   -navbar updates as user logged in.

   # Episode-17
   why on refereshing the page user get looged Out even having valid token in brower's cookie but appStore get refreshed to its initial state?
   in realit user should only get logged out when when cookie get expired.
   So, How to achieve it?
   using useSelector in Bdy Component to addUser in user slice when 1st time body component get rendered
   -u should not be access other routes without login
   -if token is not present redirect user to login page
   -Logout Feature
   -get the feed and add it to the store
   -build the user card on fee-edit profile feature
   -show toast message on save of profile.
   -page see all my connections
   -page see all my connection requests
   -feature accept/reject connection request
   -intrested/ignore the user card from the feedpage
   -Signup new user
   -Testing end to end
   