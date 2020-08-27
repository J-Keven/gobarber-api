import { Router } from 'express';
import CreateUsersService from '../services/CreateUsersService';

const usersRoutes = Router();

usersRoutes.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const createUsersService = new CreateUsersService();

    const user = await createUsersService.execute({ name, email, password });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRoutes;
