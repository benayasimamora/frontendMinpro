export default function Custom403() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4x1 font-bold mb-4">403</h1>
        <p className="mb-6">Anda tidak memiliki akses ke halaman ini.</p>
        <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded">
          Kembali ke beranda
        </a>
      </div>
    </div>
  );
}
