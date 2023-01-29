import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApplicationState } from '.';

type SettingsData = {
  login: string;
  repo: string;
};

export type SettingsType = {
  isLoading: boolean;
  hasError: boolean;
} & SettingsData;

const initialState: SettingsType = {
  login: '',
  repo: '',
  isLoading: false,
  hasError: false,
};

export const fetchContributors = createAsyncThunk(
  'settings/fetchContributors',
  async ({ login, repo }: SettingsData) => {
    const res = await fetch(
      `https://api.github.com/repos/${login}/${repo}/contributors`,
    );
    if (!res.ok) throw new Error();
    const contributors = await res.json();
    return {
      login,
      repo,
      contributors,
    };
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
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

export const selectIsLoading = (state: ApplicationState) =>
  state.settings.isLoading;

export const selectHasError = (state: ApplicationState) =>
  state.settings.hasError;

export const selectLogin = (state: ApplicationState) => state.settings.login;

export const selectRepo = (state: ApplicationState) => state.settings.repo;
