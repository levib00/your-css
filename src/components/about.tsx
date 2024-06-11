const About = () => {
  return (
    <div className='about-page'>
      <div className='about-links'>
        <a href='https://github.com/levib00/your-css'>Source Code</a>
        <a href='https://github.com/levib00/your-css/issues'>Bugs & Reports</a>
        <a href="https://github.com/levib00/your-css/releases">Releases</a>
        <a href='https://www.buymeacoffee.com/levib00'>Buy Me A Coffee</a>
      </div>
      <div className='about-images'>
        <a href='https://github.com/levib00/your-css'>
          <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m3.77324649 16.1599727c-.81940689-1.05962-1.06364421-1.405587-1.24948407-1.7448892-.02396021-.0439455-.02396021-.0439455-.03965307-.0727538-.05297217-.0958877-.08824467-.160324-.12245098-.2259692-.05534075-.1062044-.10138602-.2035201-.1405206-.3009321-.17343002-.4316939-.20631958-.8122184.07007589-1.16443.48588713-.6191675 1.27375697-.4454394 1.93807953.1225309.42790027.3658383 1.06572061 1.0206423 1.45461018 1.486175.25541571.3057536.72031773.6213626 1.05957509.7340164.03550419.0117895.06906563.0207666.10102847.0270572l.17731974-.5597951c-.68834661-.2423065-1.31187019-.5639434-1.86875346-.965216-1.29912836-.9361109-2.4303665-2.7724691-2.33338865-4.17391481.06126198-.88530891.36044022-1.75242403.8896007-2.59611228-.04837619-.48350645-.07276312-.89547061-.07276312-1.23800584 0-.48864843.16034201-1.02008439.46704653-1.60283703.11085078-.21062156.32767855-.34523139.5668267-.35189423.55120766-.01535704 1.08439218.04135003 1.59786546.1705528.4547538.11442748.93553609.31646605 1.44500043.6040767.76204212-.15801516 1.50066522-.23736875 2.21555718-.23736875.71694726 0 1.46340296.07981024 2.23919146.23866998.6623179-.37129464 1.2439283-.62340724 1.7521251-.75497964.6607934-.17107975 1.2536332-.12084866 1.7429189.18202311.067354.04169266.1265939.09510217.1748797.15766809.2996148.38822278.4663869.90339382.520753 1.53848537.0414576.48429643.0262594.9653283-.045572 1.44205438.4333386.65130388.714564 1.48321651.8534319 2.4907188.2264309 1.64278045-.524496 3.33562145-1.7176315 4.31079335-.5560976.454509-1.3203048.8112259-2.2938118 1.0810017.0615599.2153097.1056964.4304561.1321663.645318.0436564.3543679.0745609 1.3042173.0954314 2.8890764 1.1018459-.573209 1.9576733-1.1395622 2.5656894-1.6939483 1.0342749-.9430469 1.8147932-2.2815868 2.3227002-3.8352461.4248239-1.2995127.5070992-2.3965043.2964567-3.60587144-.2561834-1.47083276-.6262314-2.66884635-1.1840043-3.63150321-.651937-1.12517422-1.69186-2.18918246-2.9354976-2.96771899-1.1907442-.74542444-3.1202124-1.24441722-4.64022776-1.24441722-1.59589553 0-3.38207308.51700109-4.73647195 1.47247445-1.31852457.93016549-2.41039771 2.32934156-3.04354965 3.70334344-.50117996 1.08760973-.70674691 2.24637896-.70674691 3.95757707 0 1.3859952.50375352 3.0702433 1.09791735 4.1242132.46905181.8320373 1.13464699 1.6206448 2.11365057 2.4764465.49336811.4312806 1.19078993.8625018 2.09046789 1.2884057v-.4225978c-1.20497243-.2800403-2.16326595-.8644332-2.84983835-1.7522775zm-.35706657-2.9221003c-.00012415-.0029923-.00031133-.0059179-.00055817-.0087738.00008503.0009838.00026691.0022487.00054756.0037834zm1.4046669 2.1225762c.57092826.7382986 1.41131869 1.1910916 2.55938943 1.359754.3239542.0475919.56389762.3238044.56389762.6491345v1.9736991c0 .4674937-.47807841.7850409-.91294137.60639-1.47493475-.6059343-2.59732145-1.2411812-3.37125546-1.9177201-1.08592486-.9492675-1.84719498-1.8512322-2.39357286-2.820436-.69825194-1.2386088-1.26636418-3.1380336-1.26636418-4.7654875 0-1.88579599.23773494-3.22589431.82662847-4.50385111.72452463-1.57228959 1.95901556-3.1542226 3.47985039-4.22710977 1.5880727-1.12032074 3.64200319-1.71482172 5.50133868-1.71482172 1.75836236 0 3.93177306.5620804 5.34451436 1.44647849 1.4236976.89125694 2.6156432 2.1108086 3.3761344 3.42333585.6483995 1.11906893 1.060497 2.4532158 1.3407867 4.0624504.2475 1.42097826.1490342 2.73384036-.3417138 4.23501126-.5731333 1.7531829-1.4660953 3.2845568-2.6858776 4.3967484-.8814726.8037224-2.1557849 1.5911643-3.8265721 2.3726894-.4357429.2038224-.9374889-.1092546-.9418725-.587705-.0196863-2.1486309-.0536691-3.4341111-.0972125-3.7875622-.0393464-.3193827-.1376949-.6487812-.297439-.9893901-.1791966-.3820855.0455248-.8305186.4604236-.9187788 1.1442002-.2434023 1.9684986-.5806637 2.470622-.9910586.8539905-.6979824 1.4092905-1.9498147 1.2480997-3.11927154-.1276126-.92584344-.386948-1.62598464-.7639374-2.10766169-.1174855-.1501105-.1636506-.34346802-.1265418-.53000632.0894169-.44948002.1144563-.90286095.0751573-1.36194208-.0279614-.3266385-.0925853-.57282814-.1831627-.74225151-.1451987-.04813175-.3413239-.04567213-.6059412.02283742-.4304938.11145506-.9808005.35927823-1.6408878.74533761-.1449701.08478737-.3170424.11142806-.4811085.0744865-.7745973-.17441041-1.5086741-.26109649-2.20247026-.26109649-.69315801 0-1.41921685.08652808-2.17860722.26053919-.16803871.03850537-.34457253.01019672-.49188191-.07887731-.49070107-.29671378-.93019083-.49186021-1.31442867-.5885441-.27040849-.06804156-.54913523-.11000375-.8367262-.12574697-.10127991.25096244-.14960327.46447539-.14960327.63771206 0 .34260305.02961626.78640288.08946494 1.32812479.01697352.15363617-.02118671.30829368-.10775534.43671575-.48811714.72410774-.75199978 1.44166862-.8016577 2.15928489-.06124742.8850984.82683358 2.3267355 1.79109016 3.0215484.59474022.428551 1.29091469.7494685 2.09260878.9620666.36347731.0963891.57263705.4744616.45971175.8309646l-.50256869 1.5866001c-.0606021.1913197-.20595183.3445994-.39457789.4161052-.4010694.1520405-.82925259.1520405-1.25919614.0092735-.57238926-.1900675-1.24446299-.6463196-1.65736627-1.1405987-.10106889-.1209878-.22316828-.2584996-.35457953-.4003823.13605246.1800523.30239105.3969964.50810158.6630119z" fill="#555"/></svg>
        </a>
        <a href='https://www.buymeacoffee.com/levib00'>
        <svg version="1.0" id="katman_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="140 100 320 240" >
          <path className="st0" d="M390.1,137.3l-0.2-0.1l-0.5-0.2C389.5,137.2,389.8,137.3,390.1,137.3z"/>
          <path className="st0" d="M393.4,160.9l-0.3,0.1L393.4,160.9z"/>
          <path className="st0" d="M390.1,137.2C390.1,137.2,390.1,137.2,390.1,137.2C390,137.2,390,137.2,390.1,137.2
            C390.1,137.2,390.1,137.2,390.1,137.2z"/>
          <path className="st0" d="M393.1,160.7l0.4-0.2l0.1-0.1l0.1-0.1C393.5,160.4,393.3,160.6,393.1,160.7z"/>
          <path className="st0" d="M390.7,137.8l-0.4-0.4l-0.3-0.1C390.2,137.5,390.4,137.7,390.7,137.8z"/>
          <path className="st0" d="M297,366.2c-0.3,0.1-0.6,0.3-0.8,0.6l0.2-0.2C296.7,366.4,296.9,366.3,297,366.2z"/>
          <path className="st0" d="M351.5,355.4c0-0.3-0.2-0.3-0.1,0.9c0-0.1,0-0.2,0.1-0.3C351.4,355.9,351.4,355.7,351.5,355.4z"/>
          <path className="st0" d="M345.8,366.2c-0.3,0.1-0.6,0.3-0.8,0.6l0.2-0.2C345.5,366.4,345.7,366.3,345.8,366.2z"/>
          <path className="st0" d="M258.7,368.7c-0.2-0.2-0.5-0.3-0.8-0.4c0.2,0.1,0.5,0.2,0.6,0.3L258.7,368.7z"/>
          <path className="st0" d="M250.2,360.5c0-0.3-0.1-0.7-0.3-1C250,359.8,250.1,360.1,250.2,360.5L250.2,360.5z"/>
          <path className="st1" d="M308,212.8c-11.8,5.1-25.3,10.8-42.7,10.8c-7.3,0-14.5-1-21.5-3l12,123.6c0.4,5.2,2.8,10,6.6,13.5
            c3.8,3.5,8.8,5.5,14,5.5c0,0,17.1,0.9,22.8,0.9c6.1,0,24.5-0.9,24.5-0.9c5.2,0,10.2-1.9,14-5.5c3.8-3.5,6.2-8.3,6.6-13.5l12.9-136.5
            c-5.8-2-11.6-3.3-18.1-3.3C327.7,204.4,318.6,208.3,308,212.8z"/>
          <path className="st0" d="M206.5,160.2l0.2,0.2l0.1,0.1C206.8,160.3,206.7,160.2,206.5,160.2z"/>
          <path className="st0" d="M412.8,148.7l-1.8-9.1c-1.6-8.2-5.3-16-13.7-18.9c-2.7-0.9-5.8-1.4-7.8-3.3c-2.1-2-2.7-5-3.2-7.8
            c-0.9-5.2-1.7-10.4-2.6-15.6c-0.8-4.5-1.4-9.5-3.4-13.5c-2.7-5.5-8.2-8.7-13.7-10.8c-2.8-1-5.7-1.9-8.6-2.7
            c-13.7-3.6-28.1-4.9-42.2-5.7c-16.9-0.9-33.9-0.7-50.8,0.8c-12.6,1.1-25.8,2.5-37.7,6.9c-4.4,1.6-8.9,3.5-12.2,6.9
            c-4.1,4.1-5.4,10.6-2.4,15.7c2.1,3.7,5.7,6.3,9.5,8c4.9,2.2,10.1,3.9,15.4,5c14.8,3.3,30,4.5,45.1,5.1c16.7,0.7,33.4,0.1,50.1-1.6
            c4.1-0.5,8.2-1,12.3-1.6c4.8-0.7,7.9-7.1,6.5-11.4c-1.7-5.3-6.3-7.3-11.4-6.5c-0.8,0.1-1.5,0.2-2.3,0.3l-0.5,0.1
            c-1.8,0.2-3.5,0.4-5.3,0.6c-3.6,0.4-7.2,0.7-10.9,1c-8.1,0.6-16.3,0.8-24.5,0.8c-8,0-16-0.2-24-0.8c-3.7-0.2-7.3-0.5-10.9-0.9
            c-1.7-0.2-3.3-0.4-4.9-0.6l-1.6-0.2l-0.3,0l-1.6-0.2c-3.3-0.5-6.6-1.1-9.9-1.8c-0.3-0.1-0.6-0.3-0.8-0.5s-0.3-0.6-0.3-0.9
            c0-0.3,0.1-0.7,0.3-0.9s0.5-0.4,0.8-0.5h0.1c2.8-0.6,5.7-1.1,8.6-1.6c1-0.2,1.9-0.3,2.9-0.4h0c1.8-0.1,3.6-0.4,5.4-0.7
            c15.6-1.6,31.3-2.2,47-1.7c7.6,0.2,15.2,0.7,22.8,1.4c1.6,0.2,3.3,0.3,4.9,0.5c0.6,0.1,1.2,0.2,1.9,0.2l1.3,0.2
            c3.7,0.5,7.3,1.2,11,2c5.4,1.2,12.3,1.6,14.7,7.4c0.8,1.9,1.1,3.9,1.5,5.9l0.5,2.5c0,0,0,0.1,0,0.1c1.3,5.9,2.5,11.8,3.8,17.7
            c0.1,0.4,0.1,0.9,0,1.3c-0.1,0.4-0.3,0.9-0.5,1.2c-0.3,0.4-0.6,0.7-1,0.9c-0.4,0.2-0.8,0.4-1.2,0.4h0l-0.8,0.1l-0.8,0.1
            c-2.4,0.3-4.9,0.6-7.3,0.9c-4.8,0.5-9.6,1-14.4,1.4c-9.6,0.8-19.1,1.3-28.7,1.6c-4.9,0.1-9.8,0.2-14.7,0.2
            c-19.5,0-38.9-1.1-58.2-3.4c-2.1-0.2-4.2-0.5-6.3-0.8c1.6,0.2-1.2-0.2-1.7-0.2c-1.3-0.2-2.7-0.4-4-0.6c-4.5-0.7-8.9-1.5-13.4-2.2
            c-5.4-0.9-10.5-0.4-15.4,2.2c-4,2.2-7.2,5.5-9.3,9.6c-2.1,4.3-2.7,9.1-3.7,13.7c-0.9,4.7-2.4,9.7-1.8,14.5
            c1.2,10.3,8.4,18.7,18.8,20.6c9.8,1.8,19.6,3.2,29.5,4.4c38.7,4.7,77.9,5.3,116.7,1.7c3.2-0.3,6.3-0.6,9.5-1c1-0.1,2,0,2.9,0.3
            c0.9,0.3,1.8,0.9,2.5,1.6c0.7,0.7,1.2,1.5,1.6,2.5c0.3,0.9,0.5,1.9,0.4,2.9l-1,9.6c-2,19.3-4,38.6-5.9,58
            c-2.1,20.3-4.1,40.6-6.2,60.9c-0.6,5.7-1.2,11.4-1.8,17.1c-0.6,5.6-0.6,11.4-1.7,17c-1.7,8.7-7.6,14.1-16.2,16.1
            c-7.9,1.8-16,2.7-24.1,2.8c-9,0-18-0.3-27-0.3c-9.6,0.1-21.4-0.8-28.8-8c-6.5-6.3-7.4-16.1-8.3-24.6c-1.2-11.2-2.4-22.5-3.5-33.7
            l-6.5-62.5l-4.2-40.5c-0.1-0.7-0.1-1.3-0.2-2c-0.5-4.8-3.9-9.5-9.3-9.3c-4.6,0.2-9.8,4.1-9.3,9.3l3.1,30l6.5,62
            c1.8,17.6,3.7,35.2,5.5,52.9c0.4,3.4,0.7,6.8,1.1,10.1c2,18.5,16.1,28.4,33.6,31.2c10.2,1.6,20.6,2,31,2.1
            c13.3,0.2,26.7,0.7,39.7-1.7c19.3-3.5,33.8-16.4,35.9-36.5c0.6-5.8,1.2-11.6,1.8-17.3c2-19.1,3.9-38.2,5.9-57.4l6.4-62.5l2.9-28.6
            c0.1-1.4,0.7-2.8,1.7-3.8s2.2-1.8,3.6-2c5.5-1.1,10.8-2.9,14.7-7.1C413.8,166.2,415,157.5,412.8,148.7z M205,154.9
            c0.1,0-0.1,0.7-0.1,1C204.8,155.4,204.8,154.9,205,154.9z M205.5,159c0,0,0.2,0.1,0.3,0.4C205.6,159.2,205.5,159,205.5,159
            L205.5,159z M206,159.7C206.2,160.1,206.3,160.3,206,159.7L206,159.7z M207.1,160.6L207.1,160.6
            C207.1,160.6,207.2,160.6,207.1,160.6C207.1,160.6,207.1,160.6,207.1,160.6L207.1,160.6z M392.5,159.3c-2,1.9-5,2.8-7.9,3.2
            c-33.1,4.9-66.8,7.4-100.3,6.3c-24-0.8-47.7-3.5-71.5-6.8c-2.3-0.3-4.8-0.8-6.4-2.5c-3-3.2-1.5-9.7-0.7-13.7
            c0.7-3.6,2.1-8.4,6.4-8.9c6.6-0.8,14.4,2,20.9,3c7.9,1.2,15.9,2.2,23.8,2.9c34,3.1,68.7,2.6,102.5-1.9c6.2-0.8,12.3-1.8,18.5-2.9
            c5.5-1,11.5-2.8,14.8,2.8c2.3,3.9,2.6,9,2.2,13.4C394.8,156.2,393.9,158,392.5,159.3L392.5,159.3z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default About;
