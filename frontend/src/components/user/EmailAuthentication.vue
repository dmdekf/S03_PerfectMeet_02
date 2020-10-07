<template>
    <div>
        <div>
            <div>
                <h1>이메일 인증</h1>
                <h3 id="authText">
                    {{ text }}
                </h3>

                <button @click="moveMain">
                    <span>
                        메인화면으로 이동
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'EmailAuthentication',
    data() {
        return {
            text: '',
            id: '',
            token: '',
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.key = this.$route.query.key;
        axios({
            method: "get",
            url: "http://j3a507.p.ssafy.io:8399/user/auth",
            params: {
                id:this.id,
                key: this.key,
            },
        })
            .then((res) => {
                if (res.data.status) {
                    this.text = `이메일 인증이 완료되었습니다.
                정상적으로 서비스 이용이 가능합니다.`;
                }
            })
            .catch(() => {
                this.text = '이메일 인증에 실패하였습니다. 다시 시도해주세요.';
            });
    },
    methods: {
        moveMain() {
            this.$router.push('/');
        },
    },
};
</script>

<style>
#authText{
    text-align: center;
}
</style>
