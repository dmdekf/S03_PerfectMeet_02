<template>
<div id="app">
    <v-app id="inspire">
        <v-window class="mb-6">
        <v-window-item class="my-6">
        <v-card flat>
        <v-card-title class="orange lighten-5">
            <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="headline my-2">음식점 : {{ name }} </v-list-item-title>
            <div ><small>주소 :{{ address }}</small></div>
            <v-list-item-subtitle>전화번호 :  {{ tel }}</v-list-item-subtitle>
            
            <v-row justify="space-around"  class="child-flex">
            <v-row>
            </v-row>
            <v-row>
            <v-btn color="amber" small dark fab @click="share(this.name)"><v-icon dark>mdi-share-variant</v-icon></v-btn>  
             <!-- 좋아요 버튼-->
            <div>
                <div v-if="this.likestatus===true">
                    <v-btn class="mx-2"
                    fab
                    dark
                    small
                    color="white" v-on:click="unlikeStore(id)" >
                    <v-icon color="red">mdi-heart</v-icon>
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn class="mx-2"
                    fab
                    dark
                    small
                    color="pink" v-on:click="likeStore(id)">
                    <v-icon color="white" >mdi-heart</v-icon>
                    </v-btn>
                </div>
            </div>
            </v-row>
                
            </v-row>
            </v-list-item-content>
            </v-list-item>
        </v-card-title>
        
        <v-card-text >
            <v-list>
                <v-list-item-icon justify="center">
                <v-icon color="amber darken-3" class="mr-9">mdi-newspaper-variant-multiple-outline</v-icon>
                    리뷰 목록
                </v-list-item-icon>
                <v-btn class="mx-2 mt-1" dark color="indigo" v-on:click="writeReview(id)">
                        <v-icon dark>mdi-pencil</v-icon>
                        리뷰 쓰기
                </v-btn>
                <v-divider></v-divider>
                    <v-list-item v-for="(reivew, idx) in reverseReviws" 
                        :key="idx">
                    <v-list-item-content>
                        <div>
                            <div v-if="(reivew.nickname)===nickname">
                                <v-spacer></v-spacer>
                                <v-btn  class="mx-2 mt-1" v-on:click="deleteReivew(idx,reivew.id)" icon color="red">
                                    <v-icon>mdi-trash-can-outline</v-icon>삭제
                                </v-btn>
                            </div>
                            <div v-else>
                                글쓴이 : 
                                <v-btn icon v-on:click="userProfile(reivew.nickname)">
                                <v-icon>mdi-account-outline</v-icon>
                                {{reivew.nickname}}
                                </v-btn>
                            </div>
                        </div>
                        <v-list-item-title class="mb-2">#{{reverseReviws.length-idx}}. 평점 : {{reivew.score}}점</v-list-item-title>
                        <v-list-item-subtitle>{{ reivew.content }}</v-list-item-subtitle>
                    </v-list-item-content>          
                    </v-list-item>  
                    <v-divider
                ></v-divider>
            </v-list>
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
            name: '',
            address: '',
            tel: '',
            image:'',
            likestatus:false,
            reviews:[],
            nickname:'',
    }},
    methods:{
        writeReview(storeId) {
            this.$router.push(`/review/${storeId}/write`);
        },
        deleteReivew(idx,reviewid) {
            var index = this.reviews.length-idx-1
            axios({
                method: "delete",
                url : SERVER.URL +`/feature/review/delete/${reviewid}`,
                data:{
                    id:reviewid
                }                    
            })
            .then(  
                (res) => {
                console.log(res.data)
                alert('리뷰가 삭제되었습니다.')
                this.reviews.splice(index, 1)
            })     
            .catch((err) => console.error(err));
        },
        likeStore(){
            axios({
                method: "post",
                url : SERVER.URL +"/dibs",
                headers:{
                    nickname: this.$store.state.nickname
                },
                params:{
                    sid:this.id
                }                    
            }).then(() => {
                    this.likestatus = !this.likestatus  
                })
                .catch((err) => console.error(err));
        },
        unlikeStore(){
            axios({
                method: "delete",
                url : SERVER.URL +"/dibs",
                headers:{
                    nickname: this.$store.state.nickname
                },
                params:{
                    sid:this.id
                }                    
            }).then(() => {
                    this.likestatus = !this.likestatus  
                })
                .catch((err) => console.error(err));
        }, 
        userProfile(nickname) {
            this.$router.push(`/user/profile/${nickname}`);
        },
        getStore() {
            axios
            .get(SERVER.URL +"/stores/"+this.id)
            .then((res) => {
                console.log(res.data)
                this.name = res.data.data.name;
                this.address = res.data.data.address;
                this.tel = res.data.data.tel
                this.image = res.data.data.image
                this.nickname = this.$store.state.nickname
            })
            .catch((err) => console.error(err));
        },
        getLike() {
            axios({
                method: "get",
                url: SERVER.URL+"/dibs/"+this.id,
                headers:{
                    nickname: this.$store.state.nickname
                },
                params: {
                    sid:this.id,
                },
            })
                .then((res) => {
                    this.likestatus = res.data.data;
                })
                .catch((err) => console.error(err));
        },
        getReviews() {
            axios
            .get(SERVER.URL +`/feature/review/${this.id}/list`)
            .then((res) => {
                console.log(res.data)
                this.reviews = res.data
            })
            .catch((err) => console.error(err));
        }   
    },
    created() {
        this.getStore()
        this.getLike()
        this.getReviews()
        },
    computed:{
        reverseReviws() {
            return this.reviews.slice().reverse()
        }
    },
}
</script>

<style>

</style>