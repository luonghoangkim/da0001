import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Form, Select } from 'antd';
import { useTranslations } from 'next-intl';
import { CREDIT_CARD_SERVICE } from "@/service/credit-card/credit-card-service";
import { Bank } from "@/models/card-modal/credit-card.modal";

const { Option } = Select;

interface BankSelectedComponentProps {
    initialCardCode?: string;
}

const BankSelectedComponent: React.FC<BankSelectedComponentProps> = ({ initialCardCode }) => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
    const t = useTranslations('CreditCard');

    const handleSearchBank = async () => {
        try {
            const response = await CREDIT_CARD_SERVICE.getBank();
            const bankData = response.data;
            setBanks(bankData);
            setFilteredBanks(bankData);
        } catch (error) {
            console.error('Error during call:', error);
            toast.error(t('fetchError'));
        }
    };

    useEffect(() => {
        handleSearchBank();
    }, []);

    const handleSearch = (value: string) => {
        if (value) {
            const filteredData = banks.filter((bank) =>
                bank.name.toLowerCase().includes(value.toLowerCase()) ||
                bank.code.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBanks(filteredData);
        } else {
            setFilteredBanks(banks);
        }
    };

    const handleClear = () => {
        setFilteredBanks(banks);
    };

    return (
        <div>
            <Form.Item
                name="card_code"
                label={t('bankName')}
                rules={[{ required: true, message: t('pleaseEnterBankName') }]}
                initialValue={initialCardCode}
            >
                <Select
                    showSearch
                    placeholder={t('pleaseEnterBankName')}
                    allowClear
                    onSearch={handleSearch}
                    onClear={handleClear}
                    onChange={(value) => {
                        if (!value) handleClear();
                    }}
                    filterOption={false}
                >
                    {filteredBanks.map((bank) => (
                        <Option key={bank.id} value={bank.code}>
                            {`${bank.name} - ${bank.code}`}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </div>
    );
};

export default BankSelectedComponent;