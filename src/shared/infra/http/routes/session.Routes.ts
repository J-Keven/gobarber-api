import { Router } from 'express';
import AuthtorizationUserService from '@modules/users/services/AuthtorizationUserService';

const sessionRoutes = Router();

sessionRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authtorizationUserService = new AuthtorizationUserService();

  const { user, token } = await authtorizationUserService.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionRoutes;
