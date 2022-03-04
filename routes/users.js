const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');
const flash = require('connect-flash/lib/flash');
const { setFlash } = require('../config/middleware');

router.get('/profile', passport.checkAuthentication, userController.profile);

router.get('/sign-up', userController.signUp);
router.post('/create', userController.create, setFlash);

router.get('/sign-in', userController.signIn);
router.post('/create-session',
    passport.authenticate('local', {
        failureRedirect: '/users/sign-in',
        failureFlash: 'Invalid email or password.'
    }), userController.createSession);  

router.get('/sign-out', userController.destroySession);

module.exports = router;