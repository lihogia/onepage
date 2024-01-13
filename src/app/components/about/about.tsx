import { FormattedMessage, useIntl } from 'react-intl';

export default function About() {

    const intl = useIntl();
    const msgH2 = intl.formatMessage({id: 'about.h2'});
    const value1: any = {
        bold: (str: string) => <b>{str}</b>
    };
    const value3: any = {
        bold: (str1: string) => <b>{str1}</b>,
        link: (str2: string) => <a href='https://www.buymeacoffee.com/lilogia'>{str2}</a>
    };
    const value4: any = {
        link: (str: string) => <a href='mailto:lilogia@gmail.com'>{str}</a>
    };
    const msgP1 = intl.formatMessage({id: 'about.p1'}, value1);
    const msgP2 = intl.formatMessage({id: 'about.p2'});
    const msgP3 = intl.formatMessage({id: 'about.p3'}, value3);
    const msgP4 = intl.formatMessage({id: 'about.p4'}, value4);

    return (
        <div className="aboutSection">
            <h2>{msgH2}</h2>
            {/*
            <p>This is the first step in my journey to fulfill the dream of developing convenient & useful features.</p>

            <p1><b>OnePage</b> is a Single Web Page Application which holds all entries to user&#39;s online resources.</p>
            <p>This will help the user to save time and get on with their daily work ASAP. And it is totally free.</p>
            <p>I hope you all enjoy using it !!! To support <b>OnePage</b>, you can <a href="https://www.buymeacoffee.com/lilogia">buy me a coffee</a>.</p>
            <p>All feedback is welcome! Please contact me at <a href="mailto:lilogia@gmail.com">lilogia</a>.</p>            
            */}
            <p>{msgP1}</p>
            <p>{msgP2}</p>
            <p>{msgP3}</p>
            <p>{msgP4}</p>
            <br/>
            <h3>Releases</h3>
            <h4>Delta 0.5.0 - 2023.November</h4>
            <ul>
                <li>Browse Resources (Links and Search with Simple & RegExp) through a links&#39; logo.</li>
                <li>CRUD Resources in Categories, Sub-Categories and Utilities .</li>
                <li>Responsive Mobile & Desktop view.</li>
                <li>Import & Export data (resources) to/from Local Storage in Browser.</li>
                <li>Default resources provided if there is no Local Storage.</li>
            </ul>
        </div>
    );

}