export default function ProductLoading() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="rounded-3xl h-[420px] animate-pulse" style={{ background: "rgba(198,161,91,0.16)", border: "1px solid rgba(198,161,91,0.2)" }} />
          <div className="flex flex-col gap-5">
            <div className="h-3 w-32 rounded-full animate-pulse" style={{ background: "rgba(198,161,91,0.35)" }} />
            <div className="h-12 w-4/5 rounded-2xl animate-pulse" style={{ background: "rgba(82,17,28,0.15)" }} />
            <div className="h-24 rounded-2xl animate-pulse" style={{ background: "rgba(123,106,98,0.13)" }} />
            <div className="h-12 w-36 rounded-full animate-pulse" style={{ background: "rgba(82,17,28,0.16)" }} />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-20 rounded-2xl animate-pulse" style={{ background: "rgba(198,161,91,0.12)" }} />
              ))}
            </div>
            <div className="h-12 rounded-full animate-pulse" style={{ background: "rgba(82,17,28,0.2)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
