import { ColorSchemeScript } from '@mantine/core';

export const HeadDefault = () => (
    <>
        <link rel='icon' href='/logo.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        {import.meta.env.PROD && (
            <>
                <link rel='canonical' href='https://cognitivelab.ru/' />
                <meta property='og:locale' content='ru_RU' />
                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:title' content='CognitiveLab — тест на тип личности и выбор профессии' />
                <meta name='twitter:description' content='AI-ассистент для вашего карьерного пути' />
                <meta property='og:type' content='website' />
                <meta property='og:title' content='CognitiveLab — AI-тест на тип личности (КогнитивЛаб)' />
                <meta
                    property='og:description'
                    content='Узнайте свой тип личности и получите советы по карьере с помощью ИИ.'
                />
                <meta property='og:url' content='https://cognitivelab.ru/' />
                <meta
                    property='og:image'
                    content='https://storage.yandexcloud.net/cognitive-lab-public/assets/og_image.jpg'
                />
                <meta
                    name='twitter:image'
                    content='https://storage.yandexcloud.net/cognitive-lab-public/assets/og_image.jpg'
                />
                <meta
                    name='keywords'
                    content='CognitiveLab, тип личности, тест на личность, тест на тип личности, MBTI, 16 типов личности, выбор профессии, карьерное ориентирование, AI, искусственный интеллект, карьерные рекомендации'
                />
                <meta name='robots' content='index, follow' />
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
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3668956", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
              if (d.getElementById(id)) return;
              var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
              ts.src = "https://top-fwz1.mail.ru/js/code.js";
              var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
              if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "tmr-code");
            `,
                    }}
                ></script>
                <noscript>
                    <div>
                        <img
                            src="https://top-fwz1.mail.ru/counter?id=3668956;js=na"
                            style={{ position: 'absolute', left: '-9999px' }}
                            alt="Top.Mail.Ru"
                        />
                    </div>
                </noscript>
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: `
                        {
                        "@context": "https://schema.org ",
                        "@type": "Organization",
                        "name": "CognitiveLab",
                        "alternateName": ["Cognitive Lab","Cognitivelab","Когнитив Лаб","Когнитивлаб"],
                        "url": "https://cognitivelab.ru/ ",
                        "logo": "https://cognitivelab.ru/static/logo.png"
                    }
                        `,
                    }}
                ></script>
            </>
        )}
        <ColorSchemeScript />
    </>
);