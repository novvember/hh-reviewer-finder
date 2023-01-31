import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { ApplicationState } from '.';
import getContributors from '../api/getContributors';
import { DEFAULT_LOGIN, DEFAULT_REPO } from '../config';

export type User = {
  login: string;
  avatar_url: string;
  html_url: string;
};

type SettingsData = {
  login: string;
  repo: string;
};

export type DataType = {
  isLoading: boolean;
  hasError: boolean;
  blacklist: string[];
  contributors: User[];
} & SettingsData;

const storedState = localStorage.getItem('appState')
  ? (JSON.parse(localStorage.getItem('appState') as string).data as DataType)
  : null;

const initialState: DataType = {
  login: DEFAULT_LOGIN,
  repo: DEFAULT_REPO,
  isLoading: false,
  hasError: false,
  blacklist: [],
  contributors: [],
};

export const fetchContributors = createAsyncThunk(
  'settings/fetchContributors',
  async ({ login, repo }: SettingsData) => {
    const contributors = await getContributors(login, repo);

    return {
      login,
      repo,
      contributors,
    };
  },
);

const settingsSlice = createSlice({
  name: 'data',
  initialState: storedState ?? initialState,
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
        state.blacklist = [];
      })
      .addCase(fetchContributors.rejected, (state) => {
        state.blacklist = [];
        state.isLoading = false;
        state.login = '';
        state.repo = '';
        state.hasError = true;
        state.contributors = [];
      })
      .addCase(fetchContributors.fulfilled, (state, action) => {
        const { login, repo, contributors } = action.payload;

        state.isLoading = false;
        state.hasError = false;
        state.login = login;
        state.repo = repo;
        state.contributors = contributors;
        state.blacklist = [login];
      });
  },
});

export default settingsSlice.reducer;

export const { blacklistSet } = settingsSlice.actions;

export const selectIsLoading = (state: ApplicationState) =>
  state.data.isLoading;

export const selectHasError = (state: ApplicationState) => state.data.hasError;

export const selectLogin = (state: ApplicationState) => state.data.login;

export const selectRepo = (state: ApplicationState) => state.data.repo;

export const selectContributors = (state: ApplicationState) =>
  state.data.contributors;

export const selectContributorByLogin = (login: string) =>
  createSelector([selectContributors], (contributors) =>
    contributors.find((user) => user.login === login),
  );

export const selectBlacklist = (state: ApplicationState) =>
  state.data.blacklist;
