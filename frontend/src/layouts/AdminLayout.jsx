import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FBF6EF] lg:flex">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-3 sm:p-4 lg:p-6">
        {children}
      </main>
    </div>
  );
}
