import type { AppState, AzubiForgeData, UiState } from "./types";

export interface AppContext {
  data: AzubiForgeData;
  state: AppState;
  ui: UiState;
}
