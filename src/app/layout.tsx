// app/layout.tsx
import {getMessages, getLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';

import './globals.css';
import { getUserLocale } from '@/i18n/locale';

export default async function RootLayout({children}: {children: React.ReactNode}) {



  return (
    <html lang='en'>
      <body>
          {children}

      </body>
    </html>
  );
}
