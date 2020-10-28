interface IFrom {
  addrees: string;
  name: string;
}

interface IMailConfigs {
  driver: 'ethereal' | 'ses';
  default: {
    from: IFrom;
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  default: {
    from: {
      addrees: 'jhonasnunes425@jhonnasnunes.com',
      name: 'Jhonnas Keven',
    },
  },
} as IMailConfigs;
