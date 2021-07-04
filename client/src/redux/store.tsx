import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const DataProvider = ({ children }: any) => {
    return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;

export type RootState = ReturnType<typeof store.getState>;
