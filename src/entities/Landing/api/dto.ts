export interface StatisticsAndTrust {
    primary_text: string;
    secondary_text: string;
}

export type MainPageResponse = {
    statistics_and_trust: StatisticsAndTrust[];
}[];
