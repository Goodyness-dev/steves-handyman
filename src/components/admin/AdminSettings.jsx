import React, { useState, useEffect } from 'react';
import { settingsApi, authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

// Semantic inline SVGs
const Icons = {
  Send: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Mail: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Lock: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  ShieldCheck: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Save: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  Key: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 2-2 2m-1.5 1.5L12 11l4 4 1.5-1.5M19 5l2 2m-2-2 1.5-1.5M7 13a4 4 0 1 1-5.66 5.66A4 4 0 0 1 7 13Z" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
};

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    business_name: BUSINESS_INFO.name,
    shop_phone: BUSINESS_INFO.phone,
    secondary_phone: BUSINESS_INFO.secondaryPhone,
    shop_email: BUSINESS_INFO.email,
    service_area: "Denison, Sherman, Pottsboro & Lake Texoma, TX",
    guarantee_note: "1-Year Unconditional Craftsmanship Guarantee",
    telegram_bot_token: "",
    telegram_chat_id: "",
    emailjs_service_id: "",
    emailjs_template_id: "",
    emailjs_public_key: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsApi.getSettings();
      if (data) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn('Settings load fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e?.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await settingsApi.saveSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      alert('Error saving settings: ' + (err.message || 'Please try again.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }

    setIsChangingPass(true);
    setPassError('');
    setPassSuccess('');

    try {
      await authApi.changePassword(oldPassword, newPassword);
      setPassSuccess('Admin password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(''), 4000);
    } catch (err) {
      setPassError(err.data?.error || err.message || 'Failed to change password.');
    } finally {
      setIsChangingPass(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16 text-slate-900 dark:text-slate-100">
      <div>
        <h1 className="text-2xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
          Shop Settings & Dispatch Alerts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-medium mt-0.5">
          Configure business details, notification webhooks, and security for Steve's Handyman LLC.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2">
          <Icons.Check className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: Business Profile                                   */}
      {/* ------------------------------------------------------------- */}
      <form onSubmit={handleSaveSettings} className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-neutral-800">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-slate-800 dark:text-white font-bold">
            SH
          </div>
          <div>
            <h3 className="font-heading font-black text-sm text-slate-900 dark:text-white">
              Business Contact & Territory Info
            </h3>
            <span className="text-[11px] text-slate-400 dark:text-neutral-500">
              Synced across outgoing quote estimates and customer invoices.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={settings.business_name}
              onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Dispatch Phone
            </label>
            <input
              type="text"
              value={settings.shop_phone}
              onChange={(e) => setSettings({ ...settings, shop_phone: e.target.value })}
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Secondary Direct Phone
            </label>
            <input
              type="text"
              value={settings.secondary_phone}
              onChange={(e) => setSettings({ ...settings, secondary_phone: e.target.value })}
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Notification & Dispatch Email
            </label>
            <input
              type="email"
              value={settings.shop_email}
              onChange={(e) => setSettings({ ...settings, shop_email: e.target.value })}
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
            Service Territory
          </label>
          <input
            type="text"
            value={settings.service_area}
            onChange={(e) => setSettings({ ...settings, service_area: e.target.value })}
            className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
            Craftsmanship Guarantee Statement
          </label>
          <input
            type="text"
            value={settings.guarantee_note}
            onChange={(e) => setSettings({ ...settings, guarantee_note: e.target.value })}
            className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 font-bold text-xs rounded-xl transition shadow-xs flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Icons.Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: Telegram & Email Notifications                     */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-neutral-800">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center font-bold">
            <Icons.Send className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-black text-sm text-slate-900 dark:text-white">
              Instant Dispatch Alerts (Telegram & Email)
            </h3>
            <span className="text-[11px] text-slate-400 dark:text-neutral-500">
              Receive a push notification on your phone immediately when a homeowner requests a quote.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Telegram Bot Token
            </label>
            <input
              type="password"
              value={settings.telegram_bot_token || ''}
              onChange={(e) => setSettings({ ...settings, telegram_bot_token: e.target.value })}
              placeholder="bot123456789:ABC..."
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Telegram Chat ID
            </label>
            <input
              type="text"
              value={settings.telegram_chat_id || ''}
              onChange={(e) => setSettings({ ...settings, telegram_chat_id: e.target.value })}
              placeholder="e.g. 123456789"
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Save Notification Keys
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: Admin Security & Password Change                   */}
      {/* ------------------------------------------------------------- */}
      <form onSubmit={handleChangePassword} className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-neutral-800">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 flex items-center justify-center font-bold">
            <Icons.Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-black text-sm text-slate-900 dark:text-white">
              Admin Access Key & Security
            </h3>
            <span className="text-[11px] text-slate-400 dark:text-neutral-500">
              Update password for the Steve's Handyman dispatch portal.
            </span>
          </div>
        </div>

        {passSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            {passSuccess}
          </div>
        )}

        {passError && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs">
            {passError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Current Key
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Current key"
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
              required
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isChangingPass}
            className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 font-bold text-xs rounded-xl transition shadow-xs flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Icons.Key className="w-3.5 h-3.5" />
            <span>{isChangingPass ? 'Updating...' : 'Update Admin Password'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
