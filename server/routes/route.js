const routes = require('express').Router();
const controller = require('../controller/controller');
const userCtrl = require('../controller/user.controller.js'); 
const authCtrl = require('../controller/auth.controller.js'); 


    routes.route('/api/categories')
    .post(controller.create_Categories)
    .get(controller.get_Categories);

routes.route('/api/transaction')
    .post(controller.create_Transaction)
    .get(controller.get_Transaction)
    .delete(controller.delete_Transaction);

routes.route('/api/labels')
    .get(controller.get_Labels);


//Auth
routes.route('/auth/signin') .post(authCtrl.signin)
routes.route('/auth/signout').get(authCtrl.signout)
routes.route('/auth/signout') 
.get(authCtrl.signout)
//export default router

//user
routes.route('/api/users') 
	.get(userCtrl.list)
	.post(userCtrl.create)
	routes.route('/api/users/:userId')
.get(authCtrl.requireSignin, userCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, 
userCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, 
userCtrl.remove)
routes.param('userId', userCtrl.userByID)
routes.route('/api/users').post(userCtrl.create) 
routes.route('/api/users').get(userCtrl.list)
routes.param('userId', userCtrl.userByID)
routes.route('/api/users/:userId').get(userCtrl.read)
routes.route('/api/users/:userId').put(userCtrl.update)
routes.route('/api/users/:userId').delete(userCtrl.remove)

module.exports = routes;