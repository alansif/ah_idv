<template>
  <el-button type="primary" :loading="loading"  v-on:click="run" :disabled="disabled || time > 0">{{ text }}</el-button>
</template>  

<script>
    /* eslint-disable */
    export default {
    name: 'timerbtn',
    props: {
        second: {
            type: Number,
            default: 90
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data:function () {
    	return {
            time: 0,
            loading: false
    	}
    },
    methods: {
        run: function () {
        	this.$emit('run');
        },
        start: function(){
            this.loading = true;
        	this.time = this.second;
        	this.timer();
        },
        stop: function(){
        	this.time = 0;
        	this.disabled = false;
            this.loading = false;
        },
        setDisabled: function(val){
        	this.disabled = val;
        },
        timer: function () {
            if (this.time > 0) {
                this.time--;
                setTimeout(this.timer, 1000);
            }else{
            	this.disabled = false;
                this.loading = false;
            }
        }
    },
    computed: {
        text: function () {
            return this.time > 0 ? this.time + '秒后重发' : '发送验证码';
        }
    }
}
</script>