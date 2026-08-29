'use client';

import {
  Satellite,
  Waypoints,
  Plane,
  RadioTower,
  Search,
  Settings2,
  Box,
  Map,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OloLinkState, RailId } from '@/hooks/use-ololink';

export const SYSTEM_TABS: {
  id: RailId;
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  { id: 'leo', label: 'LEO', hint: 'ข้อมูลดาวเทียม LEO ทั้งหมด', icon: Satellite },
  { id: 'haps', label: 'HAPS', hint: 'ข้อมูลแพลตฟอร์ม HAPS ทั้งหมด', icon: Waypoints },
  { id: 'drone', label: 'Drone', hint: 'ข้อมูลโดรนรีเลย์ทั้งหมด', icon: Plane },
  { id: 'ground', label: 'Ground', hint: 'ข้อมูลสถานีภาคพื้นดินทั้งหมด', icon: RadioTower },
  { id: 'search', label: 'Search', hint: 'ค้นหาอุปกรณ์ทุกประเภทอย่างรวดเร็ว', icon: Search },
  { id: 'settings', label: 'Settings', hint: 'การตั้งค่าของระบบทั้งหมด', icon: Settings2 },
];

function RailButton({
  item,
  isActive,
  view,
  onToggle,
}: {
  item: (typeof SYSTEM_TABS)[number];
  isActive: boolean;
  view: '3d' | '2d';
  onToggle: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={item.label}
      aria-pressed={isActive}
      className={cn(
        'group relative flex h-[46px] w-[46px] items-center justify-center rounded-[12px] outline-none transition-all duration-150',
        'focus-visible:ring-1 focus-visible:ring-sky-400/60',
        view === '3d'
          ? isActive
            ? 'bg-white/[0.12] text-white'
            : 'text-white/85 hover:bg-white/[0.08] hover:text-white active:scale-[0.96]'
          : isActive
            ? 'bg-sky-500/[0.14] text-sky-200'
            : 'text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground active:scale-[0.96]'
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />

      <span className="pointer-events-none absolute left-[64px] z-50 hidden -translate-x-1 whitespace-nowrap rounded-md border border-white/[0.08] bg-[#0a0f1c]/95 px-2.5 py-1.5 opacity-0 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        <span className="block text-[10px] uppercase tracking-[0.2em] text-foreground">
          {item.hint}
        </span>
      </span>
    </button>
  );
}

/** LEVEL 2 — the system tab rail, docked to the left edge. */
export function SystemRail({ state }: { state: OloLinkState }) {
  return (
    <nav
      className={cn(
        'pointer-events-auto absolute bottom-0 left-0 top-0 z-40 flex w-[68px] flex-col items-center gap-1.5 overflow-y-auto py-3 [scrollbar-width:none]',
        state.view === '3d'
          ? 'border-r border-white/10 bg-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
          : 'border-r border-transparent bg-transparent'
      )}
    >
      {/* earth view mode */}
      <div className="flex flex-col items-center gap-1">
        {(
          [
            { id: '3d', icon: Box, label: '3D view' },
            { id: '2d', icon: Map, label: '2D view' },
          ] as const
        ).map((m) => {
          const Icon = m.icon;
          const active = state.view === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => state.setView(m.id)}
              aria-pressed={active}
              aria-label={m.label}
              className={cn(
                'flex h-[46px] w-[46px] items-center justify-center rounded-[10px] transition-all duration-150',
                'focus-visible:ring-1 focus-visible:ring-sky-400/60',
                state.view === '3d'
                  ? active
                    ? 'bg-white/[0.14] text-white ring-1 ring-white/30'
                    : 'text-white/85 hover:bg-white/[0.08] hover:text-white active:scale-[0.96]'
                  : active
                    ? 'bg-sky-500/[0.16] text-sky-200 ring-1 ring-sky-400/25'
                    : 'text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground active:scale-[0.96]'
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          );
        })}
      </div>

      {/* system tabs */}
      <div className="mt-2 flex flex-col items-center gap-1.5 border-t border-white/[0.06] pt-2">
        {SYSTEM_TABS.map((item) => (
          <RailButton
            key={item.id}
            item={item}
            isActive={state.rail === item.id}
            view={state.view}
            onToggle={() => state.toggleRail(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
