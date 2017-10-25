// Controllers
const User = require('../models/user');
const Car = require('../models/car');


module.exports = {
  showUsers: async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users);
  },

  createUser: async (req, res) => {
    console.log('req.value.body====>', req.value.body);
    const newUser = new User(req.value.body);
    await newUser.save();
    res.json(newUser);
  },

  deleteAllUsers: async (req, res) => {
    const users = await User.remove();
    res.status(200).json('Successfully removed all the users.');
  },

  showUser: async (req, res) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const userBody = req.value.body;
    const user = await User.findByIdAndUpdate(userId, userBody);
    res.status(200).json("Updated user successfuly");
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByIdAndRemove(userId);
    res.status(200).json("Successfully deleted an user");
  },

  showUserCars: async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('cars');
    res.status(200).json(user.cars);
  },

  newUserCar: async (req, res) => {
    const { userId } = req.params;
    // create a new car
    const newCar = new Car(req.body);
    // find the user
    const user = await User.findById(userId);
    // assign the car to the user with connecting two models together
    newCar.seller = user;
    await newCar.save();
    user.cars.push(newCar);
    await user.save();
    res.status(200).json(newCar);
  }

}

