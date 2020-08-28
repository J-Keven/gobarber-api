import { Router } from 'express';
import AuthtorizationUserService from '../services/AuthtorizationUserService';

const sessionRoutes = Router();

sessionRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.headers);
  try {
    const authtorizationUserService = new AuthtorizationUserService();

    const { user, token } = await authtorizationUserService.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionRoutes;
