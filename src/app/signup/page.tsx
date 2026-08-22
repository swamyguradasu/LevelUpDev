'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen topo-bg flex items-center justify-center font-mono text-sm text-[#5C7A6B]">
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-[#5C7A6B]/20">
        <div className="w-5 h-5 border-2 border-[#5C7A6B] border-t-transparent rounded-full animate-spin" />
        <span>Redirecting to Developer Sign In...</span>
      </div>
    </div>
  );
}


