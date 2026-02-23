import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/9923de6d-cbae-4f48-8f61-eb055b6e3edb/files/af71774d-c82a-4769-9976-87fae91e3ca4.jpg";

const abilities = [
  {
    icon: "Waves",
    name: "Яд Болот",
    key: "Q",
    desc: "Бегемот выпускает ядовитое облако, замедляющее врагов и наносящее урон с течением времени. Враги в тумане болот не могут скрыться.",
    color: "#4ade80",
  },
  {
    icon: "Zap",
    name: "Топот Гиппопотама",
    key: "W",
    desc: "Мощный удар копытами, сотрясающий землю. Все враги в радиусе получают оглушение и урон от сейсмической волны.",
    color: "#fb923c",
  },
  {
    icon: "Shield",
    name: "Шкура Бронепотама",
    key: "E",
    desc: "Толстая шкура Бегемота поглощает часть входящего урона. Пассивная способность, усиливающаяся при низком HP.",
    color: "#60a5fa",
  },
  {
    icon: "Flame",
    name: "МЕГАВОНИЗМ",
    key: "R",
    desc: "Бегемот извергает смертоносный токсичный газ по всей карте. Никто не уйдёт от запаха болот. Враги теряют контроль и разум.",
    color: "#a78bfa",
    ult: true,
  },
];

const stats = [
  { label: "Сила", value: 26, max: 40, color: "#ef4444" },
  { label: "Ловкость", value: 12, max: 40, color: "#22c55e" },
  { label: "Интеллект", value: 18, max: 40, color: "#3b82f6" },
];

const lore = [
  "В глубинах гнилых болот, где воздух пропитан ядом, а трясина поглощает всё живое, родился Бегемот.",
  "Ни один разведчик не вернулся из его владений. Те немногие, кто слышал его рёв, говорят: земля дрожала три дня.",
  "Его называют Хранителем Болот. Те, кто осмеливается войти — называют его последним, что видели в жизни.",
];

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: 4,
      height: 4,
      background: "#4ade80",
      boxShadow: "0 0 8px #4ade80",
      ...style,
    }}
  />
);

const Index = () => {
  const [activeAbility, setActiveAbility] = useState<number | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number; dur: number }[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      dur: 3 + Math.random() * 4,
    }));
    setParticles(pts);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        background: "linear-gradient(180deg, #080e0a 0%, #0a0f0a 50%, #060c08 100%)",
        color: "#d4e8c2",
      }}
    >
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(8,14,10,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(74,222,128,0.1)",
        }}
      >
        <div
          className="text-xl font-bold tracking-widest uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", color: "#4ade80", letterSpacing: "0.2em" }}
        >
          ☠ БЕГЕМОТ
        </div>
        <div className="hidden md:flex gap-8 text-sm tracking-wider" style={{ color: "#86a07a" }}>
          {["Способности", "Характеристики", "Легенда"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-green-400 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
        <div
          className="text-xs px-3 py-1 rounded border"
          style={{
            borderColor: "rgba(74,222,128,0.3)",
            color: "#4ade80",
            background: "rgba(74,222,128,0.08)",
          }}
        >
          DOTA 2
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <Particle
              key={p.id}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                animation: `float ${p.dur}s ${p.delay}s ease-in-out infinite alternate`,
                opacity: 0.4,
              }}
            />
          ))}
        </div>

        {/* BG glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 80%, rgba(34,197,94,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Fog stripes */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,30,15,0.9) 0%, transparent 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto px-6 py-20">
          {/* Text side */}
          <div className="flex-1 text-center lg:text-left">
            <div
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#4ade80", fontFamily: "'Oswald', sans-serif" }}
            >
              Хранитель Болот
            </div>
            <h1
              className="text-6xl md:text-8xl font-bold mb-6 leading-none"
              style={{
                fontFamily: "'Oswald', sans-serif",
                color: "#e8f5e0",
                textShadow: "0 0 60px rgba(74,222,128,0.3), 0 0 120px rgba(74,222,128,0.1)",
                letterSpacing: "-0.02em",
              }}
            >
              БЕГЕ-<br />МОТ
            </h1>
            <p
              className="text-lg mb-8 max-w-md leading-relaxed"
              style={{ color: "#86a07a" }}
            >
              Страж древних болот. Его токсичное дыхание убивает армии.
              Его шаги сотрясают горы. Его ульта — конец всего живого.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                className="px-8 py-4 font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  background: "linear-gradient(135deg, #16a34a, #4ade80)",
                  color: "#050a06",
                  border: "none",
                  letterSpacing: "0.15em",
                  boxShadow: "0 0 30px rgba(74,222,128,0.4)",
                }}
              >
                Играть Бегемотом
              </button>
              <button
                className="px-8 py-4 font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  background: "transparent",
                  color: "#4ade80",
                  border: "1px solid rgba(74,222,128,0.4)",
                  letterSpacing: "0.15em",
                }}
              >
                Смотреть гайд
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 mt-10 justify-center lg:justify-start">
              {[
                { val: "26", label: "Сила" },
                { val: "6.5", label: "Броня" },
                { val: "2800", label: "HP" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Oswald', sans-serif", color: "#4ade80" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-xs uppercase tracking-wider mt-1" style={{ color: "#86a07a" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="flex-1 flex justify-center relative">
            <div
              className="relative"
              style={{
                filter: "drop-shadow(0 0 60px rgba(34,197,94,0.5))",
                transform: `translateY(${scrollY * 0.05}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <img
                src={HERO_IMG}
                alt="Бегемот"
                className="w-80 lg:w-[420px] object-cover"
                style={{
                  borderRadius: "2px",
                  border: "1px solid rgba(74,222,128,0.2)",
                  maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                }}
              />
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 30% at 50% 100%, rgba(34,197,94,0.25) 0%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
          style={{ color: "rgba(74,222,128,0.5)" }}
        >
          <Icon name="ChevronDown" size={20} />
          <span className="text-xs tracking-widest uppercase">Прокрутить</span>
        </div>
      </section>

      {/* ABILITIES */}
      <section id="способности" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "#4ade80" }}
          >
            Арсенал
          </div>
          <h2
            className="text-5xl font-bold"
            style={{ fontFamily: "'Oswald', sans-serif", color: "#e8f5e0" }}
          >
            СПОСОБНОСТИ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {abilities.map((ab, i) => (
            <div
              key={i}
              className="relative p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                background:
                  activeAbility === i
                    ? `linear-gradient(135deg, rgba(8,14,10,0.9), rgba(${ab.ult ? "120,60,180" : "10,30,15"},0.6))`
                    : "rgba(10,18,12,0.8)",
                border: activeAbility === i
                  ? `1px solid ${ab.color}60`
                  : "1px solid rgba(74,222,128,0.1)",
                borderRadius: "2px",
                boxShadow: activeAbility === i ? `0 0 30px ${ab.color}20` : "none",
              }}
              onClick={() => setActiveAbility(activeAbility === i ? null : i)}
            >
              {ab.ult && (
                <div
                  className="absolute top-3 right-3 text-xs px-2 py-0.5 font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(167,139,250,0.2)",
                    color: "#a78bfa",
                    border: "1px solid rgba(167,139,250,0.3)",
                    fontFamily: "'Oswald', sans-serif",
                  }}
                >
                  УЛЬТА
                </div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 flex items-center justify-center shrink-0"
                  style={{
                    background: `${ab.color}15`,
                    border: `1px solid ${ab.color}40`,
                    borderRadius: "2px",
                  }}
                >
                  <Icon name={ab.icon} size={24} style={{ color: ab.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        background: `${ab.color}20`,
                        color: ab.color,
                        letterSpacing: "0.1em",
                      }}
                    >
                      [{ab.key}]
                    </span>
                    <span
                      className="text-lg font-bold"
                      style={{ fontFamily: "'Oswald', sans-serif", color: "#e8f5e0" }}
                    >
                      {ab.name}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#86a07a" }}>
                    {ab.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="характеристики" className="py-24 px-6" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#4ade80" }}>
              Данные
            </div>
            <h2
              className="text-5xl font-bold"
              style={{ fontFamily: "'Oswald', sans-serif", color: "#e8f5e0" }}
            >
              ХАРАКТЕРИСТИКИ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-6 text-center"
                style={{
                  background: "rgba(10,18,12,0.8)",
                  border: "1px solid rgba(74,222,128,0.1)",
                  borderRadius: "2px",
                }}
              >
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif", color: s.color }}
                >
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "#86a07a" }}>
                  {s.label}
                </div>
                <div
                  className="h-1 w-full rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(s.value / s.max) * 100}%`,
                      background: s.color,
                      boxShadow: `0 0 8px ${s.color}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Extra stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "Heart", label: "HP", value: "2800" },
              { icon: "Zap", label: "Мана", value: "720" },
              { icon: "Shield", label: "Броня", value: "6.5" },
              { icon: "Move", label: "Скорость", value: "290" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 flex flex-col items-center gap-2"
                style={{
                  background: "rgba(10,18,12,0.6)",
                  border: "1px solid rgba(74,222,128,0.08)",
                  borderRadius: "2px",
                }}
              >
                <Icon name={item.icon} size={20} style={{ color: "#4ade80", opacity: 0.7 }} />
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Oswald', sans-serif", color: "#e8f5e0" }}
                >
                  {item.value}
                </div>
                <div className="text-xs uppercase tracking-wider" style={{ color: "#86a07a" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LORE */}
      <section id="легенда" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#4ade80" }}>
            История
          </div>
          <h2
            className="text-5xl font-bold"
            style={{ fontFamily: "'Oswald', sans-serif", color: "#e8f5e0" }}
          >
            ЛЕГЕНДА
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-0.5"
            style={{ background: "linear-gradient(to bottom, #4ade80, transparent)" }}
          />
          <div className="pl-8 space-y-8">
            {lore.map((text, i) => (
              <div key={i} className="relative">
                <div
                  className="absolute -left-10 top-2 w-3 h-3 rounded-full"
                  style={{
                    background: "#4ade80",
                    boxShadow: "0 0 10px #4ade80",
                  }}
                />
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#a8c090", fontStyle: i === 2 ? "italic" : "normal" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.05) 50%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] mb-4" style={{ color: "#4ade80" }}>
            Готов к болотам?
          </p>
          <h2
            className="text-6xl font-bold mb-6"
            style={{
              fontFamily: "'Oswald', sans-serif",
              color: "#e8f5e0",
              textShadow: "0 0 40px rgba(74,222,128,0.2)",
            }}
          >
            МЕГАВОНИЗМ
          </h2>
          <p className="text-base mb-10" style={{ color: "#86a07a" }}>
            Станьте легендой. Затопите карту ядом. Никто не уйдёт.
          </p>
          <button
            className="px-12 py-5 text-lg font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Oswald', sans-serif",
              background: "linear-gradient(135deg, #16a34a, #4ade80)",
              color: "#050a06",
              border: "none",
              letterSpacing: "0.2em",
              boxShadow: "0 0 50px rgba(74,222,128,0.4), 0 0 100px rgba(74,222,128,0.1)",
            }}
          >
            Начать играть
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-8 px-6 text-center border-t"
        style={{ borderColor: "rgba(74,222,128,0.1)", color: "#86a07a" }}
      >
        <div
          className="text-lg font-bold mb-2 tracking-widest"
          style={{ fontFamily: "'Oswald', sans-serif", color: "#4ade80" }}
        >
          БЕГЕМОТ
        </div>
        <p className="text-xs tracking-widest uppercase" style={{ color: "#4a5a42" }}>
          Хранитель Болот · Dota 2 · 2024
        </p>
      </footer>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.3; }
          100% { transform: translateY(-20px) scale(1.3); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default Index;