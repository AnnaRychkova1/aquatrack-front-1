import { selectAuthError, selectAuthLoading } from "./auth/selectors";
import { selectWaterError, selectWaterLoading } from "./water/selectors";

export function selectLoading(state) {
  if (selectWaterError(state)) {
    return selectWaterError(state);
  } else {
    return selectAuthLoading(state);
  }
}

export function selectError(state) {
  if (selectWaterLoading(state)) {
    return selectWaterLoading(state);
  } else {
    return selectAuthError(state);
  }
}
