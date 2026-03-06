import { FILE_TYPE } from "../constants/file.constant";

export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];
