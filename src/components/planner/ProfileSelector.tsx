import React from 'react';
import { RoutingProfile } from '@/types';
import { Zap, CornerUpRight, Mountain, Trees } from 'lucide-react';

interface ProfileSelectorProps {
  currentProfile: RoutingProfile;
  onProfileChange: (profile: RoutingProfile) => void;
}

export default function ProfileSelector({
  currentProfile,
  onProfileChange,
}: ProfileSelectorProps) {
  const profiles: Array<{
    id: RoutingProfile;
    label: string;
    sub: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'fastest',
      label: 'Rápido',
      sub: 'Autopistas',
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: 'curvy',
      label: 'Curvado',
      sub: 'Kurviger',
      icon: <CornerUpRight className="w-4 h-4" />,
    },
    {
      id: 'extra_curvy',
      label: 'Super Curvas',
      sub: 'Montaña pura',
      icon: <Mountain className="w-4 h-4" />,
    },
    {
      id: 'scenic',
      label: 'Panorámico',
      sub: 'Miradores',
      icon: <Trees className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        Perfil de Conducción Kurviger
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {profiles.map((p) => {
          const isSelected = currentProfile === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onProfileChange(p.id)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-primary/20 border-primary text-primary shadow-sm ring-1 ring-primary/40'
                  : 'bg-surface border-border text-slate-300 hover:border-slate-600 hover:bg-surface-light'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={isSelected ? 'text-primary' : 'text-slate-400'}>
                  {p.icon}
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                )}
              </div>
              <div>
                <span className="block font-bold text-xs leading-tight">
                  {p.label}
                </span>
                <span className="block text-[10px] text-slate-400 leading-tight">
                  {p.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
