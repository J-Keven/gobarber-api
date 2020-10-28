import fs from 'fs';
import { resolve } from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfigs from '@config/upload';
import IStorageProvider from '../model/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private cliente: S3;

  constructor() {
    this.cliente = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async save(filename: string): Promise<string> {
    const originalPath = resolve(uploadConfigs.tempPath, filename);
    const fileContent = await fs.promises.readFile(originalPath);

    const extension = filename.split('.');

    const ContentType = extension[extension.length - 1];

    await this.cliente
      .putObject({
        Bucket: uploadConfigs.configs.s3.bucket,
        Key: filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return filename;
  }

  public async delete(filename: string): Promise<void> {
    await this.cliente
      .deleteObject({
        Bucket: uploadConfigs.configs.s3.bucket,
        Key: filename,
      })
      .promise();
  }
}
export default S3StorageProvider;
