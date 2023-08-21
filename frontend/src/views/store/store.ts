import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userInfo from "../slice/userSimple-slice";



/*
1. PersistGate: Redux상태를 복원하는데 사용된다.
    * 로딩: Redux상태가 복원되지않았을떄는 로딩을보여준다.
    * 복원되는시점: 앱이처음으로 렌더링될때 (업데이트와는 연관이없다.)

2. persistReducer: config와 reducer를 감싸는데 사용된다
    * config: 저장된데이터의 이름, 저장위치를 구분
    * reducer: 지속을 유지할 reducer(slice)

3. persistStore: store의 상태를 저장한다.
    * 모든 상태가아닌 persistReducer로 정의되어있는 reducer만 저장한다.
*/

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

// Redux Persist 설정
const persistConfig = {
    key: 'userLoginInfo', // 저장된 데이터의 키 이름
    storage, // 사용할 저장소 (로컬 스토리지, 세션 스토리지 등)
};

//   Redux Persist를 적용한 리듀서 생성
const persistedReducer = persistReducer(persistConfig, userInfo);



export const store = configureStore({
    reducer: {
        userInfo: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const persistor = persistStore(store);

