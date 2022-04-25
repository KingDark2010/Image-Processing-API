import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, _log: string): string {
    return `Started ${info.totalSpecsDefined} specs`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    customProcessors: [CustomProcessor],
    spec: {
      displayStacktrace: StacktraceOption.PRETTY,
    },
  })
);
