const express = require('express');
const userController = require('../controllers/userController')
const playerController = require('../controllers/playerController')
const acomodaController = require('../controllers/acomodaController')
const conceptoController = require('../controllers/conceptoController')

const router = express.Router();
router.get('/api/getUsuarios', userController.getUsuarios);
router.get('/api/getUsuario/:id', userController.getUsuario);
router.get('/api/getUserbyEmail/:email', userController.getUserbyEmail);
router.post('/api/addUsuario', userController.addUsuario);
router.post('/api/createUser', userController.createUser);
router.put('/api/updateUsuario/:id', userController.updateUsuario);
router.put('/api/updateAdmin/:nombre', userController.updateAdmin);
router.get('/api/getRanking', playerController.getRanking);
router.get('/api/getJugador/:id', playerController.getJugador);
router.put('/api/updatePlayer/:id', playerController.updatePlayer);
router.get('/api/cargaAcomoda/:id_proceso', acomodaController.cargaAcomoda);
router.get('/api/getConceptos', conceptoController.getConceptos);
router.post('/api/addConcepto', conceptoController.addConcepto);

module.exports = router;