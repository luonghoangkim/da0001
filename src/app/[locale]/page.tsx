import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const Home = () => {
  const t = useTranslations('Home');

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>{t('welcomeMessage')}</h1>  
      <p>
        <Link href="/login">
          {t('goToLogin')} 
        </Link>
      </p>
    </div>
  );
};

export default Home;
