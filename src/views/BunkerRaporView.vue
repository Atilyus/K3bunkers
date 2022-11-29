<template>
  <div class="bunrap">
    <div v-if="!dokum" style="padding-bottom:10px" class="container">
        <h4 style="padding-top:5px">Hat Seçiniz.</h4>
        <hr>
        <button style="margin:5px" class="btn btn-secondary" @click="secilihat(1)">Döküm 1</button>
        <button style="margin:5px" class="btn btn-secondary" @click="secilihat(2)">Döküm 2</button>
        <button style="margin:5px" class="btn btn-secondary" @click="secilihat(3)">Döküm 3</button>
      </div>
    <div v-if="dokum"  class="container">
      <br>
      <h3 style="text-align: center;">{{title}}</h3>
      <button style="margin:5px" class="btn btn-warning" @click="hatde()">Hat Değiştir</button>
      <hr>
      <table class="table" style="max-width:400px;margin:auto">
        <thead>
          <tr>
            <th>
              Ay
            </th>
            <th>
              İş Emri
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select class="form-control" style="max-width:200px;margin:auto">
        <option value="">Ay Seçin</option>
        <option v-on:click="geties(i+1)" v-for="(qub,i) in quList" :key="i">
          {{ qub }}
        </option>
      </select>
            </td>
            <td>
              <select class="form-control" style="max-width:300px;margin:auto" aria-placeholder="İŞ Emri Seçin">
        <option value="">İş Emri Seçin</option>
        <option @click="getSilos(qub)" v-for="(qub,i) in ielist" :key="i">
          {{ qub }}
        </option>
      </select>
            </td>
          </tr>
        </tbody>
      </table>
      
      <hr>
      <table class="table table-striped" id="table1">
        <thead>
        <tr>
          <th scope="col">Hat</th>
          <th scope="col">Stok Kodu</th>
          <th scope="col">Üretilen</th>
          <th scope="col">Miktar</th>
          <th scope="col">BigBag</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(qub,i) in bunlist" :key="i" >
          <td>{{qub.hat}}</td>
          <td>{{qub.stokKod}}</td>
          <td>{{qub.stoK_ADI}}</td>
          <td>{{qub.miktar}}</td>
          <td>{{qub.bigbag}}</td>
        </tr>
        </tbody>
      </table>
      <hr>
    </div>
  </div>
  
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from 'axios'
export default {
  name: 'app',
  data() {
    return {
      mlist : [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım","Aralık"
        ],
        quList:[],
        ielist:[],//stokkod,tr.hat,tr.isemri,st.STOK_ADI, sum(tr.Miktar) Miktar,COUNT(stokkod) Bigbag
        bunlist:[],
      buttonType: false,
      ReadOnly:false,
      title: "Bunker Rapor",
      divShowHide:true,
      isemri:null,
      onfocus:false,
      picked:null,
      dhat:0,
      dokum:false,
      resturl:"http://10.45.0.97:5000/",
      netsisurl:"http://10.50.60:4000/"
    }
  },
  methods: {
    async getSilos(isem) {
      const response = await fetch(this.resturl+"raporbun/"+isem);
      const data = await response.json();
      this.bunlist=data;
    },
    async geties(ay){
      console.log("ay girdi")
      this.ielist=null
      this.bunlist=null
      await fetch(this.resturl+"ayielist/"+this.dhat+"/"+ay).then(response => response.json())
    .then(data => {this.ielist = data});
    },
    async aynum(){
      let now = new Date();
     let  tt =now.getMonth()+1;
     for (let index = 0; index < tt; index++) {
      this.quList.push(this.mlist[index])
      
     }
    },
    hatde(){
      this.dokum=false
      this.ielist=null
    },
    rawpush(){
      this.rawlist.unshift(this.rawlistemp)
    },
    AddBS(){
      if(confirm(this.quDto.order+" Nolu iş emrine Kayıt yapılacak ?")){
      this.quDto.id=1;
      this.quDto.line=this.dhat;
      let tt =this.quDto.order.toString().split(" ");
      this.quDto.order=tt[0];
        axios.post(this.resturl+'add-bs',this.quDto).then(function(response) {
        if(response.status == 200){
          alert("Kayıt Başarılı");
        }
        else
          alert("Hata Kayıt Yapılamadı !");
      });
    }},
    
    showa(){
      this.getSilos()
      this.seen=true
      this.seent=false
      this.title="Döküm "+this.dhat+" Bunker Rapor"
    },
    showt(){
      if(confirm("Seçimler kaybolacak ! Devam Edilsinmi ?")){
      this.getSilos()
      this.seen=false
      this.seent=true
      this.title="Döküm "+this.dhat+" Bunker Rapor"}
    },
    findname(id){
        return this.rawlist.find(x=> x.stoK_ADI==id).stoK_ADI
    },
    secilihat(id){
      this.dhat=id
      this.dokum=true
      this.title="Döküm "+this.dhat+" Bunker Rapor"
      this.seen=false
      this.seent=true
      this.getSilos();
    },
    pick(type){
      this.picked=type;
    },
    SiloRenk(ss,type){
      if(ss==null || ss=='' || ss=='BOS' || ss=='BOŞ')
      {this.picklist[type]=false}
      else
      {this.picklist[type]=true}
    },
  },
  mounted() {
    this.aynum()
    //this.getSilos();
    //this.getraw();
  },
  updated(){
  },
  computed:{
      filteredRows() {
    return this.rawlist.filter(row => {
      const name = row.stoK_ADI.toString().toLowerCase();
      const searchTerm = this.search.toLowerCase();
      return name.includes(searchTerm);
    });
  }}
}
</script>

<style scoped>
.container {
  border: solid 2px;
  box-shadow: 4px 4px 4px 4px rgb(71, 70, 70);
}
div.form
{
    display: inherit;
    text-align: left;
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
    text-align: center;
}
.truncate{
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.redstyle{
  background-color:red;
  border: 1px solid #000000;
}
.grestyle{
  background-color:green;
  border: 1px solid #000000;
}

</style>