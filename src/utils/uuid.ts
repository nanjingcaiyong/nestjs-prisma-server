import { V4Options, v4 as uuidv4 } from 'uuid';

export const uuid = (options?: V4Options) => uuidv4(options);
