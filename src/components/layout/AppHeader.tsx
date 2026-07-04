import { Group, Title, Button, Text, Box, Menu, Modal, Stack, PasswordInput, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import api from '../../lib/api';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { IconKey, IconLogout, IconChevronDown } from '@tabler/icons-react';
import ExeudLogo from '../../assets/ExeudLogo';

export default function AppHeader() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  const resetPwForm = () => { setCurrentPw(''); setNewPw(''); setConfirmPw(''); };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      logout();
      navigate('/login');
      notifications.show({ title: 'Success', message: 'Logged out successfully', color: 'teal' });
    } catch (error) {
      console.error('Logout error:', error);
      logout();
      navigate('/login');
    }
  };

  const handleChangePassword = async () => {
    if (newPw !== confirmPw) {
      notifications.show({ color: 'red', title: 'Mismatch', message: 'New passwords do not match.' });
      return;
    }
    if (newPw.length < 6) {
      notifications.show({ color: 'red', title: 'Too short', message: 'New password must be at least 6 characters.' });
      return;
    }
    setPwLoading(true);
    try {
      await api.post('/auth/change-password', { currentPassword: currentPw, newPassword: newPw });
      notifications.show({ color: 'teal', title: 'Password changed', message: 'Your password has been updated.' });
      setPwModalOpen(false);
      resetPwForm();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to change password.';
      notifications.show({ color: 'red', title: 'Error', message: msg });
    } finally {
      setPwLoading(false);
    }
  };

  const headerStyles = `
        .ody-header {
          background: ${theme.other.gradients.header};
          border-bottom: 1px solid rgba(179, 136, 235, 0.15);
          box-shadow: ${theme.other.shadows.header};
        }
        .ody-header-title {
          font-family: 'Inter', system-ui, sans-serif;
          letter-spacing: -0.02em;
          background: ${theme.other.gradients.title};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ody-user-pill {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(179, 136, 235, 0.2);
          border-radius: 20px;
          padding: 4px 10px 4px 14px;
          cursor: pointer;
          transition: background 150ms ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ody-user-pill:hover {
          background: rgba(255, 255, 255, 0.12);
        }
      `;

  return (
    <>
      <style>{headerStyles}</style>

      <Group
        h="100%"
        px="lg"
        justify="space-between"
        data-testid="app-header"
        className="ody-header"
        style={{ width: '100%' }}
      >
        {/* Left: Logo + Title */}
        <Group gap="sm">
          <ExeudLogo size={40} />
          <Box>
            <Title order={3} className="ody-header-title" style={{ fontSize: '1.25rem', lineHeight: 1.5 }}>
              Exeud Grants
            </Title>
          </Box>
        </Group>

        {/* Right: User menu */}
        <Menu shadow="md" width={180} position="bottom-end" withArrow>
          <Menu.Target>
            <div className="ody-user-pill">
              <Text c="white" size="sm" fw={500} style={{ lineHeight: 1 }}>{user?.name}</Text>
              <IconChevronDown size={13} color="rgba(255,255,255,0.55)" />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconKey size={14} />} onClick={() => { resetPwForm(); setPwModalOpen(true); }}>
              Change password
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item leftSection={<IconLogout size={14} />} color="red" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {/* Change Password Modal */}
      <Modal
        opened={pwModalOpen}
        onClose={() => { setPwModalOpen(false); resetPwForm(); }}
        title="Change password"
        size="sm"
        centered
      >
        <Stack gap="sm">
          <PasswordInput
            label="Current password"
            placeholder="Enter your current password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.currentTarget.value)}
            autoComplete="current-password"
          />
          <PasswordInput
            label="New password"
            placeholder="At least 6 characters"
            value={newPw}
            onChange={(e) => setNewPw(e.currentTarget.value)}
            autoComplete="new-password"
          />
          <PasswordInput
            label="Confirm new password"
            placeholder="Repeat new password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.currentTarget.value)}
            autoComplete="new-password"
            error={confirmPw && newPw !== confirmPw ? 'Passwords do not match' : undefined}
            onKeyDown={(e) => { if (e.key === 'Enter') handleChangePassword(); }}
          />
          <Button
            mt="xs"
            onClick={handleChangePassword}
            loading={pwLoading}
            disabled={!currentPw || !newPw || !confirmPw}
            leftSection={<IconKey size={15} />}
          >
            Update password
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
