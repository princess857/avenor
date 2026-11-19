import { useState } from 'react'
import { User, Palette, Bell, Shield, Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'preferences', label: 'Preferences', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
]

const labelMap = { profile: 'Profile', appearance: 'Appearance', preferences: 'Preferences', security: 'Security' }

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [formData, setFormData] = useState({
    fullName: 'Admin User',
    email: 'admin@avenorhospital.com',
    phone: '+234 800 000 0000',
    role: 'Hospital Administrator',
  })
  const [themePrefs, setThemePrefs] = useState({ notifications: true, emailAlerts: true })
  const [securityPrefs, setSecurityPrefs] = useState({ twoFactor: false, sessionTimeout: '30' })
  const [saved, setSaved] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const SectionButton = ({ id, icon: Icon }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
        activeSection === id
          ? 'bg-[#003B3D] text-[#F4BE65]'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#163A3F]'
      }`}
    >
      <Icon size={18} />
      <span>{labelMap[id]}</span>
    </button>
  )

  const renderSection = () => {
    if (activeSection === 'profile') return (
      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" className="w-full pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
          <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="tel" className="w-full pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
        </div>
        <button type="submit" className="w-full bg-[#003B3D] text-white font-semibold py-3 rounded-xl hover:bg-[#082B3B] transition disabled:opacity-60">
          {saved ? 'Saved!' : 'Save Profile Changes'}
        </button>
      </form>
    )
    if (activeSection === 'appearance') return (
      <form className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
          <div className="grid gap-2 md:grid-cols-2">
            {['light', 'dark'].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={theme === t}
                onClick={() => {
                  setTheme(t)
                }}
                className={`p-4 rounded-xl border flex items-center gap-3 ${
                  theme === t
                    ? 'border-[#003B3D] bg-[#003B3D]/10 text-[#003B3D] dark:text-[#F4BE65]'
                    : 'border-gray-200 dark:border-[#1E3A3D] bg-white dark:bg-[#0F2B30] hover:border-[#003B3D]/30 transition'
                }`}
              >
                {t === 'light' ? <Sun size={18} className="text-[#F4BE65]" /> : <Moon size={18} className="text-[#F4BE65]" />}
                <span>{t === 'light' ? 'Light' : 'Dark'}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Current system theme: <span className="font-medium">{theme}</span></p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Accent Color</label>
          <div className="flex gap-3">
            {['#003B3D', '#F4BE65', '#082B3B', '#10B981'].map((c) => (
              <button key={c} onClick={() => {}} className={`w-8 h-8 rounded-full border-2 ${c} transition`} />
            ))}
          </div>
        </div>
      </form>
    )
    if (activeSection === 'preferences') return (
      <form className="space-y-5">
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F]">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</p>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Receive email alerts for new appointments and payments.</p>
          </div>
          <button
            type="button"
            onClick={() => setThemePrefs({ ...themePrefs, emailAlerts: !themePrefs.emailAlerts })}
            aria-pressed={themePrefs.emailAlerts}
            className={`w-12 h-6 rounded-full ${themePrefs.emailAlerts ? 'bg-[#003B3D]' : 'bg-gray-200 dark:bg-[#163A3F]'} transition relative`}
            aria-label="Email notifications"
          >
            <span className={`block w-4 h-4 rounded-full bg-white ${themePrefs.emailAlerts ? 'translate-x-6' : 'translate-x-1'} shadow`} />
          </button>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F]">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</p>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Receive push notifications for urgent alerts.</p>
          </div>
          <button
            type="button"
            onClick={() => setThemePrefs({ ...themePrefs, notifications: !themePrefs.notifications })}
            aria-pressed={themePrefs.notifications}
            className={`w-12 h-6 rounded-full ${themePrefs.notifications ? 'bg-[#003B3D]' : 'bg-gray-200 dark:bg-[#163A3F]'} transition relative`}
            aria-label="Push notifications"
          >
            <span className={`block w-4 h-4 rounded-full bg-white ${themePrefs.notifications ? 'translate-x-6' : 'translate-x-1'} shadow`} />
          </button>
        </div>
        <button className="w-full bg-[#003B3D] text-white font-semibold py-3 rounded-xl hover:bg-[#082B3B] transition">Save Preferences</button>
      </form>
    )
    if (activeSection === 'security') return (
      <form className="space-y-5">
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F]">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Add an extra layer of security to your account.</p>
          </div>
          <button
            type="button"
            onClick={() => setSecurityPrefs({ ...securityPrefs, twoFactor: !securityPrefs.twoFactor })}
            aria-pressed={securityPrefs.twoFactor}
            className={`w-12 h-6 rounded-full ${securityPrefs.twoFactor ? 'bg-[#003B3D]' : 'bg-gray-200 dark:bg-[#163A3F]'} transition relative`}
            aria-label="Two-factor auth"
          >
            <span className={`block w-4 h-4 rounded-full bg-white ${securityPrefs.twoFactor ? 'translate-x-6' : 'translate-x-1'} shadow`} />
          </button>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Session Timeout</label>
          <select value={securityPrefs.sessionTimeout} onChange={(e) => setSecurityPrefs({ ...securityPrefs, sessionTimeout: e.target.value })} className="w-full pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition">
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
          <input type="password" className="w-full pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <input type="password" className="w-full pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E3A3D] bg-gray-50 dark:bg-[#163A3F] text-gray-900 dark:text-white focus:outline-none focus:border-[#003B3D] focus:ring-1 transition" />
        </div>
        <button className="w-full bg-[#003B3D] text-white font-semibold py-3 rounded-xl hover:bg-[#082B3B] transition">Save Security Settings</button>
      </form>
    )
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0F172A] dark:text-white">Settings</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">Configure your administrator account and dashboard preferences.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {settingsSections.map((s) => (
              <SectionButton key={s.id} id={s.id} icon={s.icon} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 bg-white dark:bg-[#0F2B30] rounded-2xl border border-[#E2E8F0] dark:border-[#1E3A3D] p-6 shadow-sm">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}
