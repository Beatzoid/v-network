import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as Sentry from "@sentry/react";

import rootReducer from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";

import { IProfile } from "./types/profile";
import { IPost } from "./types/post";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
    // Optionally pass options listed below
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk), sentryReduxEnhancer)
);

const DataProvider = ({ children }: any) => {
    return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;

export type RootState = {
    profile: IProfile;
    status: boolean;
    homePosts: {
        loading: boolean;
        posts: IPost[];
        result: number;
        page: number;
    };
} & Omit<ReturnType<typeof store.getState>, "profile" | "status" | "homePosts">;
