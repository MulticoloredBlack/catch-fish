export function getNow() {
  const yy = new Date().getFullYear();
  const mm = new Date().getMonth() + 1;
  const dd = new Date().getDate();
  const hh = new Date().getHours();
  const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
    :
    new Date().getMinutes();
  const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
    :
    new Date().getSeconds();
  const dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
  return dateTime;
}

export function getMessage(hasIcon: boolean, totalTime: number): string {
  const hour = Math.floor(totalTime / 3600);
  const min = Math.floor(totalTime / 60);
  // Test
  // return `${hasIcon ? '$(megaphone)' : ''} 你已经连续工作${totalTime}秒`;
  return `${hasIcon ? '$(megaphone)' : ''} 你已经连续工作${hour}小时${min}分钟`;
}

type Day = {
  /** 节日名称 */
  name: string;
  /** 日期, ISO 8601 格式 */
  date: string;
  /** 是否为休息日 */
  isOffDay: boolean;
};
export function getDiffDate(targetDate: string) {
  let date1 = new Date(targetDate);
  let date2 = new Date();
  date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const diff = date2.getTime() - date1.getTime();
  const diffDate = diff / (24 * 60 * 60 * 1000);
  return Math.abs(diffDate);
}
export function getNextHoliday(days: Day[]) {
  const date = new Date();
  for (let i = 0; i < days.length; i++) {
    if (new Date(days[i].date).getTime() > date.getTime() &&  days[i].isOffDay) {
      return days[i];
    }
  }
  return null;
}
export function nextHolidayMessage(date: Day | null ) {
  if (date) {
    const remainDay = getDiffDate(date.date);
    return `$(calendar)下一个法定节假日为${date.name},距离今天还有${remainDay}天`;
  }
  return `未获取到下一个法定节假日,请检查网络后重试！`;
}