import React, { useState } from 'react'
import {
  FaUser,
  FaLock,
  FaMoon,
  FaSun,
  FaBell,
  FaGlobe,
  FaImage,
  FaCheck
} from 'react-icons/fa';

export default function Setting() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className={`p-6 text-white min-h-screen ${darkMode ? 'bg-black' : 'bg-white text-black'}`}>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* Account Info */}
      <div className="bg-gray-900 p-6 rounded-xl mb-6 shadow-lg"
      style={{
            background:
              "linear-gradient(160deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
          }}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaUser /> Account Info
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 rounded bg-gray-600 text-white border border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-600 text-white border border-gray-700"
              placeholder="Enter your name..."
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-600 text-white border border-gray-700"
              placeholder="Enter your email..."
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="p-6 rounded-xl mb-6 shadow-lg"
      style={{
            background:
              "linear-gradient(160deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
          }}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaLock /> Security
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Change Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-600 text-white border border-gray-700"
              placeholder="New Password"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="p-6 rounded-xl mb-6 shadow-lg"
      style={{
            background:
              "linear-gradient(160deg, #1a1a1a 0%, #000000 50%, #1a1a1a 75%, #2e2e2e 100%)",
          }}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaMoon /> Preferences
        </h3>

        {/* Theme Toggle */}
        <div className="flex items-center gap-4 mb-4">
          <span>Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
              darkMode ? 'bg-purple-600' : 'bg-gray-600 text-white'
            }`}
          >
            {darkMode ? <FaMoon /> : <FaSun />}
            {darkMode ? 'On' : 'Off'}
          </button>
        </div>

        {/* Notification Toggle */}
        <div className="flex items-center gap-4 mb-4">
          <span>Notifications</span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
              notifications ? 'bg-green-600' : 'bg-gray-600 text-white'
            }`}
          >
            <FaBell />
            {notifications ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="mb-1 text-sm flex items-center gap-2">
            <FaGlobe /> Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 rounded bg-gray-600 text-white border border-gray-700"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        {/* Theme Preview (just label) */}
        <div className="text-sm text-gray-400">
          Theme Preview: Coming Soon...
        </div>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={handleSave}
          className="bg-neutral-600 font-medium px-6 py-2 rounded flex items-center gap-2 addButton"
        >
          <FaCheck />
          Save Settings
        </button>
      </div>
    </div>
  );
}
