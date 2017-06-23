import { setInternalNavigation } from '../actions';

let NavigationService = class {

  registerDispatcher(dispatchIns) {
    this.dispatch = dispatchIns;
  }
  updateBreadcrumbState(state) {
    var pathArray = [];
    var pathName = state.location.pathname;
    state.routes.map((item, index) => {
      let id = (item.id) ? item.id : index;
      pathArray.push({ id, path: item.path, name: item.name, role: item.role})
    }
    )

    let homePage = false;
    if (pathArray.length == 1 || (pathArray.length > 1 && !pathArray[1].path)) {
      homePage = true;
    }

    this.dispatch(setInternalNavigation(pathArray, state.params, homePage))
  }
}

const NavigationServiceInstance = new NavigationService();

export default NavigationServiceInstance;

