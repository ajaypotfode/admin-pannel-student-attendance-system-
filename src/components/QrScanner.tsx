
import { Scanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react';
import { Button } from './ui/button';


const QRScanner = ({ onScan }: { onScan: (text: string) => void }) => {
    const [isScanner, setIsScanner] = useState(false);
    return (
        <>
            <div className='border border-red w-[300px] h-[400px]'>
                {
                    isScanner && <Scanner
                        onScan={(value) => {
                            //    if (value) {
                            onScan(value[0].rawValue)
                            //    }
                        }}

                    />
                }
            </div>
            <div className='flex space-x-4 mt-4'>
                <Button className="bg-white text-black hover:bg-gray-400" onClick={() => setIsScanner(true)}>Start</Button>
            <Button className="bg-white text-black hover:bg-gray-400" onClick={() => setIsScanner(false)}>Stop</Button>
            </div>

        </>


    );
};

export default QRScanner;
