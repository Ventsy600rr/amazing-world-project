Simple application for viewing and sharing locations around the world, created for educational porpuses.
Application uses Angular for client- side and Firebase for back- end service and deploy. 
Guest users can accses: 
- home page [Home] - showing welcome message and top 3 moust liked locations (if any) 
- catalog page [Amazing places] - showing all places (if any) 
- details - showing additional info for current place, with link to creator profile page 
- creator profile page - showing creator info his added places - login page [Login] - showing login form 
- register [Register] -showing register form 
Logged-in users can acces: 
- create page [Share your place] 
- showing add place form 
- details 
    - if current user is not creator can 
        - like/dislike location 
        - add/remove location from visited list 
        - add/remuve location from favorite list 
    - if current user is creator can 
        - edit - showing edit place form 
        - delete - deleting place 
- profile page [Welcome,"username"] - showing user info 
    - locations added by the user (if any) 
    - visited list (if any) 
    - favorite list (if any) 
- logout [Logout]