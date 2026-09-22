'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_ARTICLES } from '@/data/mockData';
import { FileText, ArrowUpRight, Clock } from 'lucide-react';

export default function InsightsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 animate-in fade-in duration-150">
      
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
          Pensamiento Doctrinal & Análisis Regulatorio
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950 tracking-tight">
          Insights jurídicos, tributarios y jurisprudenciales.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Artículos y análisis técnicos redactados por nuestros socios sobre reformas impositivas, fallos de la CSJN y estructuración de negocios en la Argentina.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_ARTICLES.map((art) => (
          <article 
            key={art.id} 
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden aspect-[16/10] border border-slate-200">
                <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {art.category}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 font-mono">{art.readTime}</span>
              </div>

              <h2 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                {art.title}
              </h2>

              <p className="text-slate-600 text-xs leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-800">Por {art.authorName}</span>
              <span className="font-mono text-[11px]">{art.publishedAt}</span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
