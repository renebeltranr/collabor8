const router = require('express').Router();
const collabController = require('./../controllers/collab');
const authWare = require('./../middlewares/auth');

router.post('/newCollab', authWare, collabController.create);
router.get('/getAll', collabController.getAll);

module.exports = router;