const auth = {
    
    // checks if the user is logged in, if not, redirect to the 
    // unauthorized route
    isLoggedIn: (req, res, next)=> {
        if(req.isAuthenticated()){
            console.log('user authenticated');
            next();
        } else{
            console.log("user not authenticated");
            res.redirect('/api/users/unauthorized')
        }
    },

    // middleware function to log out the user
    logoutUser: (req, res, next)=> {
        if(req.isAuthenticated()){
            console.log('logged out successfully')
            req.logout();
            next();
        } else {
            next();
        }
    },

    // checks to see if the user is authenticated, then checks if they are an admin
    // if yes, move on, otherwise send to unauthorized route
    isAdmin: (req, res, next)=> {
        if (req.isAuthenticated()) {
            console.log('user confirmed');
            if(req.user.admin) {
                console.log('Administer Confirmed');
                next();
            } else {
                console.log('you must be an administer to continue');
                res.redirect('/api/users/unauthorized')
            }
        } else {
            res.redirect('/api/users/unauthorized')
        }
    }
}

module.exports = auth;
