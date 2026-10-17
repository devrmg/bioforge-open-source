import React, { useRef, useState } from 'react';
import { ProfileData } from '../types/profile';
import { User, Image as ImageIcon, Upload, MapPin, Tag, AlertCircle } from 'lucide-react';

interface ProfileEditorProps {
  profile: ProfileData;
  onChange: (updated: ProfileData) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAvatarError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setAvatarError('Image size exceeds 2MB limit. Please choose a smaller image.');
      return;
    }

    setAvatarError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange({ ...profile, avatarUrl: result });
      }
    };
    reader.onerror = () => {
      setAvatarError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            Profile Identity
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Personal identity information displayed at the top of your bio page.
          </p>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative group">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={`${profile.displayName}'s avatar preview`}
              className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500/40 shadow-md bg-slate-800"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400">
              <ImageIcon className="w-8 h-8 opacity-40" />
            </div>
          )}
        </div>

        <div className="space-y-2 flex-grow">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Upload Photo</span>
            </button>
            {profile.avatarUrl && (
              <button
                type="button"
                onClick={() => onChange({ ...profile, avatarUrl: '' })}
                className="px-2.5 py-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
              >
                Remove
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarFile}
              className="hidden"
              aria-label="Upload profile image"
            />
          </div>
          <p className="text-xs text-slate-400">
            JPG, PNG or WebP up to 2MB. Saved securely in local storage; not uploaded to any remote server.
          </p>
          {avatarError && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/60">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{avatarError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Name and Handle inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-displayName" className="block text-xs font-medium text-slate-300 mb-1.5">
            Display Name <span className="text-emerald-400">*</span>
          </label>
          <input
            id="profile-displayName"
            type="text"
            required
            maxLength={80}
            value={profile.displayName}
            onChange={(e) => onChange({ ...profile, displayName: e.target.value })}
            placeholder="e.g. Alex Morgan"
            className="w-full px-3.5 py-2 text-sm bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="profile-handle" className="block text-xs font-medium text-slate-300 mb-1.5">
            Handle / Username
          </label>
          <input
            id="profile-handle"
            type="text"
            maxLength={40}
            value={profile.handle}
            onChange={(e) => onChange({ ...profile, handle: e.target.value })}
            placeholder="e.g. @alexmorgan"
            className="w-full px-3.5 py-2 text-sm bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Profession Badge & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="profile-badge" className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            Headline / Profession Badge
          </label>
          <input
            id="profile-badge"
            type="text"
            maxLength={60}
            value={profile.professionBadge}
            onChange={(e) => onChange({ ...profile, professionBadge: e.target.value })}
            placeholder="e.g. Filmmaker & Sound Designer"
            className="w-full px-3.5 py-2 text-sm bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="profile-location" className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Location (Optional)
          </label>
          <input
            id="profile-location"
            type="text"
            maxLength={60}
            value={profile.location || ''}
            onChange={(e) => onChange({ ...profile, location: e.target.value })}
            placeholder="e.g. Brooklyn, NY"
            className="w-full px-3.5 py-2 text-sm bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Bio / Description */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="profile-bio" className="block text-xs font-medium text-slate-300">
            Bio / Description
          </label>
          <span className="text-[11px] text-slate-500 font-mono">
            {profile.bio.length}/400
          </span>
        </div>
        <textarea
          id="profile-bio"
          rows={3}
          maxLength={400}
          value={profile.bio}
          onChange={(e) => onChange({ ...profile, bio: e.target.value })}
          placeholder="Brief intro highlighting your craft, current projects, or what visitors can explore below."
          className="w-full px-3.5 py-2 text-sm bg-slate-950/80 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
        />
      </div>
    </div>
  );
};
