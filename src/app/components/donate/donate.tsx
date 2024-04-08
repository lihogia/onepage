import Image from "next/image";

export default function Donate() {
    return (
        <div className="donateSection">
            <h2>Donation</h2>
            <p>You can choose to support OnePage by the following options:</p>
            <ul>
                <li> 
                    <a href='https://www.buymeacoffee.com/lilogia' target='_blank'>Buy me a coffee</a>
                </li>
                <li>Donate a drink just by scan QR code:
                    <ul className="qrSection">
                        <li>A cup of coffee - 10,000 VND<br/><br/><Image src='/imgs/QR_10K.jpg' alt='QR Code 10,000 VND' width={200} height={200} /></li>
                        <li>A cup of milk tea - 30,000 VND<br/><br/><Image src='/imgs/QR_30K.jpg' alt='QR Code 30,000 VND' width={200} height={200} /></li>
                        <li>A glass of fruit juice - 50,000 VND<br/><br/><Image src='/imgs/QR_50K.jpg' alt='QR Code 50,000 VND' width={200} height={200} /></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}