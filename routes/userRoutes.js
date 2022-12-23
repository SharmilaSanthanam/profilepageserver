const router = require('express').Router();
const User = require('../models/userModel');

//for signup process

router.post('/signup', async(req, res)=> {
    const {name, email, password, confirmpassword} = req.body;
  
    try {
      const user = await User.create({name, email, password, confirmpassword});
      res.json(user);
    } catch (e) {
      if(e.code === 11000) return res.status(400).send('Email already exists');
      res.status(400).send(e.message)
    }
  })



  // for login process

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
      const user = await User.findByCredentials(email, password);
      res.json(user)
    } catch (e) {
      res.status(400).send(e.message)
    }
  })

// to get users;

router.get('/', async(req, res)=> {
    try {
      const users = await User.populate('profiles');
      res.json(users);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })

  // get user profiles

router.get('/:id/profiles', async (req, res)=> {
  const {id} = req.params;
  try {
    const user = await User.findById(id).populate('profiles');
    res.json(user.profiles);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
 
// // update user notifcations
// router.post('/:id/updateProfile', async(req, res)=> {
//   const {id} = req.params;
//      const user = await User.findById(req.user._id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     // user.pic = req.body.pic || user.pic;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       // pic: updatedUser.pic,
//       // isAdmin: updatedUser.isAdmin,
//       // token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("User Not Found");
//   }
//   // try {
//   //   const user = await User.findById(id);
//   //   user.notifications.forEach((notif) => {
//   //     notif.status = "read"
//   //   });
//   //   user.markModified('notifications');
//   //   await user.save();
//   //   res.status(200).send();
//   // } catch (e) {
//   //   res.status(400).send(e.message)
//   // }
// })

module.exports = router;