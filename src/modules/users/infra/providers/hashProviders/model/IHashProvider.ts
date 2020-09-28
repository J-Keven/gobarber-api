interface IHashProviders {
  create(payload: string): Promise<string>;
  compare(payload: string, hashed: string): Promise<boolean>;
}

export default IHashProviders;
