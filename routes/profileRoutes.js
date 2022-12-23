const router = require('express').Router();
const Profile = require('../models/profileModel');
const User = require('../models/userModel');

//creating a profile

router.post('/', async(req, res)=> {

  const {userId, mobile, age, country, images: pictures} = req.body;
  try {
    const user = await User.findById(userId);
    const profile = await Profile.create({owner: user._id, user: mobile, age, country, pictures});
 
    await profile.save();
   
    user.profiles.push(profile);
        await user.save();
    res.status(200).json(user)

  } catch (e) {
    res.status(400).json(e.message)
  }
})


// getting all profiles;
router.get('/', async(req, res)=> {
  try {
    const profiles = await Profile.find().populate('owner', ['email', 'name']);
    res.status(200).json(profiles);
  } catch (e) {
    res.status(400).json(e.message)
  }
})

//update profile
router.patch('/:id', async (req, res) => {
  const {ownerId} = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(userId);
    const { userId, mobile, age, country, images: pictures } = req.body;
    const profile = await Profile.findByIdAndUpdate({owner: user._id, profile: mobile, age, country, pictures});
    // const profiles = await Profile.find();
    await profile.save();
    res.status(200).json(profile);
  } catch (e) {
    res.status(400).send(e.message);
  }
})


//shipping order

// router.patch('/:id/editprofile', async(req, res)=> {
//   // const io = req.app.get('socketio');
//   const {ownerId} = req.body;
//   const {id} = req.params;
//   try {
//     const user = await User.findById(ownerId);
//     await Profile.findByIdAndUpdate(id);
//     const Profiles = await Profile.find().populate('owner', ['email', 'name']);
//     // const notification = {status: 'unread', message: `Order ${id} shipped with success`, time: new Date()};
//     // io.sockets.emit("notification", notification, ownerId);
//     // user.notifications.push(notification);
//     // user.notifications.unshift(notification);
//     await user.save();
//     res.status(200).json(Profiles)
//   } catch (e) {
//     res.status(400).json(e.message);
//   }
// })
module.exports = router;