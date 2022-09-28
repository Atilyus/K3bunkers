<template>
  <div class="dokum">
    <div v-if="loadd">
      <Loader />
    </div>
    <div v-if="!loadd">
    <div class="container">
      <h4 style="text-align: lcenter; padding-top:5px; height: 20px;">{{title}}</h4>
     
      <div v-if="huco1">
        <hr>
        <input type="text" v-focus class="form-control" v-model="hucre" @input="hucoku(hucre)">
      </div>
        <hr>
        <div style="background-color:brown;height: 33px;width:auto;max-width:300px;margin: auto;">
      <h3 style="color:aliceblue;padding-top: 2px;width: auto;margin:auto" @click="hude()">Hücre : {{hucre}}</h3>
      </div>
    
    <div>
      <hr>
      
      <button type="button" class="btn btn-success" style="margin-right:40px" v-if="seent" @click="Deptra()">Kaydet</button>
      <button type="button" class="btn btn-primary " v-if="!seen" @click="showa">Barkod Oku</button>
      </div>
      <hr >
      <div v-if="!seen" >
        <h5 style="float:left" class="form-check-label">Adet: {{rowcount}} </h5>
        <h5 class="form-check-label"> Toplam Kg.: {{topkg}}</h5>
      </div>
      <div v-if="seent">
      <table class="table" id="table1">
        <thead>
        <tr>
          <th scope="col">Hat</th>
          <th scope="col">StokKod</th>
          <th scope="col">Miktar</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(qub,i) in quList" :key="i" >
          <td>{{qub.hat}}</td>
          <td>{{qub.stokKod}}</td>
          <td>{{qub.miktar}}</td>
          <td>
            <button @click="Kalemsil(qub.id)" class="btn-danger btn-xs">Sil</button>
          </td>
        </tr>
        </tbody>
      </table>
      </div>
      <div v-if=seen >
        <input type="text"  v-focus class="form-control" v-model="okun" @input="karakter(okun)">
        <div v-if="!seent">
          <hr>
          <button type="button" class="btn-info"  @click="showt">Geri git</button>
        </div >
         
      </div>
    
    </div>
  </div>
    </div>
</template>

<script>
const focus = {
  mounted: (el) => el.focus()
}
import axios from 'axios'
import Loader from './loader.vue'
export default {
  directives: {
    // enables v-focus in template
    focus
  },
  name: 'app',
  components:{
    Loader
  },
  data() {
    return {
      quDto: {
        id: null,
        tarih: null,
        stokKod: null,
        hat: null,
        serino: null,
        miktar: 0,
        isemri: null,
        aktif: null
      },
      quList: [{
        id: null,
        tarih: null,
        stokkod: null,
        hat: null,
        serino: null,
        miktar: 0,
        isemri: null,
        aktif: null
      }],
      post:{
        kod:null,
        hat:0
      },
      buttonType: false,
      ReadOnly:false,
      title: "Döküm Bunker Transfer",
      divShowHide:true,
      read:null,
      seen:false,
      seent:true,
      onfocus:true,
      okun:null,
      hucre:null,
      huco1:false,
      resturl:"http://10.45.0.97:5000/",
      netsisurl:"http://10.50.0.60:4000/",
      loadd:false,
      rowcount:null,
      topkg:0
    }
  },
  methods: {
    Kalemsil(id){
      if(confirm("Silinecek Eminmisiniz ?")){
      fetch(this.resturl+"deptrasil/"+id).then(response => {
        if(response.status == 200){
          alert("Silme Başarılı");
          this.Getqu();
        }else{
          alert("Hata Silme Yapılamadı !");
        }
      });
      this.Getqu();
      }
    },
    async Deptra(){
      if(this.hucre=="" || this.hucre==null)
      {
        alert("HÜCRE SEÇİLMEMİŞ")
        this.okun=null;
        this.seen=false
        this.seent=true
        return
      }
      if(this.quList.length<1)
      {
        return;
      }
       this.loadd=true
      await axios({
      method: "get",
      url: this.netsisurl+"api/NetsApi/DepTra?id=3&huc="+this.hucre,
      timeout: 1000 * 60, // Wait for 20 seconds
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const serverResponse = response.status;
        if(serverResponse == 200){
          alert("Kayıt Başarılı");
          this.Getqu();
          this.loadd=false;
        }
        else{
          alert("Hata Kayıt Yapılamadı !");
        }
      })
      .catch(error => {
        alert(error);
        this.loadd=false;
    });
    
    },
    getlod(){
      this.loadd=!this.loadd;
    },
    hucoa(){
      this.huco1=true;
      this.huco=true;
    },
    hucoku(str){
      this.hucre=str;
      this.huco1=false;
      this.huco=true;
    },
    hude(){
      this.hucre=null;
      this.huco1=true;
    },
    Getqu(){
      fetch(this.resturl+"get-tra/3").then(response => response.json())
    .then(data => {this.quList = data});
    },
    ListCount(){
      this.rowcount= this.quList.length;
      
      this.topkg= this.quList.map(({miktar}) => miktar)
    .reduce((a, b) => a + b, 0)
    },
    Kaydet(postt){
      const self=this;
      axios.post(this.resturl+'barkod',postt)
      .then(response=>{
        if(response.status == 200){
          this.Getqu()
          this.showt()
        }
        else{
          alert("Hata Kayıt Yapılamadı !");
        }
      }).catch(error=>{
        alert("Hata Kayıt Yapılamadı ! "+error);
        self.clear()
      });
      
          self.clear();
    },
    karakter(str){
      if(this.hucre=="" || this.hucre==null)
      {
        alert("HÜCRE SEÇİLMEMİŞ")
        this.okun=null;
        this.seen=false
        this.seent=true
        return
      }
      //var qty=str.length;
      //var snc = str.indexOf('/');
      try {
        var ss =str.split("*");
        var tt =ss[1].split("-")
        if(tt[1]==null)
        return
      } catch (error) {
        alert("Okunan Kod Hatalı ")
        this.okun=""
        this.seen=false;
        return
      }
      //if(snc>0){
        this.post.kod=str;
        this.post.hat=3;
        this.Kaydet(this.post)
      //}
    },
    clear() {
      this.okun='';
    },  
    showa(){
      this.seen=true  
      this.seent=false
      this.title="Bigbag Barkod Okuma"
    },
    showt(){
      this.seen=false
      this.seent=true
      this.title="Döküm Bunker Transfer"
      this.Getqu();
    },
    testqu(){
      if(this.quDto.selectQuery==null){
        alert("Query cannot be empty");
        return;
      }
      const self=this;
      this.$http.post("test-qu", self.quDto).then(function(response) {
        if(response.status == 200){
          alert("Test Successfull");
        }
        else
          {alert("Test Failed !");}
      });
    }
  },
  mounted() {
    this.Getqu();
  },
  updated(){
    this.ListCount();
  }
}
</script>

<style scoped>
.container {
  border: solid 1px;
  box-shadow: 2px 0px 2px 2px rgb(71, 70, 70);
}
div.form
{
    display: block;
    text-align: center;
}
form
{
    margin-left: auto;
    margin-right: auto;
    text-align: left;
}
button{
    margin: 10px;
}
table
{
    text-align: left;
}
.truncate{
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>