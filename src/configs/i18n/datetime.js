import {Language} from "@/configs/i18n/i18n";

export const datetimeFormats = {
  [Language.ENGLISH]: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    },
    custom: {
      year: 'numeric', month: 'long', day: 'numeric'
    }
  },
  [Language.FRENCH]: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
    },
    custom: {
      year: 'numeric', month: 'long', day: 'numeric'
    }
  }
}