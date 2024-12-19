import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
    roles: ['User'],
  },
  {
    displayName: 'Menu Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/user/userdashboard',
    roles: ['User'],
  },
  {
    displayName: 'My Orders',
    iconName: 'mynaui:tablet',
    route: '/user/user-que',
    roles: ['User'],
  },
  {
    navCap: 'Admin Dashboard',
    roles: ['Admin', 'Staff'],
  },
  {
    displayName: 'Orders',
    iconName: 'mynaui:tablet',
    route: '/admin/admin-order',
    roles: ['Admin', 'Staff'],
  },
  {
    displayName: 'Menu Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/admin/admin-dashboard',
    roles: ['Admin', 'Staff'],
  },
  {
    navCap: 'Maintenance',
    divider: true,
    roles: ['Admin', 'Staff'],
  },
  {
    displayName: 'Maintenance Dashboard',
    iconName: 'fluent:settings-16-regular',
    route: '/admin/admin-maintenance',
    roles: ['Admin', 'Staff'],
  },
  {
    navCap: 'Settings',
    divider: true,
    roles: ['Admin'],
  },
  {
    displayName: 'User Management',
    iconName: 'fa-solid:user-cog',
    route: '/settings/admin-settings',
    roles: ['Admin'],
  },
  {
    navCap: 'Ui Components',
    divider: true,
    roles: ['Admin'],
  },
  {
    displayName: 'Badge',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/ui-components/badge',
    roles: ['Admin'],
  },
  {
    displayName: 'Chips',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/chips',
    roles: ['Admin'],
  },
  {
    displayName: 'Lists',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lists',
    roles: ['Admin'],
  },
  {
    displayName: 'Menu',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/menu',
    roles: ['Admin'],
  },
  {
    displayName: 'Tooltips',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/tooltips',
    roles: ['Admin'],
  },
  {
    displayName: 'Forms',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
    roles: ['Admin'],
  },
  {
    displayName: 'Tables',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/tables',
    roles: ['Admin'],
  },
  {
    navCap: 'Auth',
    divider: true,
    roles: ['Admin'],
  },
  {
    displayName: 'Login',
    iconName: 'solar:login-3-line-duotone',
    route: '/authentication/login',
    roles: ['Admin'],
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication/register',
    roles: ['Admin'],
  },
  {
    navCap: 'Extra',
    divider: true,
    roles: ['Admin'],
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
    roles: ['Admin'],
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/extra/sample-page',
    roles: ['Admin'],
  },
  {
    navCap: 'Dashboard Components',
    divider: true,
    roles: ['Admin'],
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
    roles: ['Admin'],
  },
];
