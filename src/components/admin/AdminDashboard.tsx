import React, { useState, useEffect } from 'react';
import {
  Database,
  RefreshCw,
  Search,
  Trash2,
  Download,
  Eye,
  LogOut,
  ArrowLeft,
  Sparkles,
  Heart,
  Calendar,
  Utensils,
  Clock,
  Compass,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import {
  StoredSubmission,
  fetchCloudSubmissions,
  getLocalSubmissions,
  deleteSubmission,
  clearAllSubmissions,
  saveSubmissionLocally,
  logoutAdmin,
  getAdminPassword,
  setAdminPassword,
} from '../../utils/adminDatabase';
import { getDemoProfile, exportProfileAsJSON } from '../../utils/storage';

interface AdminDashboardProps {
  onBackToApp: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToApp, onLogout }) => {
  const [submissions, setSubmissions] = useState<StoredSubmission[]>(() => getLocalSubmissions());
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<StoredSubmission | null>(null);
  const [activeTab, setActiveTab] = useState<'submissions' | 'settings'>('submissions');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [passSaveMsg, setPassSaveMsg] = useState('');
  const [syncStatusMsg, setSyncStatusMsg] = useState('Database synchronized');

  // Load submissions on mount & fetch from cloud
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const cloudData = await fetchCloudSubmissions();
      setSubmissions(cloudData);
      setSyncStatusMsg(`Synced ${cloudData.length} submissions from cloud`);
    } catch {
      setSubmissions(getLocalSubmissions());
      setSyncStatusMsg('Loaded local cache');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchCloudSubmissions()
      .then((cloudData) => {
        if (isMounted) {
          setSubmissions(cloudData);
          setSyncStatusMsg(`Synced ${cloudData.length} submissions from cloud`);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSyncStatusMsg('Loaded local cache');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter submissions by query
  const filteredSubmissions = submissions.filter((s) => {
    const q = searchQuery.toLowerCase();
    const herName = (s.profile.basicDetails.callName || s.profile.basicDetails.nickname || '').toLowerCase();
    const favFood = (s.profile.foodPreferences.favoriteFood || '').toLowerCase();
    return herName.includes(q) || favFood.includes(q) || s.id.toLowerCase().includes(q);
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this submission?')) {
      deleteSubmission(id);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear ALL submissions? This cannot be undone.')) {
      clearAllSubmissions();
      setSubmissions([]);
      setSelectedSubmission(null);
    }
  };

  const handleAddSample = () => {
    const demo = getDemoProfile();
    const sample: StoredSubmission = {
      id: `sample_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      deviceInfo: 'Sample Demo Submission',
      profile: demo,
    };
    saveSubmissionLocally(sample);
    setSubmissions((prev) => [sample, ...prev]);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminPass.trim()) {
      setAdminPassword(newAdminPass.trim());
      setPassSaveMsg('Admin password updated successfully!');
      setNewAdminPass('');
      setTimeout(() => setPassSaveMsg(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToApp}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Return to Love App"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-white tracking-tight">Admin Vault</h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Cloud Sync Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">User database & responses management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
              title="Synchronize from Cloud Database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-rose-400' : ''}`} />
              <span className="hidden sm:inline">{loading ? 'Syncing...' : 'Sync Cloud'}</span>
            </button>

            <button
              onClick={() => {
                logoutAdmin();
                onLogout();
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Total Submissions
              </p>
              <p className="text-2xl font-bold text-white mt-0.5">{submissions.length}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Latest Response
              </p>
              <p className="text-sm font-semibold text-white mt-1 truncate max-w-[180px]">
                {submissions.length > 0
                  ? new Date(submissions[0].submittedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'No submissions yet'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Database Status
              </p>
              <p className="text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{syncStatusMsg}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'submissions'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Vault Settings
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={handleAddSample}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              title="Add a sample test questionnaire to verify layout"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Add Test Sample</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Submissions Explorer */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search database by name, favorite food, or ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              />
            </div>

            {/* List / Empty State */}
            {filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 text-slate-400">
                <Heart className="w-12 h-12 mx-auto text-slate-700 mb-3 animate-pulse" />
                <h3 className="text-base font-semibold text-slate-300">No submissions found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  When your girlfriend completes the questionnaire on her device, her answers will appear right here in your database!
                </p>
                <button
                  onClick={handleAddSample}
                  className="mt-4 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Insert Sample Record to Preview</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSubmissions.map((sub) => {
                  const herName = sub.profile.basicDetails.callName || 'Her Answers';
                  const nickname = sub.profile.basicDetails.nickname;
                  const favFood = sub.profile.foodPreferences.favoriteFood;
                  const loveLang = sub.profile.relationship.loveLanguage;
                  const dateStr = new Date(sub.submittedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className="p-5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {herName[0]?.toUpperCase() || 'H'}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors">
                                {herName}
                              </h4>
                              {nickname && (
                                <p className="text-[11px] text-rose-300">Nickname: {nickname}</p>
                              )}
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{dateStr}</span>
                        </div>

                        {/* Quick Highlights */}
                        <div className="space-y-1.5 text-xs text-slate-300 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                          {favFood && (
                            <p className="flex items-center gap-1.5 text-slate-300 truncate">
                              <Utensils className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span className="text-slate-400">Fav Food:</span>
                              <span className="font-medium text-slate-200">{favFood}</span>
                            </p>
                          )}
                          {loveLang && (
                            <p className="flex items-center gap-1.5 text-slate-300 truncate">
                              <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              <span className="text-slate-400">Love:</span>
                              <span className="font-medium text-slate-200">{loveLang}</span>
                            </p>
                          )}
                          {sub.profile.importantDates?.length > 0 && (
                            <p className="flex items-center gap-1.5 text-slate-300 truncate">
                              <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="text-slate-400">Dates:</span>
                              <span className="font-medium text-slate-200">
                                {sub.profile.importantDates.length} recorded
                              </span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                        <button
                          type="button"
                          onClick={() => setSelectedSubmission(sub)}
                          className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Dossier</span>
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              exportProfileAsJSON(sub.profile);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-200"
                            title="Export JSON"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDelete(sub.id, e)}
                            className="p-1 text-slate-500 hover:text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-xl space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-rose-400" />
                <span>Change Admin Password</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Update the master password used to log in to this database vault (currently: <code className="text-rose-400">{getAdminPassword()}</code>).
              </p>
              <form onSubmit={handleUpdatePassword} className="space-y-3">
                <input
                  type="password"
                  value={newAdminPass}
                  onChange={(e) => setNewAdminPass(e.target.value)}
                  placeholder="Enter new admin password"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
                  >
                    Save New Password
                  </button>
                  {passSaveMsg && (
                    <span className="text-xs text-emerald-400 font-medium animate-fade-in">
                      {passSaveMsg}
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Danger Zone</span>
              </h3>
              <p className="text-xs text-rose-300/70 leading-relaxed">
                Clear all stored responses from your local database cache.
              </p>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-semibold transition-colors border border-rose-700"
              >
                Clear All Submissions
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Detailed Dossier Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {selectedSubmission.profile.basicDetails.callName?.[0] || 'H'}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {selectedSubmission.profile.basicDetails.callName || 'Her'}’s Confidential Dossier
                  </h3>
                  <p className="text-xs text-slate-400">
                    Submitted on {new Date(selectedSubmission.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => exportProfileAsJSON(selectedSubmission.profile)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable Dossier */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* 1. Basic Details */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>1. Basic Profile & Identity</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">What She Likes Being Called:</span>{' '}
                    <span className="font-semibold text-rose-300">
                      {selectedSubmission.profile.basicDetails.callName || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Her Nickname:</span>{' '}
                    <span className="font-semibold text-white">
                      {selectedSubmission.profile.basicDetails.nickname || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Favorite Color:</span>{' '}
                    <span className="font-semibold text-white">
                      {selectedSubmission.profile.basicDetails.favoriteColor || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Favorite Flower:</span>{' '}
                    <span className="font-semibold text-white">
                      {selectedSubmission.profile.basicDetails.favoriteFlower || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Favorite Place:</span>{' '}
                    <span className="font-semibold text-white">
                      {selectedSubmission.profile.basicDetails.favoritePlace || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Instant Happy Trigger:</span>{' '}
                    <span className="font-semibold text-amber-300">
                      {selectedSubmission.profile.basicDetails.instantHappy || '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Food & Treats */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>2. Food Preferences & Cravings</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Favorite Food:</span>{' '}
                    <span className="font-semibold text-amber-300">
                      {selectedSubmission.profile.foodPreferences.favoriteFood || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Disliked Food:</span>{' '}
                    <span className="font-semibold text-rose-300">
                      {selectedSubmission.profile.foodPreferences.dislikedFood || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Go-To Drink:</span>{' '}
                    <span className="font-semibold text-white">
                      {selectedSubmission.profile.foodPreferences.favoriteDrink || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Favorite Dessert:</span>{' '}
                    <span className="font-semibold text-white">
                      {selectedSubmission.profile.foodPreferences.favoriteDessert || '—'}
                    </span>
                  </div>
                </div>
                {selectedSubmission.profile.foodPreferences.allergiesOrAvoid && (
                  <div className="pt-2 text-xs">
                    <span className="text-rose-400 font-medium">⚠️ Allergies / Avoid:</span>{' '}
                    <span className="text-rose-200">
                      {selectedSubmission.profile.foodPreferences.allergiesOrAvoid}
                    </span>
                  </div>
                )}
              </div>

              {/* 3. Daily Habits & Mood */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>3. Daily Habits & De-stressing</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Chronotype:</span>{' '}
                    <span className="font-semibold text-white">
                      {selectedSubmission.profile.habits.chronotype || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Wake Time:</span>{' '}
                    <span className="font-semibold text-white">
                      {selectedSubmission.profile.habits.wakeTime || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Sleep Time:</span>{' '}
                    <span className="font-semibold text-white">
                      {selectedSubmission.profile.habits.sleepTime || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">What Calms Her:</span>{' '}
                    <span className="font-semibold text-emerald-300">
                      {selectedSubmission.profile.habits.whatCalms || '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Love & Relationship Care */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span>4. How To Love Her & Handle Disagreements</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400">Primary Love Language:</span>{' '}
                    <span className="font-semibold text-rose-300">
                      {selectedSubmission.profile.relationship.loveLanguage || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">When she is upset, she needs:</span>{' '}
                    <span className="font-semibold text-slate-200">
                      {selectedSubmission.profile.relationship.whenUpset?.join(', ') || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">What makes her feel most loved:</span>{' '}
                    <span className="font-semibold text-amber-200">
                      {selectedSubmission.profile.relationship.makesFeelLoved?.join(', ') || '—'}
                    </span>
                  </div>
                  {selectedSubmission.profile.relationship.partnerShouldRemember && (
                    <div>
                      <span className="text-slate-400">Partner should always remember:</span>{' '}
                      <span className="italic text-rose-200">
                        “{selectedSubmission.profile.relationship.partnerShouldRemember}”
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Important Dates */}
              {selectedSubmission.profile.importantDates?.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>5. Important Dates She Cherishes</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    {selectedSubmission.profile.importantDates.map((d, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <div>
                          <span className="font-medium text-white">{d.eventName}</span>
                          <span className="ml-2 text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            {d.category}
                          </span>
                        </div>
                        <span className="font-mono text-blue-300 font-semibold">{d.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Dreams & Aspirations */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>6. Her Dreams & Aspirations</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400">Biggest Personal Dream:</span>{' '}
                    <span className="font-semibold text-indigo-200">
                      {selectedSubmission.profile.dreams.biggestDream || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Dream Destination Together:</span>{' '}
                    <span className="font-semibold text-indigo-200">
                      {selectedSubmission.profile.dreams.dreamVacation || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Experience to have together:</span>{' '}
                    <span className="font-semibold text-indigo-200">
                      {selectedSubmission.profile.dreams.experienceTogether || '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 7. Favorite Memory / Promise */}
              {(selectedSubmission.profile.aboutUs.favoriteMemory || selectedSubmission.profile.aboutUs.promiseWanted) && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 to-pink-950/30 border border-rose-800/60 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    💌 Her Memories & Special Hopes
                  </h4>
                  {selectedSubmission.profile.aboutUs.favoriteMemory && (
                    <div className="text-xs">
                      <span className="text-slate-400 font-medium">Favorite Memory of Us:</span>
                      <p className="italic text-sm text-rose-100 font-romantic mt-0.5">
                        “{selectedSubmission.profile.aboutUs.favoriteMemory}”
                      </p>
                    </div>
                  )}
                  {selectedSubmission.profile.aboutUs.promiseWanted && (
                    <div className="text-xs">
                      <span className="text-slate-400 font-medium">A Promise She Wants:</span>
                      <p className="italic text-sm text-amber-200 font-romantic mt-0.5">
                        “{selectedSubmission.profile.aboutUs.promiseWanted}”
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
