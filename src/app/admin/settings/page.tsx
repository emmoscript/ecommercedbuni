"use client"

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FaCog, FaUser, FaLock, FaSlidersH } from 'react-icons/fa';
import { Switch } from '@/components/ui/switch'; // Assuming you have a Switch component

const settings = [
  { id: 1, name: 'Site Name', value: 'Nutrifuel' },
  { id: 2, name: 'Site URL', value: 'https://nutrifuel.io' },
  { id: 3, name: 'Contact Email', value: 'contact@nutrifuel.com' },
];

const users = [
  { id: 1, username: 'admin', role: 'Admin' },
  { id: 2, username: 'editor', role: 'Editor' },
  { id: 3, username: 'viewer', role: 'Viewer' },
];

export default function SettingsPage() {
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  return (
    <div className="flex min-h-screen flex-col p-4 space-y-4">
      <Card className="p-4 max-h-[500px] overflow-y-auto">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FaCog className="text-2xl" />
          <span>General Settings</span>
        </h2>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Setting</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.map(setting => (
              <TableRow key={setting.id}>
                <TableCell className="font-medium">{setting.name}</TableCell>
                <TableCell>{setting.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Reset to Defaults</button>
        </div>
      </Card>

      <Card className="p-4 max-h-[500px] overflow-y-auto">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FaUser className="text-2xl" />
          <span>User Management</span>
        </h2>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Delete User</button>
        </div>
      </Card>

      <Card className="p-4 max-h-[500px] overflow-y-auto">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FaLock className="text-2xl" />
          <span>Security Settings</span>
        </h2>
        <div className="mt-4 flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <span>Enable Two-Factor Authentication</span>
            <Switch
              checked={isFeatureEnabled}
              onChange={() => setIsFeatureEnabled(!isFeatureEnabled)}
            />
          </label>
          <label className="flex items-center space-x-2">
            <span>Enable Notifications</span>
            <Switch
              checked={isNotificationsEnabled}
              onChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            />
          </label>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      </Card>

      <Card className="p-4 max-h-[500px] overflow-y-auto">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FaSlidersH className="text-2xl" />
          <span>Application Settings</span>
        </h2>
        <p className="mt-2">Configure application-specific settings here.</p>
        {/* Add forms or components for application settings */}
        <div className="mt-4 flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      </Card>
    </div>
  );
}
