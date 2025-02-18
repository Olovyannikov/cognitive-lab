export interface Option {
    id: string;
    text: string;
    order: number;
    requires_input?: boolean;
}

export interface Rephrasing {
    hint: string;
    text: string;
}

export interface ScaleChoiceAnswer {
    value: number;
}

export interface MultiChoiceAnswer {
    value: string;
    input?: string;
}

export interface SingleChoiceAnswer {
    value: string;
    input?: string;
}

export interface PreparedAnswer {
    question: string;
    answer: ScaleChoiceAnswer | SingleChoiceAnswer | SingleChoiceAnswer[] | MultiChoiceAnswer[];
    index: number;
    isMultiple?: boolean;
    isSingle?: boolean;
}

export interface Answers {
    answers: PreparedAnswer[];
}
