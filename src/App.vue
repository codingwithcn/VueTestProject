<template>
  <div class="contianer">
    <div class="clockContainer">
      <div class="clock">
        <h1 class="time"> 0 </h1>
        <h1 class="space"> : </h1>
        <h1  class="time"> 0 </h1>
        <h1 class="space"> : </h1>
        <h1 class="time"> 0 </h1>
      </div>

      <div v-if="!currentTracking" class="clockButton">START</div>
      <div v-else class="clockButton stop">STOP</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { type TimeSheet } from "@/types";


  export default defineComponent({
    name: "App",
    data() {
      return {
        currentTimeSheet: { } as TimeSheet,
        timeSheetHistory: [] as TimeSheet[],
        currentTracking: false
      }
    }
  })
</script>

<style scoped>
.clock {
  background: #111111;
  display: flex;
  width: 20vw;
  justify-content: space-evenly;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

h1.time {
  color: white;
}

h1.space {

}

.clockButton {
  background: rgba(0, 89, 255, 0.301);
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
  color: white;
  font-size: 30px;
  position: relative;
  left: 7vw;
  cursor: pointer;
}

.clockButton:hover {
  background: rgb(0, 89, 255);
}

</style>
