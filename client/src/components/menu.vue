<template>
    <div id="menu">
        <div class="menu-left grid-content">
            <el-tooltip class="item" effect="light" placement="bottom-end" v-if="!open">
                <div slot="content">{{ $t("ap.menubtn.starttip") }}</div>
                <el-button type="success" icon="caret-right" @click="toggleProxy" v-if="!open"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" placement="bottom-end" v-if="open">
                <div slot="content">{{ $t("ap.menubtn.stoptip") }}</div>
                <el-button type="danger" icon="close" @click="toggleProxy" v-if="open"></el-button>
            </el-tooltip>                        
            <el-tooltip class="item" effect="light" placement="bottom-end">
                <div slot="content">{{ $t("ap.menubtn.cleartip") }}</div>
                <el-button type="warning" icon="delete" @click="clearRecorder"></el-button>
            </el-tooltip>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import _ from 'lodash';
import * as types from '../store/mutation-types';

export default {
    props: ['recordlistView'],
    data () {
        return {
            visibleSetting: false,
            visibleTips: false,
            openHttps: false,
            setting: {
                port: '8001',
                forceProxyHttps: false,
                global: false,
                throttle: null
            },
            throttleOptions: [
                {
                    label: 'GPRS(50kb/s)',
                    value: 50
                },
                {
                    label: 'Regular 2G(250kb/s)',
                    value: 250
                },
                {
                    label: 'Good 2G(450kb/s)',
                    value: 450
                },
                {
                    label: 'Regular 3G(750kb/s)',
                    value: 750
                },
                {
                    label: 'Good 3G(1.5Mb/s)',
                    value: 1536
                },
                {
                    label: 'Regular 4G(4Mb/s)',
                    value: 4096
                },
                {
                    label: 'DSL(2Mb/s)',
                    value: 2048
                },
                {
                    label: 'WiFi(30Mb/s)',
                    value: 30720
                },
            ],
            recordlist: true //是否显示抓包列表
        }
    },
    mounted() {
        // this.onUpdateRecorder();
        // console.log(this.$router.currentRoute);
    },
    computed: mapState({
        open: state => !!state.proxy_is_open,
        proxyPort: state => state.proxy_port,
        proxyIp: state => state.proxy_ip,
        currentRule: state => state.current_rule,
        mockPaths: state => state.mock_paths
    }),
    methods: {
        toggleProxy() {
            if (this.open) {
                this.stopProxy();
            } else {
                this.startProxy();
            }
            this.$store.commit(types.TOGGLE_PROXY);
        },
        startProxy() {
            const self = this;
            if (this.currentRule.id) {
                this.setting.ruleid = this.currentRule.id;
            }
            if (this.mockPaths && this.mockPaths.length) {
                this.setting.mock = this.mockPaths;
            }
            this.$remoteApi.startProxy(this.setting).then((res) => {
                self.$notify({
                    title: self.$t("ap.message.MSG_HAD_OPEN_PROXY"),
                    // message: 'IP:' + res.ip + '  ' + 'PORT:' + res.port,
                    type: 'success',
                    duration: 2000,
                });
                self.$store.commit(types.SET_PROXY_IP, res.ip);
                self.$store.commit(types.SET_PROXY_PORT, res.port);
                if (self.recordlist) {
                    self.onUpdateRecorder();
                }
            }, (res) => {
                self.$notify({
                    message: self.$t("ap.message." + res.msg),
                    type: 'error',
                    duration: 2000,
                });
            });
        },
        stopProxy() {
            const self = this;
            this.$remoteApi.stopProxy().then((res) => {
                self.$notify({
                    message: self.$t("ap.message." + res.msg),
                    type: 'success',
                    duration: 2000,
                });
                self.$remoteApi.offUpdate();
            }, (res) => {
                self.$notify({
                    message: self.$t("ap.message." + res.msg),
                    type: 'error',
                    duration: 2000,
                });
            });
        },
        restartProxy() {
            const self = this;
            this.$remoteApi.stopProxy().then((res) => {
                self.startProxy();
            });
        },
        clearRecorder() {
            this.$store.commit(types.CLEAR_RECORDER);
            // this.$remoteApi.clearRecorder();
        },
        setRule() {
            this.$store.commit(types.TOGGLE_RULE_PANEL);
        },
        downloadRootCA() {
            const h = this.$createElement;
            const self = this;
            const message = {
                success: this.$t("ap.message.MSG_CA_DOWN_SUCCESS"),
                exist: this.$t("ap.message.MSG_CA_EXIST"),
                error: this.$t("ap.message.MSG_CA_DOWN_FAIL")
            };
            this.$remoteApi.generateRootCA((msg) => {
                this.$notify({
                    title: self.$t("ap.menumsg.tips"),
                    message: h('p', {style: 'color:green'}, message[msg]),
                    duration: 2000
                });
            },(msg) => {
                this.$notify({
                    title: self.$t("ap.menumsg.tips"),
                    message: h('p', {style: 'color:red'}, message[msg]),
                    duration: 2000
                });
            });
        },
        onUpdateRecorder() {
            console.log('listening')
            const self = this;
            //websocket listener
            this.$remoteApi.onUpdate((data) => {
                self.fetchRecorder();
            });
        },
        fetchRecorder: _.debounce(function() {
            const self = this;
            console.log('fetch');
            this.$remoteApi.getlatestLog().then((data) => {
                self.$store.commit(types.UPDATE_RECORDER, data);
            });
        }, 200)
    },
    components: {
        // proxyFilter
    }
}
</script>
<style lang="less">
#menu {
    display: -webkit-box;
    display: -webkit-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 30px 0 170px;
    box-sizing: border-box;
}
.menu-left {
    -webkit-box-flex: 1;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-extra-light-gray {
    background: #EFF2F7;
}
.grid-content {
    border-radius: 4px;
    height: 56px;
    line-height: 56px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.grid-content-right {
    text-align: right;
}

.memu-https-status {
    margin-left: 20px;
}

.el-switch__input:checked+.el-switch__core {
    border-color: #42d885;
    background-color: #42d885;
}
.el-form {
    margin-top: 10px;
}
.el-form-item {
    margin-bottom: 5px;
}
.menu-setting__btn > .el-form-item__content {
    text-align: center;
    margin-left: 0 !important;
}
.el-form-item__content .el-button {
    margin-top: 20px;
}
.show-record-list .el-form-item__content {
    margin-left: 20px !important;
}
</style>