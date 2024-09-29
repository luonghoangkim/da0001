"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Select, Tooltip } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { usePathname, useRouter } from "@/i18n/routing";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const HeaderComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const [username, setUsername] = useState('');
    const commonLanguage = useTranslations('CommonLanguage');


    const fetchUserFromToken = () => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                const decodedToken = jwt.decode(token) as JwtPayload | null;
                if (decodedToken && typeof decodedToken !== 'string') {
                    // console.log({decodedToken})
                    setUsername(decodedToken.account_name);
                }
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    useEffect(() => {
        fetchUserFromToken();
    }, []);

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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #f1f1f1',
                }}
            >
                {/* Left Side - User Info */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                    <div style={{ marginLeft: "8px", color: "black" }}>
                        <div>{commonLanguage("hello")} {username}</div>
                    </div>
                </div>

                {/* Right Side - Language Selector */}
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
