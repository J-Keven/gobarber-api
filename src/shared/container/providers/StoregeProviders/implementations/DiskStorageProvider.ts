import fs from 'fs';
import { resolve } from 'path';
import uploadConfigs from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async save(filename: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfigs.tempPath, filename),
      resolve(uploadConfigs.uploadPath, filename),
    );

    return filename;
  }

  public async delete(filename: string): Promise<void> {
    try {
      await fs.promises.stat(resolve(uploadConfigs.uploadPath, filename));
    } catch (error) {
      return;
    }

    await fs.promises.unlink(resolve(uploadConfigs.uploadPath, filename));
  }
}
export default DiskStorageProvider;
