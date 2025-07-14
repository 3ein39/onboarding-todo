export const TEST_ID = {
  APP_PAGE: {
    TITLE: 'app-page-title',
    USER_BUTTON: 'app-page-user-button',
    USER_NAME: 'app-page-user-name',
  },
  AUTH: {
    CALLBACK: 'auth-callback',
    LOGIN: {
      EMAIL_INPUT: 'login-form-email-input',
      PASSWORD_INPUT: 'login-form-password-input',
      SUBMIT_BUTTON: 'login-form-submit-button',
    },
  },
  SETTINGS: {
    DIALOG: 'settings-dialog',
    FEATURES: {
      USERS: {
        AVATAR: 'settings-features-users-avatar',
        DIALOG: 'settings-features-users-dialog',
        EMAIL: 'settings-features-users-email',
        NAME: 'settings-features-users-name',
        ROLE_SELECT: 'settings-features-user-role-select',
        SUBMIT_BUTTON: 'settings-features-users-submit-button',
      },
    },
    OPEN_DIALOG_BUTTON: 'settings-open-dialog-button',
    SIDEBAR: {
      USER_BUTTON: 'settings-sidebar-users-container',
    },
  },
  SHARED: {
    MALFORMED_RESPONSE_TOAST: 'shared-malformed-response-toast',
  },
  TODOS: {
    CREATE: {
      BUTTON: 'todos-create-button',
      SUBMIT_BUTTON: 'todos-create-submit-button',
    },
    DELETE: {
      CONFIRM_BUTTON: 'todos-delete-confirm-button',
      MENU_ITEM: 'todos-delete-menu-item',
    },
    OVERVIEW: {
      CREATE_BUTTON: 'todos-overview-create-button',
    },
    TABLE: {
      COMPLETED: 'todos-table-completed',
      CONTAINER: 'todos-table-container',
      CREATED_AT: 'todos-table-created-at',
      DESCRIPTION: 'todos-table-description',
      DUE_DATE: 'todos-table-due-date',
      MENU_BUTTON: 'todos-table-menu-button',
      TITLE: 'todos-table-title',
    },
  },
  USERS: {
    CREATE: {
      SUCCESS_TOAST: 'users-create-success-toast',
    },
    DETAIL: {
      EDIT_BUTTON: 'users-detail-edit-button',
    },
    FORM: {
      BIRTH_DATE_INPUT: 'users-form-birth-date-input',
      FIRST_NAME_INPUT: 'users-form-first-name-input',
      LAST_NAME_INPUT: 'users-form-last-name-input',
      SUBMIT_BUTTON: 'users-form-submit-button',
      TITLE: 'users-form-title',
    },
    OVERVIEW: {
      CREATE_BUTTON: 'users-overview-create-button',
      TABLE: {
        ACTION: 'users-overview-table-action',
        CONTAINER: 'users-overview-table-container',
        EMAIL: 'users-overview-table-email',
        NAME: 'users-overview-table-name',
        ROLE: 'users-overview-table-role',
        USER: 'users-overview-table-user',
      },
      TITLE: 'users-overview-title',
    },
    UPDATE: {
      SUCCESS_TOAST: 'users-update-success-toast',
    },
  },
} as const
