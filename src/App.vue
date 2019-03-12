<template>
  <div id="app" style="margin: 0 auto;width:1000px;">
    <div style="width:100%;height:223px;overflow:hidden;margin-bottom:40px;">
      <img src="./assets/ecl-9.jpg" style="width:100%;display:block;">
      <div id="titlebar">
        <div id="title">个性化定制</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#titlebar {
  position: absolute;
  height: 40px;
  top: 191px;
  width:1000px;
  background-color: rgba(100, 149, 237, 0.7);
}

#title {
  position: relative;
  margin-left:20px;
  margin-top:8px;
  font-size: 1.1em;
  color: white;
}
</style>
