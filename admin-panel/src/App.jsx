import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Bell,
  BarChart3,
  CalendarDays,
  FolderOpen,
  GraduationCap,
  Users,
} from 'lucide-react';
import Layout from './components/Layout';
import Students from './pages/Students';
import Notifications from './pages/Notifications';
import Polls from './pages/Polls';
import Marks from './pages/Marks';
import Calendar from './pages/Calendar';
import Materials from './pages/Materials';

const dashboardStats = [
  { label: 'Students', value: 'Manage', detail: 'Profiles and bulk imports', icon: Users, color: 'blue' },
  { label: 'Notifications', value: 'Send', detail: 'Class alerts and updates', icon: Bell, color: 'teal' },
  { label: 'Polls', value: 'Track', detail: 'Questions and vote results', icon: BarChart3, color: 'indigo' },
  { label: 'Marks', value: 'Publish', detail: 'Assessments and scores', icon: GraduationCap, color: 'emerald' },
];

const quickModules = [
  { path: '/students', label: 'Students', description: 'Add, edit, or import student records.', icon: Users },
  { path: '/notifications', label: 'Notifications', description: 'Send updates to the student app.', icon: Bell },
  { path: '/polls', label: 'Polls', description: 'Create polls and review responses.', icon: BarChart3 },
  { path: '/marks', label: 'Marks', description: 'Publish marks for students.', icon: GraduationCap },
  { path: '/calendar', label: 'Calendar', description: 'Plan exams, holidays, and events.', icon: CalendarDays },
  { path: '/materials', label: 'Materials', description: 'Organize files and folders.', icon: FolderOpen },
];

const colorClasses = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  teal: 'bg-teal-50 text-teal-700 border-teal-100',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

const Dashboard = () => (
  <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
      <p className="text-sm font-semibold text-blue-600">EduConnect Admin</p>
      <div className="mt-2 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, Admin</h1>
          <p className="mt-2 text-slate-500">Select a module or review the main class management areas below.</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          System Manager
        </div>
      </div>
    </div>

    <div className="space-y-6 p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg border ${colorClasses[stat.color]}`}>
                <Icon size={22} />
              </div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-500">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Quick Modules</h2>
        </div>
        <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-3">
          {quickModules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.path}
                to={module.path}
                className="group flex gap-4 p-5 transition-colors hover:bg-blue-50/60"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200 group-hover:ring-blue-200">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{module.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{module.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
