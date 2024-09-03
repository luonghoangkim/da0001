// import { Button } from "antd";
// import {useTranslations} from 'next-intl';
// import {Link} from '@/i18n/routing';


// export default function Home() {
//   const t = useTranslations('Login');
//   return (
//     <div>
//     <h1>{t('login')}</h1>
//     <Link href="/about">{t('username')}</Link>
//   </div>
//   );
// }

import {Link} from '@/i18n/routing';

const Home = () => {
  return (
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <h1>Welcome to the Home Page</h1>
        <p>
          <Link href="/signup">
            Go to Sign Up
          </Link>
        </p>
      </div>
  );
};

export default Home;



