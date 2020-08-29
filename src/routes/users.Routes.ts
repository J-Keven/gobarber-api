import { Router } from 'express';
import multer from 'multer';
import CreateUsersService from '../services/CreateUsersService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multerConfig from '../config/upload';

const usersRoutes = Router();
const upload = multer(multerConfig);

usersRoutes.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUsersService = new CreateUsersService();

  const user = await createUsersService.execute({ name, email, password });
  return res.json(user);
});

usersRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  ensureAuthenticated,
  async (req, res) => {
    const { id } = req.user;
    const { filename } = req.file;

    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({ id, filename });
    delete user.password;
    return res.json(user);
  },
);
export default usersRoutes;
