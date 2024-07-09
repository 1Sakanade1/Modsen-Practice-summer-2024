const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');


const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, 'zxc', { expiresIn: '24h' });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { username = 'default', email, password } = req.body;

      if (!username || !email || !password) {
        return next(ApiError.badRequest('Username, email, and password are required'));
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest('User with this email already exists'));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ username, email, password: hashPassword });

      const token = generateJWT(user.id, user.email, user.role);

      return res.status(201).json({ user, token });
    } catch (error) {
      next(ApiError.internal('Unexpected server error: ' + error.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(ApiError.badRequest('Email and password are required'));
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.badRequest('User with this email not found'));
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return next(ApiError.badRequest('Incorrect password'));
      }

      const token = generateJWT(user.id, user.email, user.role);

      return res.status(200).json({ token });
    } catch (error) {
      next(ApiError.internal('Unexpected server error: ' + error.message));
    }
  }
}

module.exports = new UserController();