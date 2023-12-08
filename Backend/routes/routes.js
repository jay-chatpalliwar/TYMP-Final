const express = require('express');
const router = express.Router();

// const {mailConfirmation,sendotp,resendOtp,SignUp} = require('../controllers/common/auth/Sign');
// const { Login } = require('../controllers/common/auth/Login');
const {auth,isStudent,isAdmin,isRecruiter} = require('../middleware/auth');
const {signup,login} = require("../controllers/Auth");

 const { resetPassword } = require('../controllers/common/resetPassword')

const { UserDetails } = require('../controllers/common/UserDetails');
const { fetchResources } = require('../controllers/common/fetchResources');
const { createResource } = require('../controllers/faculty/createResource');
const { updateResource } = require('../controllers/faculty/updateResource');
const { deleteResource } = require('../controllers/faculty/deleteResource');
const { createTag } = require('../controllers/admin/TagControllers');
const { getTagBySem } = require('../controllers/admin/TagControllers');
const { updateprofile } = require('../controllers/common/updateprofile');
const { deleteprofile } = require('../controllers/common/deleteprofile');
const { getAll } = require('../controllers/common/getAll');
const fileUpload = require('../controllers/common/fileUpload');
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
router.post('/fileupload',fileUpload)
router.post('/fetchResources',fetchResources)
router.post('/createResource',createResource)
router.post('/updateResource',updateResource)
router.delete('/deleteResource',deleteResource)

//*tag related
router.post('/createTag',createTag);
router.get('/getTagBySem',getTagBySem)
router.get('/getAll',getAll)


//*profile 
router.post('/updateProfile',auth,updateprofile)
router.post('/getProfile',auth,UserDetails)
router.post('/deleteProfile',auth,deleteprofile)

const {getData} = require('../controllers/common/getData')
router.get('/getdata',getData);


module.exports = router;

