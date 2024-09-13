"use client";
import React from "react";
import { Select } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from 'next-intl';
import Image from 'next/image'


const HeaderComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const handleLanguageChange = (value: any) => {
        router.replace(pathname, { locale: value });
    };

    return (
        <div>
            <Header
                style={{
                    backgroundColor: '#fff',
                    padding: '0 16px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderBottom: '1px solid #f1f1f1',
                }}
            >
                <Select
                    value={locale}
                    style={{ width: 150 }}
                    onChange={handleLanguageChange}
                    options={[
                        {
                            label: (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image src={"/VNFlag.png"} className="mr-2" alt="Vietnam Flag" width={20} height={15} />
                                    Tiếng Việt
                                </div>
                            ),
                            value: 'vi'
                        },
                        {
                            label: (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image src={'/ENFlag.png'} className="mr-2" alt="UK Flag" width={20} height={15} />
                                    English
                                </div>
                            ),
                            value: 'en'
                        },
                    ]}
                />
            </Header>
        </div>
    );
};

export default HeaderComponent;
