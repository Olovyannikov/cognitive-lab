import { ColorSchemeScript } from '@mantine/core';

export const HeadDefault = () => (
    <>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        <meta name='description' content='Cognitive Lab' />
        <link rel='icon' href='/logo.svg' />
        {import.meta.env.PROD && (
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(101022771, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        })
            `,
                }}
            ></script>
        )}
        <ColorSchemeScript />
    </>
);
