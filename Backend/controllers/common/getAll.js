const mongoose = require('mongoose');
const User = require('../../model/user');
const Resource = require('../../model/Resource');

exports.getAll = async (req, res) => {
  try {


    const resources = await Resource.find({});
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