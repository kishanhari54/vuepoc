<template>
  <v-app>
    <v-main>
      <router-view />
      <DialogProvider />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import DialogProvider from "@/common/modules/DialogWrapper/DialogProvider.vue";
</script>

<style>
body {
  font-family: Open Sans !important;
}
.v-pagination__list {
  align-items: center !important;
}

/* Dialog Component */

.v-dialog {
  .v-card {
    padding: 32px;
    padding-bottom: 24px;
    border-radius: 10px;
    .v-card-title {
      font-family: Inter;
      font-size: 28px;
      font-weight: 600;
      line-height: 33.89px;
      text-align: left;
      margin-bottom: 49px;
    }

    .v-card-actions {
      gap: 20px;
    }
  }

  .dialog-layout {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;

    .overlay {
      width: 30%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      cursor: pointer;
    }

    .dialog-content {
      width: 70%;
      height: 100%;
      border-radius: 0;
      display: flex;
      flex-direction: column;
    }
    .loading-spinner {
      position: absolute;
      top: 50%;
      left: 65%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    }

    :deep(.v-overlay__scrim) {
      opacity: 0 !important;
    }

    :deep(.v-dialog) {
      background: transparent !important;
      box-shadow: none;
    }

    :deep(.v-card-text) {
      padding: 24px;
    }
  }
}

/* Button Styles */
.v-btn {
  height: 44px !important;
  font-family: Open Sans !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  border-radius: 6px !important;

  &.primary {
    background-color: #dc0032;
    color: white;
  }
  &.secondary {
  }
}

.v-btn--variant-outlined {
  &.primary {
    border: 1.5px solid #dc0032;
    color: #dc0032;
    background: unset;
  }
  &.secondary {
    color: #5a5a5a;
    border: 1.5px solid #5a5a5a;
  }
}

.v-btn--icon .v-btn__content {
  width: 15.23px !important;
  height: 18px !important;
}

/* Text field */
.search-field {
  min-width: 300px;
}
.v-label {
  color: #828282;
  font-weight: 400;
}
.v-form {
  .v-label {
    font-weight: 600px;
  }
}
.v-input .v-input__control .v-field {
  background-color: #ebebeb80;
  box-shadow: none;
}

.v-field .v-icon {
  color: #dc0032;
}
/*

.v-input__control {
  height: 44px !important; / * Set fixed height for all input fields  * /
}

.v-select .v-input__control {
  height: 44px !important; / * Ensure select fields also have the same height * /
}

.v-text-field .v-input__control {
  height: 44px !important; / * Set fixed height for text fields * /
}

.v-select .v-select__slot {
  height: 44px !important; / * Ensures the height is consistent in the select dropdown * /
}

.v-input__control .v-text-field__slot {
  height: 44px !important; / * Override input slot height if needed * /
}

/ * Optional: Adjust line height for better text alignment * /
.v-input__control .v-text-field__control {
  line-height: 44px !important;
}

.v-select .v-select__input {
  line-height: 44px !important; / * Fix line height for select fields * /
}
*/

/* Table Style */
.v-table__wrapper {
  border: 1px solid #d2d2d2;
  border-radius: 8px !important;
  th {
    font-family: Open Sans;
    font-size: 16px;
    font-weight: 700;
    line-height: 21.79px;
    letter-spacing: 0.04em;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    background: #000000;
    color: white;
  }

  tr {
    background-color: #ebebeb80;
    padding: 0px 1px;
    margin: 4px;
  }
  td {
    font-family: Open Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.79px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    &.bold {
      font-weight: 700;
    }
    &.action-buttons .v-icon {
      color: #dc0032;
    }
  }
}

/* Page Layouting */
.page-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  .page-title {
    font-family: Open Sans;
    font-size: 24px;
    font-weight: 700;
    line-height: 32.68px;
    letter-spacing: 0.04em;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  margin-bottom: 14px;
}

.page-data {
  .option {
    border: 1px solid #d2d2d2;
    padding: 30px;
    margin-bottom: 20px;
  }
}

.page-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
