<template>
    <v-app id="inspire">
    <v-main class="mx-10px"
>
    <div class="post">
            <section class="post-list" >
            <div v-for="(post, uid) in list" :key="uid">
                <div class="post-card" v-if="post.id" v-on:click="showDetail(post.id)" >
                    <a style="color: black">
                        <div class="contents">
                        <v-row>
                            <v-col>
                                <v-icon>mdi-account-edit-outline</v-icon>  {{post.uid}}
                            </v-col>
                            <v-col cols="auto">
                            <v-btn color="#DC143C" fab x-small dark>
                                <v-icon>mdi-heart</v-icon>{{post.lnt}}
                            </v-btn>
                            </v-col>
                        </v-row>
                            <h3>#{{post.id}}</h3>
                            <h3>
                                {{post.subject}}
                            </h3>
                            <hr/> 
                            <p class="content" v-html="post.content">{{post.content}}</p>
                            
                            <div class="comment mt-1"><v-icon>mdi-comment-multiple-outline</v-icon>  {{post.cnt}}</div>
                        </div> 
                    </a>
                </div>
            </div>
            
            </section>
        </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import SERVER from "@/api/api";

export default {
    name:"MAIN",
    data: () => {
        return {
            posts:[],
            list:[],
            photos: [],
            limit:0,
            url:""
        }
    },
    mounted(){
        this.getPosts()
    },
    methods: {
        
        getPosts() {
            this.nickName = this.$store.state.login_user;
            axios.get(SERVER.URL+"/feature/board/list/")
            .then((res)=>{
                    if(res.data) {
                        this.posts = res.data;
                                              
                    }
            })
            .catch((err) => console.error(err));
        },
        
    },
}
</script>

<style scoped>
.tag-list-wrap[data-v-fbaed234] {
    position: fixed;
    width: max-content;
    align-items: center;
    padding: 0;
}
.post .post-list {
    min-height: 500px;
    width: 80vm;
    align-items: left;
}
</style>