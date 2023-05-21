import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import "./BarcodeScanner.css";

export default function BarcodeScanner({fps, qrbox, aspectRatio, qrCodeSuccessCallback, qrCodeErrorCallback}){

    useEffect(() => {
        // when component mounts
        const config = {fps, qrbox, aspectRatio};
        const verbose = false;
        const qrcodeRegionId = "html5qr-code-full-region";
        // Suceess callback is required.
        if (!(qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div id="html5qr-code-full-region" className="m-2" />
    );
};
