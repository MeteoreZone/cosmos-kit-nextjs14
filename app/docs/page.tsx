'use client';
import { Connect } from "@/components/wallet/Connect";
export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
     
      <div className="container text-center">
      <div className='p-8'> This is another page placeholder for addtional docs</div>
      <Connect></Connect>
      </div>
    </main>
  )
}
