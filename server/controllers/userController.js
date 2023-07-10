const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  // I am using ID as my payload in  JWT
  // jwt.sign({id},'secret_key') // so will write secret key in env variable
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);  // This function is defined in my userModel

		// create a token
		const token = createToken(user._id);
		const user_id = user._id;

		res.status(200).json({ email, token, user_id });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// signup a user
const signupUser = async (req, res) => {
	const { email, password, name, date_of_birth, gender, height, weight } = req.body;

	try {
		const user = await User.signup(
			email,
			password,
			name,
			date_of_birth,
			gender,
			height,
			weight
		);

		// create a token
		const token = createToken(user._id);
		const user_id = user._id;
		res.status(200).json({ email, token, user_id });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getUserDetailsWithId = async (req, res) => {
  const { id } = req.params;
  const user_data = await User.findById(id);
  console.log(user_data);
  res.status(200).json({
    name: user_data.name,
    email: user_data.email,
    date_of_birth: user_data.date_of_birth,
    gender: user_data.gender,
    height: user_data.height,
    weight: user_data.weight,
  });
};

module.exports = { signupUser, loginUser, getUserDetailsWithId };