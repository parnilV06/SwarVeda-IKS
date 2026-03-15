import { cn } from '@/lib/utils';

interface NoteVisualizerProps {
  arohana: string;
  className?: string;
}

const ALL_NOTES = ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'];

export default function NoteVisualizer({ arohana, className }: NoteVisualizerProps) {
  // Extract base notes from arohana (ignoring variations like komal/teevra for basic highlight)
  const activeNotes = new Set(
    arohana.split(' ').map(note => note.replace(/[^a-zA-Z]/g, ''))
  );

  return (
    <div className={cn("flex flex-wrap gap-2 justify-center", className)}>
      {ALL_NOTES.map((note) => {
        const isActive = activeNotes.has(note);
        return (
          <div
            key={note}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full border-2 text-sm font-bold transition-all duration-300",
              isActive 
                ? "border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(200,184,129,0.3)]" 
                : "border-muted-foreground/30 text-muted-foreground/50 bg-card/50"
            )}
            title={isActive ? `Present in Raga (${note})` : `Not used (${note})`}
          >
            {note}
          </div>
        );
      })}
    </div>
  );
}
