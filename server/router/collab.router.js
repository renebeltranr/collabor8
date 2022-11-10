const router = require('express').Router();
const collabController = require('./../controllers/collab');
const authWare = require('./../middlewares/auth');

router.post('/newCollab', authWare, collabController.create);
router.get('/getAll', collabController.getAll);
router.get('/getUserCollabs', authWare, collabController.getUserCollabs);
router.get('/id/:id', collabController.getCollab);

router.post('/saveTrack', authWare, collabController.saveTrack);

module.exports = router;