import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { cachedReducer } from "./reducers/cachedReducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cachedReducer"],
};

// @ts-ignore
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const rootReducer = combineReducers({
    cachedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);