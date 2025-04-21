import { ChatDots, InstagramLogo, TelegramLogo, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';

export const OWNER_INFO = [
    {
        id: 0,
        label: 'ИП Меренков Даниил Николаевич',
    },
    {
        id: 1,
        label: 'ИНН: 781304623016',
    },
    {
        id: 2,
        label: 'ОГРНИП: 322784700181787',
    },
];
export const CONTACTS = [
    {
        id: 0,
        label: <a href='/help'>Написать в службу поддержки</a>,
        icon: <ChatDots size={24} />,
    },
    {
        id: 1,
        label: (
            <a rel='noopener noreferrer' target='_blank' href='https://api.whatsapp.com/send/?phone=79043330809'>
                Поддержка в WhatsApp
            </a>
        ),
        icon: <WhatsappLogo size={24} />,
    },
    {
        id: 2,
        label: (
            <a rel='noopener noreferrer' target='_blank' href='https://t.me/cognitivelab_ru'>
                Поддержка в Telegram
            </a>
        ),
        icon: <TelegramLogo size={24} />,
    },
    {
        id: 3,
        label: (
            <a rel='noopener noreferrer' target='_blank' href='https://www.instagram.com/cognitivelab.ru'>
                Новости в Instagram*
            </a>
        ),
        icon: <InstagramLogo size={24} />,
    },
];

export const MENU = [
    {
        id: 4,
        label: <a href='/'>Главная</a>,
    },
    {
        id: 3,
        label: <a href='/#tariffs'>Тарифы</a>,
    },
    {
        id: 0,
        label: <a href='/types'>Типы личности</a>,
    },
    {
        id: 1,
        label: <a href='/blog'>Блог</a>,
    },
    {
        id: 2,
        label: <a href='/faq'>Ответы на вопросы</a>,
    },
];

export const DOCS = [
    {
        id: 0,
        label: (
            <a
                rel='noopener noreferrer'
                target='_blank'
                href='https://storage.yandexcloud.net/cognitive-lab-public/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8.pdf'
            >
                Политика конфиденциальности
            </a>
        ),
    },
    {
        id: 1,
        label: (
            <a
                target='_blank'
                href='https://storage.yandexcloud.net/cognitive-lab-public/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%20%D0%BE%D1%84%D0%B5%D1%80%D1%82%D1%8B.pdf'
                rel='noreferrer'
            >
                Публичная оферта
            </a>
        ),
    },
    {
        id: 2,
        label: `© ${new Date().getFullYear()} CognitiveLab • Cognitive Lab • КогнитивЛаб`,
    },
];
