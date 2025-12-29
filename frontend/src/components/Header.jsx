export default function Header() {
  return (
   <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          BeyondChats Articles Dashboard
        </h1>
        <p className="text-sm text-blue-100 mt-1">
          Scraped, processed and displayed using a full-stack pipeline
        </p>
      </div>
    </header>
  );
}
