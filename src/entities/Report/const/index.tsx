import type { ReactNode } from 'react';
import {
    Brain,
    Briefcase,
    ChartLineUp,
    Handshake,
    Heart,
    PuzzlePiece,
    Scales,
    Shapes,
    SketchLogo,
    Star,
    ThumbsUp,
    Trophy,
    UserSquare,
    Vibrate,
} from '@phosphor-icons/react/dist/ssr';

export const getIconsMap = (isLarge?: boolean): Record<string, ReactNode> => ({
    Введение: <Heart size={isLarge ? 32 : 20} />,
    'Ваш психологический портрет': <UserSquare size={isLarge ? 32 : 20} />,
    'Ключевые черты вашего характера': <SketchLogo size={isLarge ? 32 : 20} />,
    'Как вы думаете и принимаете решения': <Brain size={isLarge ? 32 : 20} />,
    'Ваш карьерный путь': <Briefcase size={isLarge ? 32 : 20} />,
    'Сильные и слабые стороны': <ThumbsUp size={isLarge ? 32 : 20} />,
    'Ваш стиль общения и взаимодействия с другими': <Shapes size={isLarge ? 32 : 20} />,
    'Ловушки вашего разума - как их распознать и преодолеть': <PuzzlePiece size={isLarge ? 32 : 20} />,
    'Как стресс влияет на ваши решения': <Vibrate size={isLarge ? 32 : 20} />,
    'Как сохранить внутренний баланс и энергию': <Scales size={isLarge ? 32 : 20} />,
    'Знаменитости, похожие на вас': <Star size={isLarge ? 32 : 20} />,
    'Как вы строите отношения с окружающими': <Handshake size={isLarge ? 32 : 20} />,
    'Личный план развития': <ChartLineUp size={isLarge ? 32 : 20} />,
    Заключение: <Trophy size={isLarge ? 32 : 20} />,
});
