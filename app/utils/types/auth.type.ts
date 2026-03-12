import type { AUTH_TAB_TYPE } from "../constants/auth.constant";

export type AuthTabType = (typeof AUTH_TAB_TYPE)[keyof typeof AUTH_TAB_TYPE];
