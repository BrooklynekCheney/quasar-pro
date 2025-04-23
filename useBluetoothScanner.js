"use strict";
import { BleClient } from "@capacitor-community/bluetooth-le";
import { ref } from "vue";

// const { BrowserWindow } = require('electron');
// let win;

let win = null;
var callbackForBluetoothEvent = null;
export function useBluetoothScanner() {
  const scanResults = ref([]);
  const scanning = ref(false);
  const deviceIds = [];

  async function scan() {
    await BleClient.initialize();

    console.log(BleClient.getDevices(deviceIds))
    //  await function  createWindow () {
    //       win = new BrowserWindow({
    //         width: 800,
    //         height: 600,
    //         webPreferences: {
    //           nodeIntegration: true,
    //           contextIsolation: false,
    //         },
    //       });

    //     }
    win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
      event.preventDefault(); //important, otherwise first available device will be selected
      console.log(deviceList); //if you want to see the devices in the shell
      let bluetoothDeviceList = deviceList;
      callbackForBluetoothEvent = callback; //to make it accessible outside createWindow()

      win.webContents.send('channelForBluetoothDeviceList', bluetoothDeviceList);
    });
    if (navigator.bluetooth && navigator.bluetooth.requestDevice) {

      // console.log(BleClient.getDevices(deviceIds))
      // Function exists, proceed to use it

      //   try {
      //     console.log('Scan started:')
      //   }
      //   catch {
      //     console.log('Scan st')
      //   }

      try {
        navigator.bluetooth.requestDevice({
          acceptAllDevices: true,

          // Optional filters:
          //   filters: [{services: ['battery_service']}]
        });
        // win.webContents.on('select-bluetooth-device', (event, deviceList) => {
        //   event.preventDefault(); //important, otherwise first available device will be selected
        //   console.log(deviceList); })

        console.log("Scan st");

        // Stop scanning after a timeout (optional)
        setTimeout(async () => {
          await BleClient.stopLEScan();
          console.log("Scan stopped");
        }, 10000); // Stop after 10 seconds
        console.log("Scan started:", scan);
      } catch (error) {
        console.error("Error during scanning:", error);
      }
    } else {
      // Function does not exist, handle accordingly
      console.warn("requestLEScan is not supported in this browser.");
      // Provide alternative functionality or inform the user
    }
  }

  return {
    scanResults,
    scanning,
    scan,
    // selectFromDevicePicker,
    // closeDevicePicker,
    // cancelDevicePicker,
    // discoverDevice,
    // startDevicepicker,
    // createWindow,
  };
}
