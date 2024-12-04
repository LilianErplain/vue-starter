export const datetimeFormats = {
  'en': {
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
  'fr': {
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