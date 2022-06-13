
import { getHolidayRemain } from '../api/request';
class HolidayRemain {
  $option: PluginOptions;
  constructor(option: PluginOptions){
    this.$option = option; 
    this._init();
  }
  _init(){
    this.getHolidayRemain();
  }
  async getHolidayRemain(){
    const response = await getHolidayRemain();
    const { days } = response.data;
  }
  public changeOptions(option: Config) {
    this.$option.setting = option;
  }
  destroy(){}
}
export default {
  install: (option: PluginOptions): HolidayRemain => {
    return new HolidayRemain(option);
  }
};