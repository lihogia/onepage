export default function About() {

    return (
        <div className="aboutSection">
            <h2>About the App</h2>
            <p>This is the 1st step in my journey to fulfill the dream of developing cool & useful features.</p>
            <p><b>OnePage</b> is a Single Web Page Application which includes all entries to user&#39;s online resources.</p>
            <p>This will help user to save time and get to their daily work ASAP. And it is totally free.</p>
            <p>Hope you all enjoy using it !!! To support <b>OnePage</b>, you can <a href="https://www.buymeacoffee.com/lilogia">buy me a coffee</a>.</p>
            <p>All feedback are welcome! Please contact me at <a href="mailto:lilogia@gmail.com">lilogia</a>.</p>
            <br/>
            <h3>Releases</h3>
            <h4>Delta 0.5.0 - 2023.November</h4>
            <ul>
                <li>Browse Resources (Links and Search with Simple & RegExp) with links&#39; logo.</li>
                <li>CRUD for Resources in Categories, Sub Categories, Utils .</li>
                <li>Responsive for Mobile & Desktop view.</li>
                <li>Import & Export data (resources) for Local Storage in Browser.</li>
                <li>Default resources provided if there is no Local Storage.</li>
            </ul>
        </div>
    );

}