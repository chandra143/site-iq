import {
  observable
} from 'mobx';

class app_state {
  @observable sidebar_isCollapsed = true
  @observable sidebar_activeKey = ''
  @observable sidebar_toggleFlag = false
  @observable user_profile = {}
  dragDropContext = null
}

export default new app_state();
