import { createAction } from "typesafe-actions";

export const startMain = createAction(
    "@command/events/startMain",
    (resolve) => {
        return () => resolve();
    }
);

export const selectMainStudies = createAction(
    "@command/events/selectMainStudies",
    (resolve) => {
        return (plainEventObjects) => resolve(plainEventObjects);
    }
);