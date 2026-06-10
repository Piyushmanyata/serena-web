export default function ShopLoading() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <div className="py-12 md:py-16 text-center" style={{ background: "var(--serena-cream)" }}>
        <div className="h-3 w-28 rounded-full mx-auto mb-5 animate-pulse" style={{ background: "rgba(198,161,91,0.35)" }} />
        <div className="h-12 w-72 max-w-[80vw] rounded-2xl mx-auto animate-pulse" style={{ background: "rgba(82,17,28,0.16)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-2xl p-5 animate-pulse" style={{ background: "rgba(255,250,243,0.8)", border: "1px solid rgba(198,161,91,0.2)" }}>
            <div className="h-36 rounded-2xl mb-4" style={{ background: "rgba(198,161,91,0.16)" }} />
            <div className="h-5 rounded-full mb-3" style={{ background: "rgba(82,17,28,0.14)" }} />
            <div className="h-3 rounded-full w-2/3 mb-6" style={{ background: "rgba(123,106,98,0.18)" }} />
            <div className="h-9 rounded-full" style={{ background: "rgba(82,17,28,0.18)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
