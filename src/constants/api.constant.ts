export const API_HOST = 'https://api.closer.health';
// export const API_HOST_LOCAL = 'https://closer-api-b32d7e1b3891.herokuapp.com';

export const API = {
  // Auth
  login: '/admin/auth/login',
  logout: '/admin/auth/logout',
  changePassword: '/auth/password/change',
  resetPassword: '/admin/auth/password/reset',
  verify: '/admin/auth/password/verify',
  resendToken: '/admin/auth/password/resend',
  adminUser: '/admin/auth/user',

  // Dashboard
  dashboard: '/admin/dashboard?year=2023',

  // Users
  users: '/admin/users',

  // Rings
  rings: '/admin/rings',
  createRing: '/admin/rings',

  // Period Management
  periodPhases: '/admin/phases',

  // Admin Management
  admins: '/admin/all',
  adminStatus: '/admin',
  createAdmin: '/admin/create',

  // Content Management
  getQuestions: '/admin/questions',
  getLearnings: '/admin/learnings',
  getArticles: '/admin/articles',
  getChallenges: '/admin/challenges',

  // Projects
  getProjects: '/admin/projects',
};

export default API;


