const MESSAGES = [
  "FREE SHIPPING OVER ₹1499",
  "NEW DROP EVERY FRIDAY",
  "COD AVAILABLE PAN-INDIA",
];

export default function AnnouncementBar() {
  const track = [...MESSAGES, ...MESSAGES];

  return (
    <div className="sticky top-0 z-50 bg-indigo text-pearl-white overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2 motion-reduce:animate-none motion-reduce:justify-center">
        {track.map((msg, i) => (
          <span
            key={i}
            className="font-display uppercase tracking-widest text-[11px] px-6 flex items-center gap-6"
          >
            {msg}
            <span aria-hidden className="text-mint">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
