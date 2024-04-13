import Image from "next/image";
import { useState } from "react";

export default function Donate() {
    const [qrSelect, setQRSelect] = useState(0);

    return (
        <div className="donateSection">
            <h2>Donation</h2>
            <p>You can choose to support OnePage by the following options:</p>
            <ul>
                <li> 
                    <a href='https://www.buymeacoffee.com/lilogia' target='_blank'>Buy me a coffee</a>
                </li>
                <li>Donate a drink just by scan QR code to transfer money (Vietnam payment only):
                    <ul className="qrSection">
                        <li><select className="inputTextLong" onChange={(e) => {
                            setQRSelect(Number.parseInt(e.target.value));
                        }}>
                            <option value={0}>A cup of coffee - 10K VND</option>
                            <option value={1}>A cup of milk tea - 30K VND</option>
                            <option value={2}>A glass of fruit juice - 50K VND</option>
                        </select>
                        <br/>
                        {qrSelect == 0 && <Image src='/imgs/QR_10K.jpg' alt='QR Code 10,000 VND' width={200} height={200} />}
                        {qrSelect == 1 && <Image src='/imgs/QR_30K.jpg' alt='QR Code 30,000 VND' width={200} height={200} />}
                        {qrSelect ==2 && <Image src='/imgs/QR_50K.jpg' alt='QR Code 50,000 VND' width={200} height={200} />}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}