import { createSlice } from '@reduxjs/toolkit';

export type PageName = 'tasks' | 'howTo' | 'settings';

export interface PagerState {
  pageName: PageName,
}

export const initialState: PagerState = {
  pageName: 'tasks',
};

export const pagerSlice = createSlice({
  name: 'pager',

  initialState,

  reducers: {
    setPage: (state, { payload }: { payload: PageName}) => ({
      ...state,
      pageName: payload,
    }),
  },
});

export const {
  setPage,
} = pagerSlice.actions;

export default pagerSlice.reducer;
