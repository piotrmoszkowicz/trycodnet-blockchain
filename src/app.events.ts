import { EventEmitter } from "events";
import { StrictEventEmitter } from "nest-emitter";

interface AppEvents {
  newWallet: (wallet: string) => void;
}

export type MyEventEmitter = StrictEventEmitter<EventEmitter, AppEvents>;
