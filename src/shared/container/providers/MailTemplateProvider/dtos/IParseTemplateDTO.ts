interface IVariables {
  [key: string]: string;
}

export default interface IParseTemplateDTO {
  file: string;
  variables: IVariables;
}
