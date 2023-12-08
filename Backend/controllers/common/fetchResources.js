const mongoose = require('mongoose');
const User = require('../../model/user');
const Resource = require('../../model/Resource');

exports.fetchResources = async (req, res) => {
  try {
    const { role, email } = req.body; // Destructure role and id from the request body
 
    


     
    const  user = await User.findOne({email:email});
    // console.log("print user "+ user);

    // if (role === 'student') {
    //   user = await User.findById(id).populate('saved_resources')
    //   console.log(user.name);
    // } else {
    //   user = await User.findById(id).populate('resources');
    // }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Something went wrong , log in again' });
    }

    const resources = role === 'student' ? user.saved_resources : user.resources;
    const actual = [];
    
    for(let i=0;i<resources.length;i++)
    {
      const temp = await Resource.findById(resources[i]);
      actual.push(temp);
    }
    
    console.log("printing resources")
   console.log(resources)
    return res.status(200).json({
      success: true,
      message: 'Resources fetched successfully',
      resources: actual,
      

    });
  } catch (e) {
    console.error('Error while fetching resources', e);
    return res.status(500).json({
      success: false,
      message: 'Error while fetching resources',
      error: e.message,
    });
  }
};