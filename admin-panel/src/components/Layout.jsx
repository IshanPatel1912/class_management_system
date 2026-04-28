import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  BarChart3, 
  GraduationCap, 
  CalendarDays, 
  FolderOpen, 
  Users,
  LayoutDashboard
} from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/notifications', icon: <Bell size={20} />, label: 'Notifications' },
    { path: '/polls', icon: <BarChart3 size={20} />, label: 'Polls' },
    { path: '/marks', icon: <GraduationCap size={20} />, label: 'Marks' },
    { path: '/calendar', icon: <CalendarDays size={20} />, label: 'Calendar' },
    { path: '/materials', icon: <FolderOpen size={20} />, label: 'Materials' },
    { path: '/students', icon: <Users size={20} />, label: 'Students' },
  ];

  return (
    <div className="flex h-screen gap-6 bg-slate-50 p-6 text-slate-900">
      <aside className="w-64 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm z-10 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <img
            src="/educonnect-logo.svg"
            alt="EduConnect"
            className="h-10 w-auto"
          />
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-slate-500">System Manager</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white/50">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
