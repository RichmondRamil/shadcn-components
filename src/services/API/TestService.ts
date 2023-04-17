import { requestApiService } from './APIService';

interface IResult {
  id: number;
  name: string;
}

export const getTestDataService = async () => {
  const result: IResult = await requestApiService({
    url: 'test',
    method: 'GET',
  });

  return result;
};

export const getTest2DataService = async () => {
  const result: IResult = await requestApiService({
    url: 'test',
    method: 'POST',
    data: {
      name: 'test',
    },
    params: {
      id: 1,
    },
  });
  return result;
};
