import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authenticateOptional = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
  } catch {
  }
  return next();
};

