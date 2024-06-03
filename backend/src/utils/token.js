const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const jwtPayload = {
    sub: user.id_usuario,
    name: user.nome,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return token;
};

const getUserIdFromToken = (authToken) => {
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    return decoded.sub;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  generateToken,
  getUserIdFromToken,
};
