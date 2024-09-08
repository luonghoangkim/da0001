'use client'
import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image'

const Home = () => {
  const t = useTranslations('Home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white via-blue-200 to-blue-500">
      <div className="absolute inset-0">
        <Image
          src="/banner_wellcome.jpeg"
          layout="fill"
          objectFit="cover"
          alt="Background Image"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-6">
          {t('welcomeMessage')}
        </h1>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/login">
            <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-purple-100 transition duration-300">
              {t('goToLogin')}
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;