import type { PropsWithChildren } from 'react';
import { Text } from '@mantine/core';

import s from './AnswerLabel.module.css';

export const AnswerLabel = ({ children }: PropsWithChildren) => <Text className={s.text}>{children}</Text>;
