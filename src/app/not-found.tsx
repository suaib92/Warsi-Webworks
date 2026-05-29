import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="text-center px-6">
        <h1 className="text-8xl md:text-9xl font-black text-text-primary tracking-tighter">404</h1>
        <p className="text-xl md:text-2xl text-text-body mt-4 mb-8 max-w-md mx-auto">
          Page not found. The digital realm you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-[8px] transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
