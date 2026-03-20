import { useState, useEffect } from 'react';
import { Mic, ChevronDown, ChevronUp, ExternalLink, Trash2, Lock } from 'lucide-react';

interface Episode {
  id: number;
  episodeNumber: number;
  title: string;
  guestName: string;
  guestTitle: string;
  description: string;
  audioUrl?: string;
  embedUrl?: string;
  date: string;
  tags: string[];
}

export default function Podcast() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [expandedEpisode, setExpandedEpisode] = useState<number | null>(null);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    guestName: '',
    guestTitle: '',
    date: '',
    description: '',
    tags: '',
    embedUrl: '',
    audioUrl: ''
  });

  useEffect(() => {
    const savedEpisodes = localStorage.getItem('diabetesRoundtable_episodes');
    if (savedEpisodes) {
      setEpisodes(JSON.parse(savedEpisodes));
    }
  }, []);

  const saveEpisodes = (newEpisodes: Episode[]) => {
    localStorage.setItem('diabetesRoundtable_episodes', JSON.stringify(newEpisodes));
    setEpisodes(newEpisodes);
  };

  const handleUnlock = () => {
    if (adminPassword === 'reliefcare2024') {
      setAdminUnlocked(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleAddEpisode = () => {
    if (!formData.title || !formData.guestName || !formData.guestTitle || !formData.date || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newEpisode: Episode = {
      id: Date.now(),
      episodeNumber: episodes.length + 1,
      title: formData.title,
      guestName: formData.guestName,
      guestTitle: formData.guestTitle,
      description: formData.description,
      date: formData.date,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      embedUrl: formData.embedUrl || undefined,
      audioUrl: formData.audioUrl || undefined
    };

    const updatedEpisodes = [newEpisode, ...episodes].map((ep, index) => ({
      ...ep,
      episodeNumber: index + 1
    }));

    saveEpisodes(updatedEpisodes);
    setShowAddForm(false);
    setFormData({
      title: '',
      guestName: '',
      guestTitle: '',
      date: '',
      description: '',
      tags: '',
      embedUrl: '',
      audioUrl: ''
    });
  };

  const handleDeleteEpisode = (id: number) => {
    if (window.confirm('Are you sure you want to delete this episode?')) {
      const updatedEpisodes = episodes
        .filter(ep => ep.id !== id)
        .map((ep, index) => ({ ...ep, episodeNumber: index + 1 }));
      saveEpisodes(updatedEpisodes);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedEpisode(expandedEpisode === id ? null : id);
  };

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#00529b] to-[#003d75] rounded-lg p-12 text-center text-white mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-[#f58220] bg-white/10 flex items-center justify-center">
              <Mic className="w-10 h-10 text-white" />
            </div>
          </div>

          <p className="text-[#f58220] text-sm font-bold uppercase tracking-wider mb-2">
            The Official Podcast of Relief Care Foundation
          </p>

          <h1 className="text-5xl font-bold mb-6">
            The Diabetes Roundtable
          </h1>

          <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-6">
            Each episode of The Diabetes Roundtable brings you into an honest, expert-led conversation about life with diabetes. We sit down with physicians, endocrinologists, registered dietitians, certified diabetes educators, and other healthcare professionals to break down complex medical topics — from insulin management and nutrition to navigating health insurance — in a way that's clear, actionable, and genuinely empowering for patients, families, and caregivers.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {['Expert Guests', 'Diabetes Management', 'Insurance Navigation', 'Patient Empowerment'].map((tag) => (
              <span key={tag} className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#00529b]">
              {episodes.length > 0 ? `${episodes.length} episode${episodes.length > 1 ? 's' : ''} available` : 'Episodes coming soon'}
            </h2>
          </div>

          {episodes.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center shadow-md">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#e0f2f7] rounded-full flex items-center justify-center">
                <Mic className="w-10 h-10 text-[#00529b]" />
              </div>
              <h3 className="text-2xl font-bold text-[#00529b] mb-3">
                Episodes Coming Soon
              </h3>
              <p className="text-slate-600">
                We're recording our first episodes now. Subscribe and check back soon for expert conversations on diabetes care, management, and more.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div key={episode.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="bg-[#e0f2f7] text-[#00529b] font-bold px-3 py-1 rounded text-sm">
                            #{episode.episodeNumber}
                          </span>
                          {episode.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="bg-[#fff5e0] text-[#f58220] font-medium px-3 py-1 rounded text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                          {episode.title}
                        </h3>

                        <p className="text-slate-600 mb-2">
                          <span className="font-bold">{episode.guestName}</span> • {episode.guestTitle}
                        </p>

                        <p className="text-sm text-slate-500">{episode.date}</p>
                      </div>

                      <button
                        onClick={() => toggleExpand(episode.id)}
                        className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        {expandedEpisode === episode.id ? (
                          <ChevronUp className="w-6 h-6 text-[#00529b]" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-[#00529b]" />
                        )}
                      </button>
                    </div>

                    {expandedEpisode === episode.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-slate-700 leading-relaxed mb-6">
                          {episode.description}
                        </p>

                        {episode.embedUrl && (
                          <div className="mb-6">
                            <iframe
                              src={episode.embedUrl}
                              width="100%"
                              height="232"
                              frameBorder="0"
                              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                              loading="lazy"
                              className="rounded-lg"
                            />
                          </div>
                        )}

                        {episode.audioUrl && !episode.embedUrl && (
                          <audio controls className="w-full mb-6">
                            <source src={episode.audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        )}

                        {episode.audioUrl && (
                          <a
                            href={episode.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-[#00529b] hover:text-[#f58220] font-medium transition-colors"
                          >
                            <span>Open full episode</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {adminUnlocked && (
                          <button
                            onClick={() => handleDeleteEpisode(episode.id)}
                            className="mt-4 flex items-center space-x-2 bg-red-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Episode</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#00529b] mb-4 flex items-center space-x-2">
            <Lock className="w-6 h-6" />
            <span>Admin Panel</span>
          </h2>

          {!adminUnlocked ? (
            <div className="max-w-md">
              <p className="text-slate-600 mb-4">Enter password to manage episodes:</p>
              <div className="flex space-x-2">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                  placeholder="Enter password"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                />
                <button
                  onClick={handleUnlock}
                  className="bg-[#00529b] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#003d75] transition-colors"
                >
                  Unlock
                </button>
              </div>
              {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
            </div>
          ) : (
            <div>
              <p className="text-green-600 font-medium mb-4">Admin access granted</p>

              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#f58220] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#d16d15] transition-colors"
                >
                  Add New Episode
                </button>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Episode Title *"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Guest Name *"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Guest Title / Role *"
                    value={formData.guestTitle}
                    onChange={(e) => setFormData({ ...formData, guestTitle: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                  />

                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                  />

                  <textarea
                    placeholder="Episode Description *"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                  />

                  <div>
                    <input
                      type="text"
                      placeholder="Embed URL (Spotify, YouTube, etc.)"
                      value={formData.embedUrl}
                      onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                    />
                    <p className="text-sm text-slate-600 mt-1">
                      Use the embed URL (not the standard share link) from Spotify, YouTube, or your podcast host
                    </p>
                  </div>

                  <input
                    type="text"
                    placeholder="Direct Audio / Episode Link"
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                  />

                  <div className="flex space-x-4">
                    <button
                      onClick={handleAddEpisode}
                      className="flex-1 bg-[#00529b] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#003d75] transition-colors"
                    >
                      Add Episode
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-200 text-slate-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
