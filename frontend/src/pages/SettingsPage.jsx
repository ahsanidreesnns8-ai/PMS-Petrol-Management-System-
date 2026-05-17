import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { settingsService } from '../services/settingsService';
import { getSiteConfig, saveSiteConfig } from '../config/site';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import PageHeader from '../components/ui/PageHeader';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const initialSite = getSiteConfig();
  const [branding, setBranding] = useState({
    pumpName: initialSite.pumpName,
    address: initialSite.address,
    phone: initialSite.phone,
    facebook: initialSite.facebook,
    instagram: initialSite.instagram,
    lat: String(initialSite.location.lat),
    lng: String(initialSite.location.lng),
    locationName: initialSite.location.name,
  });

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await settingsService.updateProfile(profile);
      updateUser(res.data.data);
      setSuccess('Profile updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    try {
      await settingsService.changePassword(passwords);
      setSuccess('Password changed');
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Password change failed');
    }
  };

  const toggleTheme = async () => {
    const theme = user?.theme === 'dark' ? 'light' : 'dark';
    try {
      const res = await settingsService.updateTheme(theme);
      updateUser(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Theme update failed');
    }
  };

  const saveBranding = (e) => {
    e.preventDefault();
    saveSiteConfig({
      ...getSiteConfig(),
      pumpName: branding.pumpName,
      address: branding.address,
      phone: branding.phone,
      facebook: branding.facebook,
      instagram: branding.instagram,
      location: {
        lat: parseFloat(branding.lat),
        lng: parseFloat(branding.lng),
        name: branding.locationName,
      },
    });
    setSuccess('Facebook, Instagram & GPS settings saved!');
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <PageHeader title="Settings" subtitle="Profile, branding, social media & station GPS" />
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={success} onClose={() => setSuccess('')} />

      <form onSubmit={saveBranding} className="card space-y-3 border-l-4 border-l-amber-500">
        <h2 className="font-bold text-lg">📱 Facebook, Instagram & GPS</h2>
        <p className="text-sm text-slate-500">Paste your real page links and pump coordinates from Google Maps.</p>
        <Input label="Pump name" value={branding.pumpName} onChange={(e) => setBranding({ ...branding, pumpName: e.target.value })} />
        <Input label="Address" value={branding.address} onChange={(e) => setBranding({ ...branding, address: e.target.value })} />
        <Input label="Phone" value={branding.phone} onChange={(e) => setBranding({ ...branding, phone: e.target.value })} />
        <Input label="Facebook page URL" value={branding.facebook} onChange={(e) => setBranding({ ...branding, facebook: e.target.value })} placeholder="https://www.facebook.com/yourpage" />
        <Input label="Instagram profile URL" value={branding.instagram} onChange={(e) => setBranding({ ...branding, instagram: e.target.value })} placeholder="https://www.instagram.com/yourpage" />
        <Input label="Station name (on map)" value={branding.locationName} onChange={(e) => setBranding({ ...branding, locationName: e.target.value })} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="GPS Latitude" value={branding.lat} onChange={(e) => setBranding({ ...branding, lat: e.target.value })} />
          <Input label="GPS Longitude" value={branding.lng} onChange={(e) => setBranding({ ...branding, lng: e.target.value })} />
        </div>
        <p className="text-xs text-slate-400">Tip: Google Maps → right-click your pump → copy coordinates</p>
        <Button type="submit">Save Social & GPS</Button>
      </form>

      <form onSubmit={saveProfile} className="card space-y-2">
        <h2 className="font-semibold">Profile</h2>
        <Input label="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        <Input label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
        <p className="text-sm text-slate-500">Email: {user?.email}</p>
        <Button type="submit">Save Profile</Button>
      </form>

      <form onSubmit={savePassword} className="card space-y-2">
        <h2 className="font-semibold">Change Password</h2>
        <Input label="Current Password" type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} required />
        <Input label="New Password" type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} required />
        <Button type="submit">Update Password</Button>
      </form>

      <section className="card">
        <h2 className="font-semibold mb-2">Theme</h2>
        <Button variant="secondary" onClick={toggleTheme}>
          Switch to {user?.theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Button>
      </section>
    </div>
  );
}
