import { Activity, CalendarDays, Check, Heart, MapPin, Target, Watch, Users } from 'lucide-react';

type Props = { language: 'en' | 'es' };
export function PerformanceVisual({ language }: Props) {
 const es = language === 'es';
 return <div className="run-performance text-foreground" role="img" aria-label={es ? 'Ilustración de evolución del entrenamiento' : 'Training progress illustration'}>
  <div className="flex items-center justify-between border-b pb-5"><span className="flex items-center gap-2 font-bold"><Activity className="size-4 text-primary" />{es ? 'Evolución del entrenamiento' : 'Training progression'}</span><span className="text-xs text-muted-foreground">{es ? 'Ilustrativo' : 'Illustrative'}</span></div>
  <div className="mt-6 grid grid-cols-3 gap-3">{[[es?'Constancia':'Consistency',CalendarDays],[es?'Rendimiento':'Performance',Heart],[es?'Objetivos':'Goals',Target]].map(([label,Icon])=>{const I=Icon as typeof Activity;return <div key={String(label)} className="border-l-2 border-primary pl-3"><I className="mb-2 size-5 text-primary"/><span className="text-sm font-semibold">{String(label)}</span></div>})}</div>
  <svg viewBox="0 0 500 230" className="mt-6 w-full text-primary" aria-hidden="true"><g stroke="currentColor" opacity=".12">{[40,90,140,190].map(y=><path key={y} d={`M20 ${y}h460`}/>)}</g><g fill="currentColor" opacity=".18">{[45,65,52,92,80,125,110,142,155,166,175,190].map((h,i)=><rect key={i} x={26+i*38} y={210-h} width="21" height={h} rx="3"/>)}</g><path className="run-chart-line" d="M30 170C85 170 85 130 140 142S205 96 252 103 308 54 350 68 405 31 462 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><circle cx="462" cy="24" r="6" fill="currentColor"/></svg>
  <div className="flex justify-between text-xs text-muted-foreground"><span>{es?'Primera carrera':'First run'}</span><span>{es?'Tu próximo objetivo':'Your next goal'} →</span></div>
 </div>
}
export function FunctionVisual({ index, language }: Props & { index: number }) {
 const es=language==='es';
 const labels=es?['Actividad registrada','Plan semanal','Salida y llegada','Garmin Connect · Strava · Apple Health · Coros','Objetivo de distancia','Entrenador ↔ Atleta']:['Activity recorded','Weekly plan','Start & finish','Garmin Connect · Strava · Apple Health · Coros','Distance goal','Coach ↔ Athlete'];
 return <div className="run-function-visual text-primary" aria-label={labels[index]} role="img">
 {index===0&&<><div className="flex justify-between"><Activity/><Check/></div><div className="mt-5 grid grid-cols-3 gap-2 font-mono text-foreground"><span>10.2<small>km</small></span><span>56:26<small>{es?'tiempo':'time'}</small></span><span>5:32<small>/km</small></span></div><svg viewBox="0 0 260 35" className="mt-3 w-full"><path className="run-chart-line" d="M2 29 25 22 45 27 66 10 89 17 110 5 137 14 154 8 180 18 205 6 231 11 258 2" fill="none" stroke="currentColor" strokeWidth="2"/></svg></>}
 {index===1&&<><CalendarDays className="size-5"/><div className="mt-4 grid grid-cols-7 gap-2">{[0,1,2,3,4,5,6].map(i=><div key={i} className={`flex h-16 flex-col justify-end rounded border border-primary/20 p-1 ${i===2||i===5?'bg-primary/15':''}`}><div className={`rounded-sm bg-primary ${i%3===0?'h-3':i%3===1?'h-6':'h-10'}`}/></div>)}</div></>}
 {index===2&&<svg viewBox="0 0 280 140" className="h-32 w-full"><g stroke="currentColor" opacity=".12" fill="none"><path d="M0 40h280M0 80h280M0 120h280M40 0v140M100 0v140M160 0v140M220 0v140"/></g><path className="run-chart-line" d="M60 105 45 65 105 30 200 40 232 94 161 114 60 105" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" fill="none"/><circle cx="60" cy="105" r="8" fill="currentColor"/><MapPin x="47" y="68" width="26" height="26"/></svg>}
 {index===3&&<div className="flex items-center justify-center gap-6 py-4"><Watch className="size-16"/><svg viewBox="0 0 70 40" className="w-16"><path className="run-dash" d="M0 20h70" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6"/></svg><div className="grid h-24 w-14 place-items-center rounded-lg border-2 border-current"><Activity className="size-7"/></div></div>}
 {index===4&&<div className="flex items-center justify-between py-5"><Target className="size-20"/><div className="w-32 space-y-3">{[70,90,110].map(w=><div key={w} className="h-2 bg-primary/15"><div className={`h-full bg-primary ${w===70?'w-1/2':w===90?'w-2/3':'w-4/5'}`}/></div>)}</div></div>}
 {index===5&&<div className="flex items-center justify-center gap-5 py-4"><Users className="size-14"/><div className="grid gap-2"><div className="rounded border border-primary/30 p-2"><CalendarDays className="size-6"/></div><div className="flex gap-1">{[1,2,3,4].map(i=><span key={i} className="size-2 bg-primary/60"/>)}</div></div><Activity className="size-9"/></div>}
 <p className="mt-auto pt-3 text-[11px] font-semibold text-muted-foreground">{labels[index]}</p>
 </div>
}
