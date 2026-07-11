"use client";

// NOTE: This component renders the cart UI and milestone logic. It expects
// to be wired to Shopify's Cart API (cartCreate / cartLinesAdd / cartLinesUpdate)
// — see README "Wiring the cart" for the mutations and a suggested
// CartContext provider. Kept as local state here so the UI ships first.

const FREE_SHIPPING_THRESHOLD = 1499;

type CartLine = {
  id: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image: string;
};

// Placeholder line items so the drawer is reviewable before the Cart API is wired.
const SAMPLE_LINES: CartLine[] = [];

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const subtotal = SAMPLE_LINES.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <>
      {/* Scrim */}
      <div
        className={`fixed inset-0 bg-indigo/40 z-50 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-pearl-white z-50
          border-l border-indigo/15 flex flex-col
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-indigo/15">
          <h2 className="font-display uppercase tracking-widest text-sm">
            Your Bag ({SAMPLE_LINES.length})
          </h2>
          <button onClick={onClose} aria-label="Close cart" className="p-2 -mr-2">
            <span className="font-display text-lg leading-none">&times;</span>
          </button>
        </div>

        {/* Free shipping milestone */}
        <div className="px-6 py-4 border-b border-indigo/15">
          {remaining > 0 ? (
            <p className="text-xs mb-2">
              Add <span className="font-semibold">₹{remaining}</span> more for free shipping
            </p>
          ) : (
            <p className="text-xs mb-2 text-indigo font-semibold">
              You&apos;ve unlocked free shipping ✦
            </p>
          )}
          <div className="h-1.5 bg-indigo/10 w-full">
            <div
              className="h-1.5 bg-mint transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {SAMPLE_LINES.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <p className="text-sm text-indigo/70">Your bag is empty.</p>
              <a href="/collections/new-drop" className="btn-outline">
                Shop the new drop
              </a>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {SAMPLE_LINES.map((line) => (
                <li key={line.id} className="flex gap-4 border-b border-indigo/10 pb-4">
                  <div className="w-20 h-24 bg-pearl shrink-0" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-display text-xs uppercase tracking-widest">
                        {line.title}
                      </p>
                      <p className="text-xs text-indigo/60 mt-1">{line.variantTitle}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Qty {line.quantity}</span>
                      <span className="font-semibold">₹{line.price * line.quantity}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {SAMPLE_LINES.length > 0 && (
          <div className="border-t border-indigo/15 px-6 py-4">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="font-display uppercase tracking-widest text-xs">Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <button className="btn-mint w-full">Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
}
