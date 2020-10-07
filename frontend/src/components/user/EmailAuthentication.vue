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
        
        this.$store.dispatch('authentication', {
            id: this.id,
            key: this.key,
        })
            .then((res) => {
                this.text = `이메일 인증이 완료되었습니다.
                정상적으로 서비스 이용이 가능합니다.`;
            })
            .catch((error) => {
                this.text = '이메일 인증에 실패하였습니다. 다시 시도해주세요.';
                console.log(error.response);
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
