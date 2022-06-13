import HttpClient from './http';

class MainApi extends HttpClient {
  public constructor() {
    const baseUrl = 'https://cdn.jsdelivr.net/';
    super(baseUrl);
  }
}
const api = new MainApi();
interface Response{
    $schema: string,
    $id: string,
    year: number,
    papers: Array<string>
    days: Array<{
      name: string,
      date: string,
      isOffDay: boolean
    }>
}
export const getHolidayRemain = async () => {
  return  await api.get<Response>('gh/NateScarlet/holiday-cn@master/2022.json');
};