/**
 * Some const in development.
 */

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

export const DEBUG = process.env.NODE_ENV !== 'production';
