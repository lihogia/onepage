export default function About() {

    return (
        <div className="aboutSection">
            <h2>About the App</h2>
            {/*
            <p>This is the first step in my journey to fulfill the dream of developing convenient & useful features.</p>
            */}
            <p><b>OnePage</b> is a Single Web Page Application which holds all entries to user&#39;s online resources.</p>
            <p>This will help the user to save time and get on with their daily work ASAP. And it is totally free.</p>
            <p>I hope you all enjoy using it !!! To support <b>OnePage</b>, you can <a href="https://www.buymeacoffee.com/lilogia">buy me a coffee</a>.</p>
            <p>All feedback is welcome! Please contact me at <a href="mailto:lilogia@gmail.com">lilogia</a>.</p>
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