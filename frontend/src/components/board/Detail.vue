<template>
<div id="app">
    <v-app id="inspire">
        <v-window class="mb-6">
        <v-window-item class="my-6">
        <v-card flat>
        <v-card-title class="orange lighten-5">
            <v-list-item>
            <v-list-item-content>
            <v-list-item-subtitle><small>#{{id}}번 글</small></v-list-item-subtitle>
            <v-list-item-title class="headline my-2">제목 :  {{ subject }}</v-list-item-title>
            
            <v-row justify="space-around"  class="child-flex">
            <div class="ml-4"><small>작성날짜:{{new Date(created).toLocaleString()}}</small></div>
                <div>
                    <div v-if="(nickname)===this.$store.state.nickname">
                    <v-btn color="primary"  v-on:click="updatePost(id)">
                        글 수정하기
                    </v-btn>
                    <v-btn color="red" v-on:click="deletePost(id)">
                        글 삭제하기
                    </v-btn>
                    </div>
                    <div v-else>
                    <v-btn icon v-on:click="userfrofile(nickname)">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                    <small>{{nickname}}</small>
                    </div>                
                </div>
            </v-row>
            </v-list-item-content>
            </v-list-item>
        </v-card-title>
        
        <v-card-text class="orange lighten-5" >
            <div class="ml-4" v-html="content">{{content}}</div>
        </v-card-text>
        </v-card>
    </v-window-item>
    </v-window>
</v-app>
</div>
</template>

<script>
import axios from 'axios';
import SERVER from "@/api/api";
export default {
    props:{
        id:{
            type:Number,
            required:true,
        },
    },
    data: () => {
        return {
            subject: '',
            content: '',
            created: '',
            nickname:'',
    }},
    methods:{
    deletePost(postId) {
        axios({
            method:"delete",
            url:SERVER.URL +"/feature/board/delete/"+postId,
            })
            .then((res)=>{
                let msg = postId+"번 글 삭제가 완료됐습니다.";
                alert(msg); 
                this.$router.push("/");
                console.log(res.data);
            })
            .catch((err) => console.error(err));
        
    },
    created() {
        console.log(this.id)
        axios
            .get(SERVER.URL +"/feature/board/list/"+this.id)
            .then((res) => {
                this.subject = res.data.subject;
                const linecontent = res.data.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
                this.content = linecontent;
                this.created = res.data.created;
                this.nickname = res.data.nickname
            })
            .catch((err) => console.error(err));
            console.log("디테일 실행중...")
        
        }
    },
}
</script>

<style>

</style>