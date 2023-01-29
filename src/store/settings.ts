import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from '.';
import { set } from './reviewers';

type SettingsData = {
  login: string;
  repo: string;
};

export type SettingsType = {
  isLoading: boolean;
  hasError: boolean;
  blacklist: string[];
} & SettingsData;

const initialState: SettingsType = {
  login: '',
  repo: '',
  isLoading: false,
  hasError: false,
  blacklist: [],
};

export const fetchContributors = createAsyncThunk(
  'settings/fetchContributors',
  async ({ login, repo }: SettingsData, { dispatch }) => {
    const res = await fetch(
      `https://api.github.com/repos/${login}/${repo}/contributors`,
    );
    if (!res.ok) throw new Error();
    const contributors = await res.json();

    dispatch(set(contributors));

    return {
      login,
      repo,
    };
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    blacklistSet(state, action) {
      state.blacklist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContributors.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchContributors.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchContributors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.login = action.payload.login;
        state.repo = action.payload.repo;
      });
  },
});

export default settingsSlice.reducer;

export const { blacklistSet } = settingsSlice.actions;

export const selectIsLoading = (state: ApplicationState) =>
  state.settings.isLoading;

export const selectHasError = (state: ApplicationState) =>
  state.settings.hasError;

export const selectLogin = (state: ApplicationState) => state.settings.login;

export const selectRepo = (state: ApplicationState) => state.settings.repo;
