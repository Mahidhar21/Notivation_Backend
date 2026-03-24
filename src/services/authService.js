import * as userRepository from '../repositories/userRepository.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { createToken } from '../utils/jwt.js';

export const registerUser = async ({ username, email, password }) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    const err = new Error('Email already in use');
    err.status = 400;
    throw err;
  }
  const passwordHash = await hashPassword(password);
  const user = await userRepository.createUser({ username, email, passwordHash });
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const token = createToken({ id: user.id, email: user.email });
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
    token
  };
};

export const getCurrentUser = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at
  };
};

