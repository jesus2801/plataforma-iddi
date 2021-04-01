import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' &&
      typeof (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f,
  ),
);

export default store;
