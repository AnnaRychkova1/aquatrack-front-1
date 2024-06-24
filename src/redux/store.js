import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from '../redux/users/slice.js';
//import { waterReducer } from './water/waterSlice.js';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, authReducer),
    // water: persistReducer(waterPersistConfig, waterReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import { userReducer } from './users/slice.js';
// //import { waterReducer } from './water/waterSlice.js';

// const userPersistConfig = {
//   key: 'user',
//   storage,
//   whitelist: [],
// };

// // const waterPersistConfig = {
// //   key: 'water',
// //   storage,
// //   whitelist: [], // should be added
// // };

// export const store = configureStore({
//   reducer: {
//     user: persistReducer(userPersistConfig, userReducer),
//     // water: persistReducer(waterPersistConfig, waterReducer),
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);
