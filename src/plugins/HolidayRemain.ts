
import { getHolidayRemain } from '../api/request';
class HolidayRemain {
  constructor(option: PluginOptions){
        
  }
  _init(){
    getHolidayRemain().then(res=>{
        const days = res.data.days
    }
  }
  destroy(){}
}
export default {
  install: (option: PluginOptions): HolidayRemain => {
    return new HolidayRemain(option);
  }
};