const User = require("../Model/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userController = {
  test: (req, res) => {
    res.send("Test Route is Working....");
  },
  register: async (req, res) => {
    // console.log(req.body)
    // res.send("Register Route is working...")

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists");
    }
    bcrypt.hash(password, 5, async function(err, hash) {
        if(err)
        {
            console.log("Error......")
        }
        const newUser = new User({ name, email, password:hash});
        await newUser.save();
    });
    res.send("User registered successfully");
  },
  signIn: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // if (user.password !== password) {
    //   return res.status(401).send("Invalid password");
    // }
    try
    {
        const isExistuser = await User.findOne({email})
        console.log(isExistuser)
        if(!isExistuser)
        {
            return res.status(400).send("User does not exist")
        }
        bcrypt.compare(password, isExistuser.password, function(err, result) {
        if(err)
        {
            return res.send(err)
        }
        if(!result)
        {
            return res.status(500).send("Something went wrong...")
        }
        const token = jwt.sign({ ...isExistuser }, "hjsgdggsgdg",{});
        res.cookie("Access_TOKEN",token).status(200).json({message:"User Login successfully"})
      
        });
    }
    catch(err)
    {
        console.log(err)
    }
    // console.log("User signed in successfully:", user);
    // res.send("User signed in successfully");
  },
};

module.exports = userController;
