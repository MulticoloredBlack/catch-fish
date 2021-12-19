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
