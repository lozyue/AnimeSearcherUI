/**
 * Some const of development.
 */

export const DocumentDefaultTitle = "AnimeSearcher"; // process.plugins.options.title;
export const INFO = true;

/**
 * Task Status
 */
const CREATED = 'created';
const IDLE = 'idle';
const LOADING = 'loading';
const SAVING = 'saving';
const CLEARING = 'clearing';

const ACTIVED = 'actived';
const EXECUTED = 'executed';
const TERMINATED = 'terminated'

export {
  CREATED,
  IDLE,
  LOADING,
  SAVING,
  CLEARING,

  ACTIVED,
  EXECUTED,
  TERMINATED,
};

// About git stars
export const GitRepository = {
  forks: 41,
  stars: 373,
  watch: 4,
};

// Environment Relatived Constant Variables
export const DEBUG = process.env.NODE_ENV !== 'production';
export const ProjectBasePath = process.env.BASE_URL;
export const AnimeUIVersion = process.env.VUE_APP_VERSION;
