export default interface IStorageProvider {
  save(filename: string): Promise<string>;
  delete(filename: string): Promise<void>;
}
