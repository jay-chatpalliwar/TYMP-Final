const express = require('express');
const router = express.Router();

// const {mailConfirmation,sendotp,resendOtp,SignUp} = require('../controllers/common/auth/Sign');
// const { Login } = require('../controllers/common/auth/Login');
const {auth,isStudent,isAdmin,isRecruiter} = require('../middlewares/auth');
const {signup,login} = require("../controllers/Auth");

 const { resetPassword } = require('../controllers/common/resetPassword')

const { UserDetails } = require('../controllers/common/UserDetails');
const { fetchResources } = require('../controllers/common/fetchResources');
const { createResource } = require('../controllers/faculty/createResource');
const { updateResource } = require('../controllers/faculty/updateResource');
const { deleteResource } = require('../controllers/common/deleteResource');
const { createTag } = require('../controllers/admin/TagControllers');
const { getTagBySem } = require('../controllers/admin/TagControllers');
const { updateprofile } = require('../controllers/common/updateprofile');
const { deleteprofile } = require('../controllers/common/deleteprofile');
router.get('/',()=>{console.log("routes are fine")})

//*auth routes
// router.post('/verifyemail',mailConfirmation);
// router.post('/sendotp',sendotp)
// router.post('/resendotp',resendOtp);
router.post('/signup',signup);
router.post('/login',login);

//*reset password

router.post('/change-password',resetPassword)

//*resource related testing 
router.get('/fetchResources',fetchResources)
router.post('/createResource',createResource)
router.post('/updateResource',updateResource)
router.delete('/deleteResource',deleteResource)

//*tag related
router.post('/createTag',createTag);
router.get('/getTagBySem',getTagBySem)


//*profile 
router.post('/updateProfile',auth,updateprofile)
router.post('/getProfile',auth,UserDetails)
router.post('/deleteProfile',auth,deleteprofile)
module.exports = router;

