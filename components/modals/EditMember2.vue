<template>
  <div>
    <v-row>
      <v-dialog v-model="dialog" persistent>
        <template v-slot:activator="{ props }">
          <div class="tw-font-normal tw-ml-6 btn btn-sm tw-w-full md:tw-w-1/3 tw-mb-4 btn-outline-primary tw-text-blue-500 tw-cursor-pointer" color="primary" v-bind="props">Edit</div>
        </template>
        <v-card class="tw-mb-32">
          <v-card-title>
            <span class="text-h5">Edit Profile</span>
          </v-card-title>
          <div v-if="toaster">
            <Toaster :alert="toaster" />
          </div>
          <v-card-text>
            <v-container class="tw-mb-10">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Name" v-model="member.name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Email" v-model="member.email" type="email"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Home Town" v-model="member.home_town"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Phone" v-model="member.phone"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="DOB" v-model="member.dob"></v-text-field>
                </v-col>

                <!-- <v-col cols="12">
                  <v-text-field label="Password*" type="password" required></v-text-field>
                </v-col> -->
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="['Male', 'Female']" label="Gender" v-model="member.gender"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="['Single', 'Married']" label="Marital Status" v-model="member.marital_status"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="dataAssemblies" item-title="name" item-value="id" label="Assembly" v-model="member.assembly_id" :hint="`${member.assembly_id}`"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="dataMinistries" item-title="name" item-value="id" label="Ministry" v-model="member.ministry_id" :hint="`${member.ministry_id}`"></v-select>
                </v-col>
                <!-- <v-col cols="12" sm="6">
                  <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']" label="Interests" multiple></v-autocomplete>
                </v-col> -->
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Close </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="submitMember"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script setup>
const dialog = ref(false);
const props = defineProps({
  member: ref([]),
  assemblies: ref([]),
  ministries: ref([]),
  member_id: String,
});
const data = ref(props.member);
const toaster = reactive({});
const dataAssemblies = [];
const dataMinistries = [];

watch(dialog, async () => {
  if (dialog.value) {
    props.assemblies.filter((element) => {
      dataAssemblies.push({ name: element.attributes.name, id: element.id });
    });
    props.ministries.filter((element) => {
      dataMinistries.push({ name: element.attributes.name, id: element.id });
    });

    //
    member.name = data.value.attributes.name;
    member.email = data.value.attributes.email;
    member.home_town = data.value.attributes.home_town;
    member.phone = data.value.attributes.phone;
    member.dob = data.value.attributes.dob;
    member.gender = data.value.attributes.gender;
    member.marital_status = data.value.attributes.marital_status;
    member.address = data.value.attributes.address;
    member.ministry_id = data.value.attributes.ministry.id;
    member.assembly_id = data.value.attributes.assembly.id;
  }
});
//
const member = reactive({
  name: "",
  email: "",
  home_town: "",
  phone: "",
  dob: "",
  gender: "",
  assembly_id: "",
  ministry_id: "",
  marital_status: "",
  address: "",
});

let submitMember = async () => {
  let submitData = await useSubmitData("submitMember", "member/" + props.member_id, member, "put");
  // error_message.value = error.value.data.message;

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Member Edit",
      info: submitData.error.value.data.message,
    };
  } else {
    toaster.value = {
      type: "success",
      title: "Member Edit",
      info: "Church member tithe payed successfully!.",
    };
  }
};
</script>

<style></style>
