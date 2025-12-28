import type { Technology } from "../types/navigation";

const technologies: Technology[] = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'React Native', icon: '📱' },
  { name: 'Tailwind', icon: 'CSS' },
];

export const TechStack = () => {
  return (
    <div className="mt-12">
      <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">
        Stack technique principale
      </p>
      <div className="flex flex-wrap gap-3">
        {technologies.map((tech) => (
          <div 
            key={tech.name}
            className="flex items-center gap-2 px-4 py-2 bg-surface-light/30 border border-white/5 rounded-lg hover:border-primary/50 transition-colors group"
          >
            <span className="text-xs font-semibold text-white/80 group-hover:text-white">
              {tech.name} {tech.icon}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
