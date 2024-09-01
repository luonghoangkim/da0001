import { Button } from "antd";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Home() {
  const t = useTranslations('Login');
  return (
    <div>
    <h1>{t('login')}</h1>
    <Link href="/about">{t('username')}</Link>
  </div>
  );
}