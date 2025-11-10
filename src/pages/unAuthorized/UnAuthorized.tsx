import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center min-h-screen bg-gradient-to-bl to-gray-900 from-10% from-blue-950 to-40% ">
      <div className="flex flex-col items-center p-10 rounded-2xl shadow-2xl bg-slate-800/80 border border-slate-700 max-w-md text-center">
        <Lock className="h-14 w-14 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-white">Access Denied</h1>
        <p className="text-slate-400 mt-2">
          You don’t have permission to view this page.
        </p>
        <p className="text-slate-400">
          Only <span className="text-red-400 font-semibold">Admin</span> can access this section.
        </p>
        <Button className="p-3 text-sm border mt-2 bg-white text-black hover:bg-gray-400 ">
          <Link to='/auth/login' className="">Go To Login</Link>
        </Button>
      </div>
    </div>
  );
}
