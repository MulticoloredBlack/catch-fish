import HttpClient from './http';

class MainApi extends HttpClient {
  public constructor() {
    const baseUrl = 'https://cdn.jsdelivr.net';
    super(baseUrl);
  }
}
const api = new MainApi();
interface Holidays {
  /** 完整年份, 整数。*/
  year: number;
  /** 所用国务院文件网址列表 */
  papers: string[];
  days: {
    /** 节日名称 */
    name: string;
    /** 日期, ISO 8601 格式 */
    date: string;
    /** 是否为休息日 */
    isOffDay: boolean;
  }[]
}
export const getHolidayRemain = async (year: number) => {
  return  await api.get<Holidays>(`/gh/NateScarlet/holiday-cn@master/${year}.json`);
};