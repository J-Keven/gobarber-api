import multer from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

const filePath = resolve(__dirname, '..', '..', 'tmp');
export default {
  directory: filePath,
  storage: multer.diskStorage({
    destination: filePath,
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(8).toString('hex');

      const fileHash = `${hash}-${file.originalname}`;
      return cb(null, fileHash);
    },
  }),
};
