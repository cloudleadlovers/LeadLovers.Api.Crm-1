import { LogText } from '../enums/LogText';

export type LogData = { text: LogText; args: (string | number)[] };
