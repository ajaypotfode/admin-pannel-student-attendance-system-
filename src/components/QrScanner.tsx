import { useEffect, useRef, useState } from "react";
// import QrScanner from "../";
import QrScanner from "qr-scanner";
import { Button } from "./ui/button";


const QRScanner = ({ onScan }: { onScan: (text: string) => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const scannerRef = useRef<QrScanner | null>(null);
    const [scanning, setScanning] = useState<boolean>(false)

    // const scannerRef=user

    useEffect(() => {
        if (!videoRef.current) return;

        const scanner = new QrScanner(
            videoRef.current,
            (result) => {
                console.log("Scanned:", result);
                onScan(result.data);
                scanner.stop();
                setScanning(false)
            },
            {
                returnDetailedScanResult: true,
                highlightScanRegion: true,
                preferredCamera: "environment",
                // workPath: '/qr-scanner-worker.min.js'
            }
        );

        scanner.start().then(() => {
            scannerRef.current = scanner;
            setScanning(true)
        }).catch(console.error);

        return () => {
            scanner.stop()
            setScanning(false)
        };
    }, []);


    const restartScanner = () => {
        if (scannerRef.current && !scanning) {
            scannerRef.current?.start()
            setScanning(true)
        }
    }

    const stopScanner = async () => {
        if (scannerRef.current && scanning) {
            await scannerRef.current?.stop()
            // scannerRef.current.destroy()
            setScanning(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 relative ">
            <video ref={videoRef} className="smallsc1:w-[400px] smallsc1:h-[400px] xl:w-[300px] xl:h-[300px] w-[250px] h-[250px] rounded border" />
            <div className="flex gap-6">
                <Button onClick={stopScanner} className="smallsc1:text-sm text-[12px] border bg-white text-black hover:bg-gray-400 ">stop Scanner</Button>
                <Button onClick={restartScanner} className="smallsc1:text-sm text-[12px]  border bg-white text-black hover:bg-gray-400">Start Scanner</Button>
            </div>
        </div>
    );
};

export default QRScanner;
