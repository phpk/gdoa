<template>
  <div id="app">
     <template>
      <Toolbar></Toolbar>
      <Edit></Edit>
    </template>
  </div>
</template>

<script>
import Toolbar from "./pages/Edit/components/Toolbar";
import Edit from "./pages/Edit/components/Edit";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Toolbar,
    Edit,
  },
  async created() {
    await this.getUserMindMapData();
  },
  methods: {
    ...mapActions(["getUserMindMapData"]),
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
