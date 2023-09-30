const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

//Timer Routes
router.get('/startTimer', todosController.startTimer)

router.get('/stopTimer', todosController.stopTimer)

router.get('/resetTimer', todosController.resetTimer)

router.get('/getTimer/:todoId', todosController.getTimer)

module.exports = router