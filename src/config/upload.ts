import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

interface IS3 {
  bucket: string;
}

interface IStorage {
  disk: {
    // properties
  };
  s3: IS3;
}

interface IUpload {
  driver: 's3' | 'disk';
  tempPath: string;
  uploadPath: string;
  multer: StorageEngine;
  configs: IStorage;
}

const filePath = resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER,

  tempPath: filePath,
  uploadPath: resolve(filePath, 'uploads'),

  multer: multer.diskStorage({
    destination: filePath,
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(8).toString('hex');

      const fileHash = `${hash}-${file.originalname}`;
      return cb(null, fileHash);
    },
  }),

  configs: {
    disk: {},
    s3: {
      bucket: 'my-app-gobarber1234',
    },
  },
} as IUpload;
