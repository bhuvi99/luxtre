// @flow
export const ROUTES = {
  ROOT: '/',
  STAKING: '/staking',
  LUX_REDEMPTION: '/lux-redemption',
  NO_WALLETS: '/no-wallets',
  PROFILE: {
    LANGUAGE_SELECTION: '/profile/language-selection',
    TERMS_OF_USE: '/profile/terms-of-use',
    TERMS_OF_USE_FOR_LUXGATE: '/profile/terms-of-use-for-luxgate',
    SEND_LOGS: '/profile/send-logs-choice',
  },
  WALLETS: {
    ROOT: '/wallets',
    PAGE: '/wallets/:id/:page',
    SUMMARY: '/wallets/:id/summary',
    TRANSACTIONS: '/wallets/:id/transactions',
    SEND: '/wallets/:id/send',
    RECEIVE: '/wallets/:id/receive',
    SETTINGS: '/wallets/:id/settings',
    UTILITIES: {
      ROOT: '/wallets/:id/utilities',
      PAGE: '/wallets/:id/utilities/:page',
      POSCALCULATOR: '/wallets/:id/utilities/poscalculator',
      STAKINGCHART: '/wallets/:id/utilities/stakingchart',
    },
    MASTERNODES: {
      ROOT: '/wallets/:id/masternodes',
      PAGE: '/wallets/:id/masternodes/:page',
      MASTERNODESNET: '/wallets/:id/masternodes/masternodesnet',
      MYMASTERNODE: '/wallets/:id/masternodes/mymasternode',
    },
    LSRTOKENS: '/wallets/:id/lsrtokens',
    SMARTCONTRACTS: {
      ROOT: '/wallets/:id/smartcontracts',
      PAGE: '/wallets/:id/smartcontracts/:page',
      CREATESMARTCONTRACT: '/wallets/:id/smartcontracts/createsmartcontract',
      CALLMARTCONTRACT: '/wallets/:id/smartcontracts/callsmartcontract',
      SENDTOMARTCONTRACT: '/wallets/:id/smartcontracts/sendtosmartcontract',
      SOLCOMPILER: '/wallets/:id/smartcontracts/solcompiler',
    }
  },
  
  SETTINGS: {
    ROOT: '/settings',
    GENERAL: '/settings/general',
    TERMS_OF_USE: '/settings/terms-of-use',
    SUPPORT: '/settings/support',
    DISPLAY: '/settings/display',
  },
};
