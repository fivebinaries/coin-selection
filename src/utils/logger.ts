interface Logger {
  debug: (message: string) => void;
}

const myFormat = ({
  level,
  message,
  label,
  timestamp,
}: {
  level: string;
  message: string;
  label: string;
  timestamp: string;
}): string => {
  return `${timestamp} [${label}] ${level}: ${message}`;
};

export const getLogger = (debug: boolean): Logger => {
  const label = '@fivebinaries/coin-selection';
  return {
    debug: message => {
      if (!debug) return;
      console.debug(
        myFormat({
          level: 'debug',
          message: message,
          timestamp: new Date().toISOString(),
          label,
        }),
      );
    },
  };
};
