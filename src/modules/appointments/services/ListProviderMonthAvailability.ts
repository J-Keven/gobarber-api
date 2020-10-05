interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  avilability: boolean;
}>;
// [ {day: 1, avilability: false}]

class ListProviderMonthAvailability {
  constructor() {}

  public async execute({
    month,
    provider_id,
    year,
  }: IRequest): Promise<IResponse> {
    return [{ day: 1, avilability: false }];
  }
}

export default ListProviderMonthAvailability;
