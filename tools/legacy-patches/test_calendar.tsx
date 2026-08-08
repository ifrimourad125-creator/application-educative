export const CalendarNov = () => (
  <div className="relative flex flex-col items-center justify-start w-[1em] h-[1em] bg-white rounded-[0.15em] shadow-[inset_0_-0.05em_0_rgba(0,0,0,0.2),_0_0.05em_0.1em_rgba(0,0,0,0.1)] overflow-hidden border-[0.02em] border-slate-200">
    <div className="bg-[#ff3b30] w-full h-[0.28em] flex items-center justify-center relative">
       <div className="absolute top-[-0.05em] flex justify-around w-full px-[0.1em]">
         <div className="w-[0.08em] h-[0.15em] bg-slate-300 rounded-full border border-slate-400"></div>
         <div className="w-[0.08em] h-[0.15em] bg-slate-300 rounded-full border border-slate-400"></div>
       </div>
       <span className="text-white text-[0.16em] font-bold uppercase mt-[0.05em]">Nov</span>
    </div>
    <div className="flex-1 flex flex-col justify-center items-center w-full p-[0.1em]">
      <div className="w-[0.6em] h-[0.4em] flex flex-wrap gap-[0.05em] justify-center items-center">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`w-[0.1em] h-[0.08em] rounded-[0.02em] ${i === 7 ? 'bg-sky-500' : 'bg-slate-300'}`}></div>
        ))}
      </div>
    </div>
  </div>
);
