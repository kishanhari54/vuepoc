// Styles
import DownloadFile from "@/assets/icons/DownloadFile.vue";
import RearrangeIcon from "@/assets/icons/RearrangeIcon.vue";
import UploadDocument from "@/assets/icons/UploadDocument.vue";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { h } from "vue";
import { IconProps, VuetifyOptions, createVuetify } from "vuetify";

// Define custom icons set
const customIcons = { UploadDocument, DownloadFile, RearrangeIcon };

// Define custom icon component
const custom = {
  /*  component: (props: { tag: string; icon: keyof typeof customIcons }) =>
    h(props.tag, [h(customIcons[props.icon], { class: "v-icon__svg" })]),*/
  component: (props: IconProps) => {
    // Safely access the 'icon' property and use it to render the correct icon
    const { icon } = props;

    // Ensure that icon is one of the custom icons or fallback to a default
    if (icon && customIcons[icon as keyof typeof customIcons]) {
      return h(customIcons[icon as keyof typeof customIcons], {
        class: "v-icon__svg",
      });
    }
    return null; // Return null if no valid icon is provided
  },
};

// Vuetify configuration
const vuetifyConfig: VuetifyOptions = {
  icons: {
    defaultSet: "mdi",
    sets: {
      custom,
    },
  },
};

// Create and export the Vuetify instance
export default createVuetify(vuetifyConfig);
