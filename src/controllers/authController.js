import * as authService from '../services/authService.js';
import { createTokenResponse } from '../utils/jwt.js';

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    const tokenPayload = { id: user.id, email: user.email };
    const token = createTokenResponse(tokenPayload);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

