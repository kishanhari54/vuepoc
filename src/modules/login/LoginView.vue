<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="d-flex flex-column align-center justify-center">
        <section
          class="form-container d-flex flex-column align-center justify-center"
        >
          <section class="title d-flex flex-column align-center justify-center">
            <div>Asa-ichi</div>
            <div>Integrated Dashboard</div>
          </section>

          <section>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                label="Email"
                v-model="formData.email"
                type="email"
                :rules="[required, email]"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="formData.password"
                type="password"
                :rules="[required, minLength(5)]"
              ></v-text-field>

              <v-btn type="submit" color="primary" class="button-primary">
                Login
              </v-btn>
            </v-form>
          </section>
        </section>
      </v-col>
      <v-col cols="6">
        <v-img
          :src="require('@/assets/icons/DensoLandingImage1.svg')"
          contain
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/common/stores/userStore";
import { email, minLength, required } from "@/common/util/formValidations"; // Import validation rules
import { ref } from "vue";
import { LoginFormData } from "./interfaces/LoginView.interface";
// Initialize formData with proper typing
const formData = ref<LoginFormData>({
  email: "",
  password: "",
});

// Access the user store
const userStore = useUserStore();

// Define the handleSubmit function to handle login
const handleSubmit = async () => {
  const { email, password } = formData.value;

  // Log the values for debugging
  console.log(`Email: ${email}, Password: ${password}`);

  // Call the login action from the user store
  await userStore.login({ email, password });
};
</script>

<style scoped>
.v-container {
  background: gray;
}

/*
.form-container {
  width: 500px;
  background: white;
  padding: 50px;
}
.title {
  display: flex;
  justify-content: center;
}
*/
</style>
