const Kicker = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[0.6rem] uppercase tracking-[0.42em] text-muted-foreground">{children}</span>
);

const Rule = () => <span className="block h-px w-10 bg-paper-edge" />;

export const PAGES: React.ReactNode[] = [
  // 1 — large emotional typography
  <div key="p1" className="flex h-full flex-col justify-between p-[9%]">
    <Kicker>TSN &nbsp;·&nbsp; A Farewell</Kicker>
    <div className="space-y-5">
      <h1 className="font-serif text-[clamp(2rem,7.5vw,3.4rem)] font-light leading-[0.95] tracking-[-0.01em]">
        Thank you,
        <br />
        <em className="not-italic text-accent">Saad.</em>
      </h1>
      <Rule />
      <p className="max-w-[26ch] text-[0.78rem] font-light leading-relaxed text-muted-foreground">
        Some people don't just work somewhere. They change the temperature of the room.
      </p>
    </div>
    <Kicker>Turn the page</Kicker>
  </div>,

  // 2 — editorial text layout
  <div key="p2" className="flex h-full flex-col gap-6 p-[9%]">
    <Kicker>Chapter One</Kicker>
    <h2 className="font-serif text-[1.65rem] font-light leading-tight">The way you showed up</h2>
    <div className="columns-1 gap-5 text-[0.76rem] font-light leading-[1.85] text-foreground/80 sm:columns-2">
      <p className="mb-3">
        You arrived early to things nobody asked you to be early for. You stayed late on problems
        that were never technically yours. Somehow that became the standard the rest of us quietly
        measured ourselves against.
      </p>
      <p className="mb-3">
        You made hard weeks feel survivable and ordinary weeks feel worth remembering — with a
        joke, a second coffee, an honest opinion delivered kindly.
      </p>
      <p>
        That is the part no handover document can carry. It leaves with you, and it also stays.
      </p>
    </div>
    <div className="mt-auto flex items-center gap-3">
      <Rule />
      <Kicker>TSN</Kicker>
    </div>
  </div>,

  // 3 — a scene in words, in place of a photograph
  <div key="p3" className="flex h-full flex-col p-[9%]">
    <Kicker>Fig. 01 &nbsp;·&nbsp; A scene, remembered</Kicker>
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <span className="text-[2rem] text-accent">❦</span>
      <p className="max-w-[30ch] font-serif text-[1.15rem] font-light italic leading-relaxed text-foreground/85">
        The table where most of it happened — too many mugs, one whiteboard nobody
        could ever fully erase, and you, mid-sentence, already three steps ahead of the rest of us.
      </p>
    </div>
    <div className="flex items-end justify-between pt-4">
      <Rule />
      <Kicker>Fig. 01</Kicker>
    </div>
  </div>,

  // 4 — memory list
  <div key="p4" className="flex h-full flex-col gap-6 p-[9%]">
    <Kicker>Things we're keeping</Kicker>
    <ul className="flex flex-col gap-4">
      {[
        "The 9 a.m. debriefs that ran to 10.",
        "Deadlines you refused to let us miss.",
        "Your desk, permanently one mug over capacity.",
        "Feedback that stung for an hour and helped for a year.",
        "The launch night nobody wanted to end.",
      ].map((item, i) => (
        <li key={item} className="flex gap-4 border-b border-paper-edge/60 pb-3">
          <span className="font-serif text-[0.8rem] text-accent">0{i + 1}</span>
          <span className="text-[0.8rem] font-light leading-snug text-foreground/85">{item}</span>
        </li>
      ))}
    </ul>
    <p className="mt-auto max-w-[28ch] text-[0.72rem] font-light leading-relaxed text-muted-foreground">
      Small things, all of them. Together they were the job.
    </p>
  </div>,

  // 5 — large statement
  <div key="p5" className="flex h-full flex-col items-center justify-center gap-7 p-[10%] text-center">
    <Rule />
    <p className="font-serif text-[clamp(1.5rem,5.5vw,2.35rem)] font-light leading-[1.2]">
      “You don't replace people
      <br />
      like this.
      <br />
      <span className="italic text-accent">You just miss them.</span>”
    </p>
    <Rule />
  </div>,

  // 6 — personal message
  <div key="p6" className="flex h-full flex-col gap-5 p-[9%]">
    <Kicker>A personal note</Kicker>
    <p className="font-serif text-[0.98rem] font-light leading-[1.9] text-foreground/85">
      Saad — thank you for the patience, the standards, and the humour. You taught half this team
      how to think about their work, and the other half how to survive a bad week. Wherever you go
      next is lucky, though we'd rather they weren't.
    </p>
    <p className="text-[0.76rem] font-light leading-[1.9] text-muted-foreground">
      Keep in touch. Not the polite kind — the real kind.
    </p>
    <div className="mt-auto">
      <Rule />
      <p className="pt-3 font-serif text-[1.1rem] italic">With love, the TSN team</p>
    </div>
  </div>,

  // 7 — emotional closing
  <div key="p7" className="flex h-full flex-col items-center justify-center gap-6 p-[10%] text-center">
    <Kicker>The last page</Kicker>
    <h2 className="font-serif text-[clamp(1.7rem,6vw,2.6rem)] font-light leading-[1.1]">
      Go do something
      <br />
      <span className="italic text-accent">wonderful.</span>
    </h2>
    <p className="max-w-[24ch] text-[0.76rem] font-light leading-relaxed text-muted-foreground">
      We'll be here, telling your stories slightly better than they happened.
    </p>
    <span className="pt-2 text-[0.58rem] uppercase tracking-[0.4em] text-muted-foreground/70">
      Click to close the letter
    </span>
  </div>,
];
