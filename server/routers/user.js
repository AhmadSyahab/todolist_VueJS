const router = require('express').Router();
const ControllerUser = require('../controllers/user');
const ControllerTask = require('../controllers/task')
const Middleware = require('../middleware/checklogin')

router.post('/signup', ControllerUser.signUp ); // SignUp
router.post('/signin', ControllerUser.signIn ); // SignIn

router.post('/signIn/facebook', ControllerUser.signInFacebook );

router.get('/task', Middleware.isSignIn, ControllerUser.findAll); // get all user profile and task list
router.post('/task', Middleware.isSignIn, ControllerUser.create); // create task

router.get('/task/:taskId', Middleware.isSignIn, Middleware.checkOwner, ControllerTask.findOne) // get specific task
router.put('/task/:taskId', Middleware.isSignIn, Middleware.checkOwner,  ControllerTask.update) // update task
router.delete('/task/:taskId',Middleware.isSignIn, Middleware.checkOwner, ControllerTask.remove) // delete task

router.put('/checklist/:taskId', Middleware.isSignIn, Middleware.checkOwner, ControllerTask.done) // make status task true (done)
router.put('/unchecklist/:taskId', Middleware.isSignIn, Middleware.checkOwner,  ControllerTask.unDone) // make status task false (notdone)


module.exports = router;
