<template>
  <div class="recine">
    <div v-if="loadd">
      <Loader />
    </div>
    <div v-if="!loadd"  class="container">
      <div v-if="!dokum">
        <h4 style="padding-top:5px">Kampüs Seçiniz.</h4>
        <hr>
        <button style="margin:5px" class="btn btn-secondary" @click="secilihat(1)">Kampüs 1</button>
        <button style="margin:5px" class="btn btn-secondary" @click="secilihat(2)">Kampüs 2</button>
      </div>
    <div v-if="dokum"  style="padding-top:5px">
      <div style="background-color:darkcyan;height: 33px;width:auto;max-width:300px;margin: auto;">
      <h4 @click="ksec()" style="text-align: lcenter; padding-top:5px; height: 20px;">{{title}}</h4>
     </div>
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
          <th scope="col">KA</th>
          <th scope="col">StokKod</th>
          <th scope="col">Miktar</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(qub,i) in quList" :key="i" >
          <td>{{2}}</td>
          <td>{{qub.stokKod}}</td>
          <td>{{qub.miktar}}</td>
          <td>
            <button @click="Kalemsil(qub.id)" class="btn btn-danger btn-xs">Sil</button>
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
        Tarih: null,
        StokKod: null,
        Kampus: 0,
        //serino: null,
        Miktar: 0,
        //isemri: null,
        Aktif: null
      },
      quList: [{
        id: null,
        Tarih: null,
        StokKod: null,
        Kampus: 0,
        //serino: null,
        Miktar: 0,
        //isemri: null,
        Aktif: null
      }],
      post:{
        kod:null,
        hat:0
      },
      buttonType: false,
      ReadOnly:false,
      title: "REÇİNE Transfer",
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
      topkg:0,
      dokum:false,
      kampus:0
    }
  },
  methods: {
    Kalemsil(id){
      if(confirm("Silinecek Eminmisiniz ?")){
      fetch(this.resturl+"deptrarecsil/"+id).then(response => {
        if(response.status == 200){
          //alert("Silme Başarılı");
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
      url: this.netsisurl+"api/NetsApi/DeptraRec?id="+this.kampus+"&huc="+this.hucre,
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
    secilihat(id){
      this.dokum=true
      this.kampus=id
      this.title="Kampüs "+this.kampus+" Reçine Transfer"
      this.Getqu();
    },
    ksec(){
      this.dokum=false
    },
    Getqu(){
      fetch(this.resturl+"get-rec/"+this.kampus).then(response => response.json())
    .then(data => {this.quList = data});
    },
    ListCount(){
      this.rowcount= this.quList.length;
      
      this.topkg= this.quList.map(({miktar}) => miktar)
    .reduce((a, b) => a + b, 0)
    },
    Kaydet(postt){
      alert(postt.kod)
      const self=this;
      axios.post(this.resturl+'barkodrec',postt)
      .then(response=>{
        if(response.status == 200){
          this.Getqu()
          this.showt()
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
      var oss =str.split("*");
      if(this.quList.length>0 && oss[0]!=this.quList[0].stokKod)
      {
        alert("Farklı Stok Okutuldu ! Önce Kayıt yapınız !")
        this.okun=null;
        this.seen=false
        this.seent=true
        return;
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
        this.post.hat=this.kampus;
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
      this.title="REÇİNE Transfer"
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
    //this.Getqu();
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