import { createEvent, createStore, sample } from 'effector';

import { TestModel } from '@/entities/Test';

const $currentPhrases = TestModel.$currentQuestion.map((question) => ({
    hints: [question?.hint, ...(question?.rephrasing?.map((phrase) => phrase.hint) ?? [])].filter(Boolean),
    texts: [question?.text, ...(question?.rephrasing?.map((phrase) => phrase.text) ?? [])].filter(Boolean),
}));
const $currentPhraseIndex = createStore(0);
const changePhraseIndex = createEvent();

$currentPhraseIndex.reset(TestModel.formPageChanged);

sample({
    clock: changePhraseIndex,
    source: { index: $currentPhraseIndex, phrases: $currentPhrases },
    fn: ({ index, phrases }) => {
        const phrasesLen = phrases.texts.length;
        if (index >= phrasesLen - 1) return 0;
        return index + 1;
    },
    target: $currentPhraseIndex,
});

export const RephrasingModel = {
    $currentPhrases,
    $currentPhraseIndex,
    changePhraseIndex,
};
