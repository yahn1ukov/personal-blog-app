import type { USER_TAB_TYPE } from "../constants/user.constant";

export type UserTabType = (typeof USER_TAB_TYPE)[keyof typeof USER_TAB_TYPE];
