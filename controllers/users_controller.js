const flash = require('connect-flash/lib/flash');
const User = require('../models/user');

module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: 'Profile'
    });
}

module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('user_signup', {
        title: 'Sign up',
    });
}
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('user_signin', {
        title: "Login"
    })
}
module.exports.create = function(req, res){
    if (req.body.password != req.body.password_confirmation) {
        console.log('password do not match');
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up');
            req.flash('error', 'Error in finding user');
            return;
        }

        if (!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    req.flash('error', 'Error in creating user');
                     return;
                    }else{

                 console.log('user created', user);
                return res.redirect('/users/sign-in');
                }
            })
        }else{
            console.log('user already exists');
            req.flash('error', 'User already exists');
            return res.redirect('back');
        }

    });
}

module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout();
    res.status(200).clearCookie('connect.sid').redirect('/users/sign-in');
}