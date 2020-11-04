/***********
generated template classes for ./src/event4solidity.xsd 11/4/2020, 2:13:48 AM
***********/

import * as event4sol from "";

export class Event4solidity {
  public eventSet: EventSet;
  public response: Response;
  public eventType: EventType;
  public throwableType: ThrowableType;
  public locationType: LocationType;
  public stacktraceType: StacktraceType;
  public levelType: levelType;
  public stateType: stateType;

  public constructor(props?: Event4solidity) {
    this["@class"] = ".Event4solidity";

    (<any>Object).assign(this, <any>props);
  }
}

export class EventSet {
  public event?: event4sol.eventType[];

  public constructor(props?: EventSet) {
    this["@class"] = ".EventSet";

    (<any>Object).assign(this, <any>props);
  }
}

export class Response {
  public message?: string;
  public throwable?: event4sol.throwableType;

  public constructor(props?: Response) {
    this["@class"] = ".Response";

    (<any>Object).assign(this, <any>props);
  }
}

export class EventType {
  public message: string;
  public throwable?: event4sol.throwableType;

  public constructor(props?: EventType) {
    this["@class"] = ".EventType";

    (<any>Object).assign(this, <any>props);
  }
}

export class ThrowableType {
  public message: string;
  public description?: string;
  public stacktrace?: event4sol.stacktraceType;

  public constructor(props?: ThrowableType) {
    this["@class"] = ".ThrowableType";

    (<any>Object).assign(this, <any>props);
  }
}

export class LocationType {
  public fileName: string;
  public lineNumber: number;
  public class: string;
  public method: string;

  public constructor(props?: LocationType) {
    this["@class"] = ".LocationType";

    (<any>Object).assign(this, <any>props);
  }
}

export class StacktraceType {
  public location?: event4sol.locationType[];

  public constructor(props?: StacktraceType) {
    this["@class"] = ".StacktraceType";

    (<any>Object).assign(this, <any>props);
  }
}

enum levelType {
  INFO = "INFO",
  DEBUG = "DEBUG",
  WARN = "WARN",
  ERROR = "ERROR",
  TRACE = "TRACE",
  FATAL = "FATAL",
}

enum stateType {
  OK = "OK",
  Error = "Error",
}
