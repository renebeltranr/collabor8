const User = require('./../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const { uid } = req.session;
    const user = await User.findOne({ _id: uid });
    if (!user) throw new Error('Error at authMiddleware');
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send('Unauthorized')
  }
};

module.exports = authMiddleware;
