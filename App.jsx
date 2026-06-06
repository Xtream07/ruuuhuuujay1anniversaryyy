import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift, Cake, PartyPopper, Stars, Music2 } from "lucide-react";

export default function App() {
  const herName = "Ruhi";
  const yourName = "Jay";
  const anniversaryDate = new Date("2025-05-25T00:00:00");

  const audioRef = useRef(null);
  const [stage, setStage] = useState("intro");
  const [loadingText, setLoadingText] = useState("Preparing something special...");
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [magicBursts, setMagicBursts] = useState([]);
  const [timeTogether, setTimeTogether] = useState({
    days: 365,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = now - anniversaryDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stage === "loading") {
      const t1 = setTimeout(() => setLoadingText("Adding a little magic..."), 850);
      const t2 = setTimeout(() => setLoadingText("Lighting up the memories..."), 1700);
      const t3 = setTimeout(() => setLoadingText("Almost ready for the surprise..."), 2450);
      const t4 = setTimeout(() => setStage("celebration"), 3400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "celebration") {
      const t = setTimeout(() => setShowFinalMessage(true), 2300);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 6,
        size: 10 + Math.random() * 22,
      })),
    []
  );

  const balloons = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        delay: Math.random() * 4,
        duration: 7 + Math.random() * 6,
        size: 34 + Math.random() * 24,
        shade: i % 4,
      })),
    []
  );

  const confetti = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.8,
        duration: 2.4 + Math.random() * 2.6,
        rotate: Math.random() * 540,
        width: 5 + Math.random() * 6,
        height: 8 + Math.random() * 10,
        shade: i % 5,
      })),
    []
  );

  const triggerMagic = (e) => {
    const burst = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };

    setMagicBursts((prev) => [...prev, burst]);

    setTimeout(() => {
      setMagicBursts((prev) => prev.filter((b) => b.id !== burst.id));
    }, 1200);
  };

  const startSurprise = (e) => {
    e.stopPropagation();
    audioRef.current?.play().catch(() => {});
    setStage("loading");
  };

  return (
    <main
      onClick={triggerMagic}
      className="min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,#ffe4ef_0%,#fce7f3_34%,#ede9fe_70%,#fff7ed_100%)] text-slate-900"
    >
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-8">
        <audio ref={audioRef} loop>
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>

        <MagicBursts bursts={magicBursts} />
        <FloatingHearts hearts={floatingHearts} />
        <FloatingBalloons balloons={balloons} />
        <SoftGlow />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/70 px-4 py-2 text-xs font-black tracking-[0.2em] text-rose-500 shadow-lg backdrop-blur"
        >
          TAP ANYWHERE FOR MAGIC ✨
        </motion.div>

        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.65 }}
              className="relative z-10 w-full"
            >
              <div className="overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/75 shadow-2xl backdrop-blur-xl">
                <div className="relative p-7 text-center">
                  <motion.div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-300/40 blur-2xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.55, 0.9, 0.55] }}
                    transition={{ repeat: Infinity, duration: 3.4 }}
                  />
                  <motion.div
                    className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-fuchsia-300/35 blur-2xl"
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.45, 0.85, 0.45] }}
                    transition={{ repeat: Infinity, duration: 3.8 }}
                  />

                  <motion.div
                    initial={{ scale: 0, rotate: -18 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-2xl"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      className="absolute inset-[-8px] rounded-full border border-dashed border-rose-200"
                    />
                    <Heart className="h-11 w-11 fill-white" />
                  </motion.div>

                  <p className="mb-2 text-sm font-semibold tracking-[0.35em] text-rose-500">A SPECIAL DAY</p>
                  <h1 className="text-4xl font-black leading-tight text-slate-950">
                    Happy First Anniversary, {herName}
                  </h1>
                  <p className="mt-5 text-base leading-relaxed text-slate-700">
                    This little surprise is made only for you, {herName}. {yourName} and {herName} have been happy,
                    laughing, growing together, and making beautiful memories for one unforgettable year.
                  </p>

                  <div className="mt-5 rounded-3xl border border-rose-200 bg-white/80 p-4 shadow-lg">
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-rose-500">Time Together</p>

                    <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                      <TimerBox value={timeTogether.days} label="Days" />
                      <TimerBox value={timeTogether.hours} label="Hours" />
                      <TimerBox value={timeTogether.minutes} label="Minutes" />
                      <TimerBox value={timeTogether.seconds} label="Seconds" />
                    </div>
                  </div>

                  <motion.div
                    animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2.4 }}
                    className="my-7 rounded-3xl bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 p-1 shadow-xl"
                  >
                    <div className="rounded-[1.35rem] bg-white/95 p-5">
                      <Sparkles className="mx-auto mb-2 h-7 w-7 text-rose-500" />
                      <p className="text-sm font-semibold text-slate-700">A sweet surprise is waiting inside.</p>
                    </div>
                  </motion.div>

                  <button
                    onClick={startSurprise}
                    className="h-14 w-full rounded-2xl bg-slate-950 text-base font-bold text-white shadow-xl hover:bg-slate-800"
                  >
                    Open the Surprise
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {stage === "loading" && (
            <motion.section
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.25, ease: "linear" }}
                className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full border-4 border-rose-400 border-t-transparent bg-white/70 shadow-2xl backdrop-blur"
              >
                <Gift className="h-11 w-11 text-rose-500" />
              </motion.div>
              <motion.p
                key={loadingText}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-black text-slate-900"
              >
                {loadingText}
              </motion.p>
              <p className="mt-3 text-sm font-medium text-slate-600">Please wait...</p>
            </motion.section>
          )}

          {stage === "celebration" && (
            <motion.section
              key="celebration"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 w-full"
            >
              <Confetti pieces={confetti} />
              <Fireworks />

              <div className="overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/80 shadow-2xl backdrop-blur-xl">
                <div className="relative p-6 text-center">
                  <div className="absolute left-4 top-4 rounded-full bg-rose-100 px-3 py-1 text-xs font-black tracking-widest text-rose-500">
                    365 DAYS
                  </div>

                  <motion.div
                    initial={{ scale: 0.55, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="relative mx-auto mb-5 mt-6 flex h-52 w-52 items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.09, 1], rotate: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2.1 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-300 via-pink-300 to-fuchsia-300 blur-2xl opacity-80"
                    />
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.2 }}
                      className="relative flex h-40 w-40 flex-col items-center justify-end rounded-b-[2rem] rounded-t-2xl bg-gradient-to-b from-pink-200 via-rose-300 to-rose-500 shadow-2xl"
                    >
                      <div className="absolute -top-9 flex gap-3">
                        <Candle delay={0} />
                        <Candle delay={0.2} />
                        <Candle delay={0.4} />
                      </div>
                      <div className="absolute top-0 h-9 w-full rounded-t-2xl bg-white shadow-inner" />
                      <div className="absolute top-8 h-3 w-28 rounded-full bg-rose-100/80" />
                      <div className="absolute top-16 h-3 w-24 rounded-full bg-white/55" />
                      <Cake className="mb-7 h-16 w-16 text-white drop-shadow" />
                    </motion.div>
                  </motion.div>

                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-black text-rose-600 shadow-sm">
                    <PartyPopper className="h-4 w-4" /> Celebration Time
                  </div>

                  <h2 className="text-3xl font-black leading-tight text-slate-950">
                    Happy First Anniversary, {herName}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-slate-700">
                    {yourName} & {herName} — 365 days of love, laughter, growing together, countless memories,
                    late-night talks, little fights, warm hugs, smiles, and unforgettable moments.
                  </p>

                  <div className="mt-5 rounded-3xl bg-gradient-to-r from-rose-100 to-fuchsia-100 p-4 shadow-inner">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">And still counting...</p>

                    <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                      <TimerBox value={timeTogether.days} label="Days" />
                      <TimerBox value={timeTogether.hours} label="Hours" />
                      <TimerBox value={timeTogether.minutes} label="Minutes" />
                      <TimerBox value={timeTogether.seconds} label="Seconds" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <MiniMemory icon={<Heart className="h-4 w-4 fill-current" />} text="Love" />
                    <MiniMemory icon={<Stars className="h-4 w-4" />} text="Magic" />
                    <MiniMemory icon={<Music2 className="h-4 w-4" />} text="Memories" />
                  </div>

                  <AnimatePresence>
                    {showFinalMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="mt-6 rounded-3xl bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white shadow-2xl"
                      >
                        <p className="text-sm uppercase tracking-[0.25em] text-rose-300">A small note</p>
                        <p className="mt-3 text-lg font-semibold leading-relaxed">
                          Babbuu, thank you so much for choosing me and giving me a chance. You are my world, my life,
                          and you have been — and always will be — the spark in my life.
                        </p>
                        <p className="mt-4 text-base font-medium leading-relaxed text-rose-100">
                          I love you sooooo much. Many more years to go, many more memories to make, and many more
                          beautiful moments to live together.
                        </p>
                        <p className="mt-4 text-base font-medium leading-relaxed text-rose-100">
                          I just want you to be the happiest girl in this world. I love you so much, Aarav ki Mummy.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-6 rounded-[2rem] bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 p-[1px] shadow-2xl"
                  >
                    <div className="rounded-[2rem] bg-white/95 p-5 text-center">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 text-white shadow-xl"
                      >
                        <Heart className="h-8 w-8 fill-white" />
                      </motion.div>

                      <h3 className="text-2xl font-black text-slate-900">You & Me Forever</h3>
                      <p className="mt-3 text-base font-semibold text-slate-700">J ❤️ R</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        No matter where life takes us, no matter how many years pass, I will always choose you.
                      </p>
                    </div>
                  </motion.div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFinalMessage(false);
                      setStage("intro");
                    }}
                    className="mt-6 h-12 w-full rounded-2xl border border-slate-300 bg-white/80 font-bold shadow-sm"
                  >
                    Replay Surprise
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function SoftGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-8 top-20 h-28 w-28 rounded-full bg-rose-300/35 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-24 right-4 h-32 w-32 rounded-full bg-purple-300/35 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />
    </div>
  );
}

function FloatingBalloons({ balloons }) {
  const colors = [
    "from-rose-300 to-rose-500",
    "from-fuchsia-300 to-fuchsia-500",
    "from-pink-200 to-pink-500",
    "from-purple-300 to-purple-500",
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: `${b.left}%`, bottom: -90 }}
          animate={{ y: [0, -860], x: [0, 12, -10, 0], rotate: [-4, 5, -3] }}
          transition={{ repeat: Infinity, delay: b.delay, duration: b.duration, ease: "easeOut" }}
        >
          <div
            className={`relative rounded-full bg-gradient-to-br ${colors[b.shade]} shadow-lg`}
            style={{ width: b.size, height: b.size * 1.22 }}
          >
            <div className="absolute left-3 top-3 h-3 w-2 rounded-full bg-white/60" />
            <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-rose-400" />
            <div className="absolute left-1/2 top-full h-24 w-px -translate-x-1/2 bg-rose-300/70" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FloatingHearts({ hearts }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-rose-400/45"
          style={{ left: `${h.left}%`, bottom: -30 }}
          animate={{ y: [0, -780], opacity: [0, 0.85, 0], rotate: [0, 18, -12] }}
          transition={{ repeat: Infinity, delay: h.delay, duration: h.duration, ease: "easeOut" }}
        >
          <Heart style={{ width: h.size, height: h.size }} className="fill-current" />
        </motion.div>
      ))}
    </div>
  );
}

function Confetti({ pieces }) {
  const colors = ["bg-rose-400", "bg-pink-400", "bg-fuchsia-400", "bg-purple-400", "bg-yellow-300"];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute top-0 rounded-sm ${colors[p.shade]}`}
          style={{ left: `${p.left}%`, width: p.width, height: p.height }}
          initial={{ y: -30, rotate: 0, opacity: 1 }}
          animate={{ y: 820, rotate: p.rotate + 480, opacity: 0 }}
          transition={{ delay: p.delay, duration: p.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function Fireworks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((item) => (
        <motion.div
          key={item}
          className="absolute rounded-full border-2 border-rose-300/70"
          style={{ left: `${18 + item * 28}%`, top: `${12 + item * 5}%` }}
          initial={{ width: 8, height: 8, opacity: 0.9 }}
          animate={{ width: 95, height: 95, opacity: 0 }}
          transition={{ repeat: Infinity, delay: item * 0.55, duration: 1.9 }}
        />
      ))}
    </div>
  );
}

function MiniMemory({ icon, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 }}
      className="rounded-2xl bg-white/85 p-3 text-center text-rose-500 shadow-sm"
    >
      <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-rose-100">{icon}</div>
      <p className="text-xs font-black text-slate-700">{text}</p>
    </motion.div>
  );
}

function TimerBox({ value, label }) {
  return (
    <motion.div
      animate={{ y: [0, -2, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="rounded-2xl bg-white/90 p-2 shadow-md"
    >
      <p className="text-xl font-black text-slate-900">{value}</p>
      <p className="text-[9px] font-bold uppercase tracking-widest text-rose-500">{label}</p>
    </motion.div>
  );
}

function MagicBursts({ bursts }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bursts.map((burst) => (
        <motion.div
          key={burst.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute"
          style={{ left: burst.x - 20, top: burst.y - 20 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-300/60 blur-sm">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Candle({ delay }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ scale: [1, 1.28, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ repeat: Infinity, duration: 0.7, delay }}
        className="mb-1 h-5 w-4 rounded-full bg-yellow-300 shadow-[0_0_20px_rgba(253,224,71,0.95)]"
      />
      <div className="h-8 w-2 rounded-full bg-white shadow-sm" />
    </div>
  );
}
