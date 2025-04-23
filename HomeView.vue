<template>
  <div>
    <ul>
      <!-- <li v-for="device in scannedDevices" :key="device.id">
        {{ device.name || device.id }}
      </li> -->
    </ul>
    <button @click="startS()">Increment</button>
  </div>

  <div>
    <HomeComp />
  </div>
  <div>
    <!-- <DeviceView @command="writeCommand($event)" /> -->
  </div>
</template>

<script>
import { BleClient } from "@capacitor-community/bluetooth-le";
// import DeviceView from './DeviceView.vue'
import HomeComp from './HomeComp.vue'
import { mapState } from 'vuex';
import { mapActions } from 'vuex';


export default {
  components: {
    // DeviceView,
    HomeComp
  },
  data() {

    return {

    }


  },
  computed: {
    ...mapState('bluetooth', {
      scannedDevices: 'getScannedDevices',
    }),
  },
  methods: {
    ...mapActions(['startScanning']),
    // startScanning() {
    //   this.startScanning();
    async startS() {

      const devices = await BleClient.startScan();
      console.log(devices)
    }
    // },
  },
  mounted() {

    // Call the Vuex action to start scanning
    // this.$store.dispatch('bluetooth/startScanning');
  },
  actions() {

  }
