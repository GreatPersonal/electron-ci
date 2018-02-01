<template>
  <div id="app">
    <div id="sidenav" class="sidenav">
        <div class="sidenav-logo"></div>
         <div class="sidenav-item sidenav-call">
            <router-link to="/call">{{ $t("ap.bigtab.d") }}</router-link>
        </div>
         <div class="sidenav-item sidenav-call">
            <router-link to="/call">{{ $t("ap.bigtab.d") }}</router-link>
        </div>
         <div class="sidenav-item sidenav-call">
            <router-link to="/call">{{ $t("ap.bigtab.d") }}</router-link>
        </div>
         <div class="sidenav-item sidenav-call">
            <router-link to="/call">{{ $t("ap.bigtab.d") }}</router-link>
        </div>
         <div class="sidenav-item sidenav-call">
            <router-link to="/call">{{ $t("ap.bigtab.d") }}</router-link>
        </div>
    </div>
    <proxy-menu :recordlist-view="showRecordView"></proxy-menu>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import router from './router'
import proxyMenu from './components/menu.vue'

export default {
    data () {
        return {
            showRecordView: true
        }
    },
    components: {
        proxyMenu
    },
    created() {
        const self = this;
        router.beforeEach((to, from, next) => {
            const path = to.path.slice(1);
            // self.showRecordView = (path !== 'network');
            next();
        });
    }
}
</script>

<style>
html, body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: sans-serif;
}
body {
  font-family: Helvetica, sans-serif;
  -webkit-user-select: none;
  user-select: none;
}
pre {
    margin: 0;
    padding: 10px;
    overflow-x: scroll;
}
h1,h2,h3,h4 {
    margin: 0;
    padding: 0;
}
#app {
    display: -webkit-box;
    height:100%;
}
.sidenav {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    width: 130px;
    background-color: #3b4453;
    overflow-x: hidden;
    transition: 0.5s;
    z-index: 1000;
}
.sidenav-logo {
    max-width: 100%;
    height: 100px;
    margin: 8%;
    box-sizing: border-box;
    background: url('./assets/icon.png') center center no-repeat;
    background-size: contain;
}
.sidenav-item {
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    cursor: pointer;
    &:hover {
        box-shadow: inset 4px 0px 13px #222;
    }
    a {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 14px;
        text-decoration: none;
        box-sizing: border-box;
        padding-left: 15px; 
    }
}
.router-link-active {
    box-shadow: inset 4px 0px 13px #222;
    border-left: 5px solid #669999;
}
.sidenav-net {
    background: url('./assets/sidenav-net.png') 10px center no-repeat;
    background-size: 25px 25px;
}
.sidenav-rule {
    background: url('./assets/sidenav-rule.png') 10px center no-repeat;
    background-size: 25px 25px;
}
.sidenav-mock {
    background: url('./assets/sidenav-mock.png') 10px center no-repeat;
    background-size: 25px 25px;
}
.sidenav-call {
    background: url('./assets/sidenav-net.png') 10px center no-repeat;
    background-size: 25px 25px;
}
</style>