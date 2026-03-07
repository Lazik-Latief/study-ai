// export default function Home() {
//   return (
//     <main className="flex items-center justify-center h-screen">
//       <h1 className="text-5xl font-bold text-blue-500">
//   StudyFlow AI
// </h1>
//     </main>
//   );
// }

"use client";

import { supabase } from "@/lib/supabase/client";

export default function Home() {

  async function testConnection() {
    const { data, error } = await supabase.auth.getSession();
    console.log(data, error);
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">StudyFlow AI</h1>

      <button
        onClick={  () => {
          testConnection();
          // console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
        }
      }
        className="px-4 py-2 bg-black text-white rounded"
      >
        Test Supabase
      </button>
      
    </main>
  );
}