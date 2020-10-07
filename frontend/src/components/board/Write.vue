<template> 
<v-form> 
    <v-container>
        <v-row> 
            <v-text-field :counter="50" label="제목" name="subject" required v-model="board_write.subject" maxlength="50" >
                </v-text-field> 
                </v-row> 
                <v-row> 내용 </v-row>
                 <v-row> 
                     <v-textarea filled name="content" hint="내용을 입력해주세요." v-model="board_write.content" :counter="1000" maxlength="1000" ></v-textarea> 
                </v-row> 
                <v-row> 
                    <v-btn block outlined color="blue" @click="writeboard"> 등록 </v-btn> 
                </v-row> 
    </v-container> 
    </v-form> 
</template>

<script>
import axios from "axios";
import SERVER from "@/api/api";
import { mapState } from 'vuex'
export default {
    data () {
        return { 
            board_write:{
                subject: '', 
                content: '' 
                }
            }
    },
    computed:{
        ...mapState(['nickname'])
    },
    methods:{
        writeboard() {
            axios({
                method: "post",
                url: SERVER.URL+"/feature/board/write",
                data: {
                    subject:this.board_write.subject,
                    content:this.board_write.content,
                    nickname:this.nickname
                },
            })
                .then((res) => { 
                    console.log(res.data)
                    alert("글 작성이 성공했습니다.")
                    this.$router.push("/");
                
                })
                .catch((err) => console.log(err.response.data));
            }
        }   
}

</script>