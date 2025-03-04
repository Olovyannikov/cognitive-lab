import { About, ForWhom, Hero, HowItHelps, HowItWorks, PeopleTalk, Statistics, Tariffs, WhyUs } from './ui';

export const IndexPage = () => {
    return (
        <>
            <Hero />
            <About />
            <Statistics />
            <ForWhom />
            <HowItHelps />
            <Tariffs />
            <HowItWorks />
            <WhyUs />
            <PeopleTalk />
        </>
    );
};
