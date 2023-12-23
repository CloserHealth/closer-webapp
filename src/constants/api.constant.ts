export const API_HOST = 'https://api.closer.health';
// export const API_HOST_LOCAL = 'https://closer-api-b32d7e1b3891.herokuapp.com';

export const API = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  changePassword: '/auth/password/change',
  resetPassword: '/auth/password/reset',
  verify: '/auth/email/verify',
  resendToken: '/auth/email/resend',
  updateUser: '/auth/user/update',


  // Dashboard
  dashboard: '/dashboard',

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

  symptom: '/symptoms',
  symptomConfig: '/symptom-config',
  userSymptom: '/user-symptoms',
  userTask: '/user-tasks',
  period: '/periods/log',

  taskCategory: '/task-categories',
  checkTaskPhase: '/user-tasks/check-phase',
};

export default API;


