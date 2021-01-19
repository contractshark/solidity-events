/***********
generated template classes for ./src/event4solidity.xsd 1/19/2021, 1:47:22 PM
***********/
import * as event4sol from "";
export declare class Event4solidity {
    eventSet: EventSet;
    response: Response;
    eventType: EventType;
    throwableType: ThrowableType;
    locationType: LocationType;
    stacktraceType: StacktraceType;
    levelType: levelType;
    stateType: stateType;
    constructor(props?: Event4solidity);
}
export declare class EventSet {
    event?: event4sol.eventType[];
    constructor(props?: EventSet);
}
export declare class Response {
    message?: string;
    throwable?: event4sol.throwableType;
    constructor(props?: Response);
}
export declare class EventType {
    message: string;
    throwable?: event4sol.throwableType;
    constructor(props?: EventType);
}
export declare class ThrowableType {
    message: string;
    description?: string;
    stacktrace?: event4sol.stacktraceType;
    constructor(props?: ThrowableType);
}
export declare class LocationType {
    fileName: string;
    lineNumber: number;
    class: string;
    method: string;
    constructor(props?: LocationType);
}
export declare class StacktraceType {
    location?: event4sol.locationType[];
    constructor(props?: StacktraceType);
}
declare enum levelType {
    INFO = "INFO",
    DEBUG = "DEBUG",
    WARN = "WARN",
    ERROR = "ERROR",
    TRACE = "TRACE",
    FATAL = "FATAL"
}
declare enum stateType {
    OK = "OK",
    Error = "Error"
}
export {};
