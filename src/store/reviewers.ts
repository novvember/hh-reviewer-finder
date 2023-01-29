import { createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from '.';

type User = {
  login: string;
  avatar_url: string;
};

export type ReviewersType = {
  entities: User[];
};

const initialState: ReviewersType = {
  entities: [],
};

const reviewersSlice = createSlice({
  name: 'reviewers',
  initialState,
  reducers: {
    set(state, action) {
      state.entities = action.payload;
    },
  },
});

export default reviewersSlice.reducer;

export const { set } = reviewersSlice.actions;

export const selectReviewers = (state: ApplicationState) =>
  state.reviewers.entities;
