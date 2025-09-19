import { Loader2 } from "lucide-react";

export default function LoadingPage() {
    return (
        <div className="h-screen w-screen flex items-center justify-center min-h-screen bg-gradient-to-bl to-gray-900 from-10% from-blue-950 to-40% ">
            <div className="flex flex-col items-center justify-center p-10 rounded-2xl shadow-2xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                        QR
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Student Attendance</h1>
                    </div>
                </div>
                <Loader2 className="h-10 w-10 text-indigo-400 animate-spin" />

                <p className="mt-4 text-slate-300">Loading your dashboard...</p>
            </div>
        </div>
    );
}
