'use strict';
const express = require('express');
const router = express.Router();

let signUpController = require('./controllers/signUp.server.controller.js');
let signInController = require('./controllers/signIn.server.controller.js');
let validateSessionController = require('./controllers/validateSession.server.controller.js');

router.post('/signup', signUpController);
router.post('/signin', signInController);
router.post('/validate-session', validateSessionController);

module.exports = router;
