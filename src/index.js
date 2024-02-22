import React from 'react';
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import adminReducer, { loadAdmin } from './features/AdminSlice';
import userReducer, { loadUser } from './features/UserSlice';
import topStoriesSlice, { getTopStories } from './features/topStoriesSlice';
import opinionBoxSlice, { getOpinionBox } from './features/opinionBoxSlice';
import eventSlice, { getEvent } from './features/eventSlice';
import govermentNotificationSlice, { getGovtNotification } from './features/govermentNotificationSlice';
import latestVideosSlice, { getLatestVideos } from './features/latestVideosSlice';
import metaWeeklySlice, { getMetaWeekly } from './features/MetaWeeklySlice';
import homeSliderSlice, { getHomeSlider } from './features/HomeSliderSlice';
import gallerySlice, { getGallery } from './features/GallerySlice';
import subscriptionsSlice, { getSubscriptions } from './features/SubscriptionsSlice';

import { HelmetProvider } from 'react-helmet-async';


// import { ThemeProvider, createTheme } from '@mui/material/styles';
// const theme = createTheme();

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    topStories: topStoriesSlice,
    opinionBox: opinionBoxSlice,
    event: eventSlice,
    govtNotification: govermentNotificationSlice,
    latestVideos: latestVideosSlice,
    metaWeekly: metaWeeklySlice,
    homeSlider: homeSliderSlice,
    gallery: gallerySlice,
    subscriptions: subscriptionsSlice,
  }
});
store.dispatch(loadAdmin(null));
store.dispatch(loadUser(null));
store.dispatch(getTopStories());
store.dispatch(getOpinionBox());
store.dispatch(getEvent());
store.dispatch(getGovtNotification());
store.dispatch(getLatestVideos());
store.dispatch(getMetaWeekly());
store.dispatch(getHomeSlider());
store.dispatch(getGallery());
store.dispatch(getSubscriptions());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ChakraProvider>
      {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </ChakraProvider>
  </Provider>
);
