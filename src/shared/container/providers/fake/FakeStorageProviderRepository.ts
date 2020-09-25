import ISatorageProvider from '../models/IStorageProvider';

class FakeStoragePoviderRepository implements ISatorageProvider {
  private files: string[] = [];

  public async save(filename: string): Promise<string> {
    this.files.push(filename);

    return filename;
  }

  public async delete(filename: string): Promise<void> {
    const indexFile = this.files.findIndex(file => file === filename);

    if (indexFile > -1) {
      this.files.splice(indexFile, 1);
    }
  }
}

export default FakeStoragePoviderRepository;
