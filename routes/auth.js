const express = require("express");
const { handleRegister, handleLogin , handleVerifyAuth , handleDeleteAll } = require("../controllers/auth");
const { verifyUser }  = require("../middlewares");
const router = express.Router();

router.get('/verify' , verifyUser ,handleVerifyAuth );
router.get('/delete-all'  , handleDeleteAll);
router.post('/register' , handleRegister);
router.post('/login'  , handleLogin);

module.exports = router;