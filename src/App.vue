<template>
  <div class="contianer">
    <div class="clockContainer">
      <div class="clock">
        <h1 class="time"> {{ currentTimeSheet.duration ? new Date(currentTimeSheet.duration).getHours() - timerHourOffset : 0 }} </h1>
        <h1 class="space"> : </h1>
        <h1  class="time"> {{ currentTimeSheet.duration ? new Date(currentTimeSheet.duration).getMinutes() : 0 }} </h1>
        <h1 class="space"> : </h1>
        <h1 class="time"> {{ currentTimeSheet.duration ? new Date(currentTimeSheet.duration).getSeconds() : 0 }}</h1>
      </div>

      <div v-if="!currentTracking" class="clockButton" @click="currentTracking=true">START</div>
      <div v-else class="clockButton stop" @click="currentTracking=false">STOP</div>
    </div>

    <div class="timeHistoryContainer">
      <div 
        v-for="(timeHistory, index) in timeSheetHistory"
        :key="index"
        class="timeHistory"
      >
        <div class="day">
          <div>{{ timeHistory.startTimestamp ? new Date(timeHistory.startTimestamp).toDateString() : new Date().toDateString() }}</div>
          <div class="close" @click="deleteTimeSheet(index)">x</div>
        </div>
        <div class="clock">
          <h1 class="time"> {{ timeHistory.duration ? new Date(timeHistory.duration).getHours() - timerHourOffset : 0 }} </h1>
          <h1 class="space"> : </h1>
          <h1  class="time"> {{ timeHistory.duration ? new Date(timeHistory.duration).getMinutes() : 0 }} </h1>
          <h1 class="space"> : </h1>
          <h1 class="time"> {{ timeHistory.duration ? new Date(timeHistory.duration).getSeconds() : 0 }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { type TimeSheet } from "@/types";


  export default defineComponent({
    name: "App",
    data: function() {
      return {
        timerHourOffset: 19,
        currentTimeSheet: {
          id: null,
          startTimestamp: null,
          endTimestamp: null,
          duration: 0,
          dateCreatedTimestamp: null,
          dateModifiedTimestamp: null
        } as TimeSheet,
        timeSheetHistory: [] as TimeSheet[],
        currentTracking: false,
        timer: setInterval(() => {
          this.track();
        }, 1000)
      }
    },

    mounted: function() {
      let savedTimeSheet = JSON.parse(localStorage.getItem("timeSheetHistory") || "[]");

      this.timeSheetHistory = savedTimeSheet;
    },

    beforeUnmount: function() {
      clearInterval(this.timer);
    },

    methods: {
      track: function() {
        if ( this.currentTracking ) {
          this.currentTimeSheet = {
            id: this.currentTimeSheet.id || this.generateTimeSheetId(),
            startTimestamp: this.currentTimeSheet.startTimestamp || new Date().getTime(),
            endTimestamp: new Date().getTime(),
            duration: ( this.currentTimeSheet.endTimestamp || new Date().getTime() ) - ( this.currentTimeSheet.startTimestamp || new Date().getTime() ),
            dateCreatedTimestamp: this.currentTimeSheet.dateCreatedTimestamp || new Date().getTime(),
            dateModifiedTimestamp: new Date().getTime(),
            finished: false
          }
        }else {
          if ( this.currentTimeSheet.duration ) this.addTimeSheet();

          this.currentTimeSheet = {
            id: null,
            startTimestamp: null,
            endTimestamp: null,
            duration: null,
            dateCreatedTimestamp: null,
            dateModifiedTimestamp: null,
            finished: false
          };
        }
      },

      addTimeSheet: function() {
        this.currentTimeSheet.finished = true;
        this.timeSheetHistory.push(this.currentTimeSheet);

        localStorage.setItem('timeSheetHistory', JSON.stringify(this.timeSheetHistory));
      },

      removeTimeSheet: function(index : number) {
        this.timeSheetHistory.splice(index, 1);
      },

      generateTimeSheetId: function() {
        return Date.now().toString(36) + Math.floor(Math.random() * 100).toString(36);
      },

      deleteTimeSheet: function(index : number) {
        this.timeSheetHistory.splice(index, 1);

        localStorage.setItem('timeSheetHistory', JSON.stringify(this.timeSheetHistory));
      }
    }
  })
</script>

<style scoped>
.contianer {
  display: flex;
  flex-direction: row;
  gap: 20vw;
}

.timeHistory {
  background: #111111c0;
  display: flex;
  flex-direction: column;
  width: 30vw;
  justify-content: space-evenly;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.timeHistory .day {
  font-size: 20px;
  font-weight: bold;
  color: #a3a3a3;
  font-style: italic;
  margin-bottom: 10px;
  display: flex;
}

.timeHistory .day .close {
  color: white;
  position: relative;
  left: 20vw;
  font-size: 20px;
  cursor: pointer;
}

.timeHistory .clock {
  position: relative;
  left: 3vw;
  background: #0c0c0c;
}

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

.clockButton.stop {
  background: rgba(255, 0, 0, 0.267);
}

.clockButton.stop:hover {
  background: rgba(255, 0, 0, 0.767);
}


</style>
