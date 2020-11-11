export default {
  jwt: {
    secretKey: process.env.SECRET_KEY || 'default',
    expiresIn: '1d',
  },
};
