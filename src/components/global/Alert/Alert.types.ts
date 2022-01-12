import Alert from './Alert';

export enum AlertType {
  DANGER = 'danger',
  INFO = 'info',
  NORMAL = 'normal',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export const styles = {
  [AlertType.NORMAL]: {
    container: 'bg-blue-100 rounded-lg dark:bg-blue-200',
    text: 'text-blue-700 dark:text-blue-800',
    button:
      'bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300',
  },
  [AlertType.DANGER]: {
    container: 'bg-red-100 rounded-lg dark:bg-red-200',
    text: 'text-red-700 dark:text-red-800',
    button:
      'bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300',
  },
  [AlertType.SUCCESS]: {
    container: 'bg-green-100 rounded-lg dark:bg-green-200',
    text: 'text-green-700 dark:text-green-800',
    button:
      'bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300',
  },
  [AlertType.WARNING]: {
    container: 'bg-yellow-100 rounded-lg dark:bg-yellow-200',
    text: 'text-yellow-700 dark:text-yellow-800',
    button:
      'bg-yellow-100 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300',
  },
};
