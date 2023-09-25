<template>
  <div class="manage">
    
    <div class="container">
      <br>
      <h3 style="text-align: center;">{{title}}</h3>

      <hr>
      <div style="float:right">
        
          <button type="button" class="btn btn-info" v-if="!seen" @click="showa()">Tanımlama</button>
          <button type="button" class="btn btn-info" v-if="!seent" @click="showt()">İzleme</button>
      </div>
      <div v-if="seen">
      <div class="row">
              <div class="form-group col-md-2">
              <label>İş Emri Seçimi </label>
              <select class="form-control" v-model="quDto.order" >
                <option v-for="(eub,i) in isemrilist" :key="i" >{{eub}}</option>
              </select>
       </div>
      <table class="table" id="table1">
        <thead>
        <tr>
          <th scope="col">1.Silo</th>
          <th scope="col">2.Silo</th>
          <th scope="col">3.Silo</th>
        </tr>
        </thead>
        <tbody>
        <tr >
          <td>
            <canvas v-if="picklist.s1" id="silo1" width="100" height="140" style="background-color: red; border: 1px solid #000000;"></canvas>
            <canvas v-if="!picklist.s1" id="silo11" width="100" height="140" style="background-color: green; border: 1px solid #000000;"></canvas>
          </td>
          <td>
            <canvas v-if="picklist.s2" id="silo2" width="100" height="140" style="background-color: red; border: 1px solid #000000;"></canvas>
            <canvas v-if="!picklist.s2" id="silo22" width="100" height="140" style="background-color: green; border: 1px solid #000000;"></canvas>
            </td>
          <td>
            <canvas v-if="picklist.s3" id="silo3" width="100" height="140" style="background-color: red; border: 1px solid #000000;"></canvas>
            <canvas v-if="!picklist.s3" id="silo33" width="100" height="140" style="background-color: green; border: 1px solid #000000;"></canvas>
            </td>
        </tr>
        <tr>
          <td>{{quDto.s1}}</td>
          <td>{{quDto.s2}}</td>
          <td>{{quDto.s3}}</td>
        </tr>
        <tr>
            <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#StokModal" @click="pick('s1')">Seç</button></td>
            <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#StokModal" @click="pick('s2')">Seç</button></td>
            <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#StokModal" @click="pick('s3')">Seç</button></td>
        </tr>
        </tbody>
      </table>
      </div>
        <div class="modal fade"  id="StokModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="ModalLabel">Hammadde Seçimi</h5>
              <hr>
              <div>
              <label>Ara</label>
              <input type="text" class="form-control" placeholder="Hammadde.." v-model="search" >
              </div>
            </div>
            <div class="modal-body">
              <form>
                <table class="table table-striped" id="table1">
                <thead>
                <tr>
                  <th scope="col">StokKodu</th>
                  <th scope="col">Hammadde</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(qub,i) in filteredRows" :key="`stoK_ADI-${i}`" >
                  <td>{{qub.stoK_KODU}}</td>
                  <td>{{findname(qub.stoK_ADI)}}</td>
                  <td>
                    <button type="button" @click="PickRaw(qub.stoK_KODU)" class="btn btn-secondary btn-xs" data-bs-dismiss="modal">Seç</button>
                  </td>
                </tr>
                </tbody>
              </table>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Kapat</button>
            </div>
          </div>
        </div>
      </div>
        </div>
        <div v-if="seent">
          <div style="float:left">
              <label>İş Emri :</label>
              <h5>{{quDto.order}}</h5>
          </div>
        <table class="table" id="table2">
        <thead>
        <tr>
          <th scope="col">1.Silo</th>
          <th scope="col">2.Silo</th>
          <th scope="col">3.Silo</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><canvas v-if="picklist.s1" width="100" height="140" style="background-color: red; border: 1px solid #000000;"></canvas>
          <canvas v-if="!picklist.s1" width="100" height="140" style="background-color: green; border: 1px solid #000000;"></canvas>
          </td>
          <td>
            <canvas v-if="picklist.s2" width="100" height="140" style="background-color: red; border: 1px solid #000000;"></canvas>
            <canvas v-if="!picklist.s2" width="100" height="140" style="background-color: green; border: 1px solid #000000;"></canvas>
            </td>
          <td>
            <canvas v-if="picklist.s3" width="100" height="140" style="background-color: red; border: 1px solid #000000;"></canvas>
            <canvas v-if="!picklist.s3" width="100" height="140" style="background-color: green; border: 1px solid #000000;"></canvas>
            </td>
        </tr>
        <tr>
            <td>{{quDto.s1}}</td>
            <td>{{quDto.s2}}</td>
            <td>{{quDto.s3}}</td>
        </tr>
        </tbody>
      </table>
        </div>
      <button type="button" class="btn-primary" @click="AddBS()" v-if="seen">Kaydet</button>
    </div>
  </div>
  
</template>

<script>
import "bootstrap/dist/js/bootstrap.min.js";
import axios from 'axios'
export default {
  name: 'app',
  data() {
    return {
      quDto: {
        id: null,
        line: null,
        order: null,
        time: null,
        s1: null,
        s2: null,
        s3: null
      },
      quList: [{
        id: null,
        line: null,
        order: null,
        time: null,
        s1: null,
        s2: null,
        s3: null
      }],
      isemrilist:[{
      }],
      rawlist:[{
        stoK_KODU:null,
        stoK_ADI:null
      }],
      rawlistemp:{
        stoK_KODU:'BOŞ',
        stoK_ADI:'BOŞ'
      },
      picklist:{
        s1:false,
        s2:false,
        s3:false
      },
      
      buttonType: false,
      ReadOnly:false,
      title: "Robot Bunker Silo Tanımlama",
      divShowHide:true,
      isemri:null,
      seen:false,
      seent:true,
      onfocus:false,
      modalShow: false,
      search: '',
      picked:null,
      resturl:"http://10.45.0.97:5000/",
      netsisurl:"http://10.50.60:4000/"
    }
  },
  methods: {
    async getSilos() {
    const response = await fetch(this.resturl+"bunker/4");
    const data = await response.json();
    this.quDto=data;
    this.SiloRenk(this.quDto.s1,'s1')
    this.SiloRenk(this.quDto.s2,'s2')
    this.SiloRenk(this.quDto.s3,'s3')
    this.geties();
    },
    geties(){
        fetch(this.resturl+"isemri/3").then(response => response.json())
    .then(data => {this.isemrilist = data});
    },
    async getraw(){
    const response=  await  fetch(this.resturl+"hamkods");
    const data = await response.json();
    //data.unshift({stoK_KODU:'BOŞ',stoK_ADI:'BOŞ'});
    this.rawlist = data
    this.rawpush();
    
    },
    rawpush(){
      this.rawlist.unshift(this.rawlistemp)
    },
    async AddBS(){
      if(confirm(this.quDto.order+" Nolu iş emrine Kayıt yapılacak ?")){
      this.quDto.id=1;
      this.quDto.line=4;
      let tt =this.quDto.order.toString().split(" ");
      this.quDto.order=tt[0];
      try {

        await axios.post(this.resturl+'add-bs',this.quDto).then(function(response) {
        if(response.status == 200){
          alert("Kayıt Başarılı");
        }
        else
          alert("Hata Kayıt Yapılamadı !");
      });
        
      } catch (error) {
        alert(error)
      }
        
    }},
    
    showa(){
       
      this.getSilos()
      this.seen=true
      this.seent=false
      this.title="Robot Bunker Silo Tanımlama"
    },
    showt(){
      if(confirm("Seçimler kaybolacak ! Devam Edilsinmi ?")){
      this.getSilos()
      this.seen=false
      this.seent=true
      this.title="Robot Bunker Durumları"}
    },
    findname(id){
        return this.rawlist.find(x=> x.stoK_ADI==id).stoK_ADI
    },
    PickRaw(stok){
      if(stok=="BOŞ" || stok=='BOS' || stok=='')
      {stok="BOŞ";}
      if(this.picked==="s1"){
      this.quDto.s1=stok;
      this.SiloRenk(stok,'s1')
      }
      if(this.picked==="s2"){
      this.quDto.s2=stok;
      this.SiloRenk(stok,'s2')
      }
      if(this.picked==="s3"){
      this.quDto.s3=stok;
      this.SiloRenk(stok,'s3')
      }
      
    },
    pick(type){
      this.picked=type;
    },
    SiloRenk(ss,type){
      if(ss==null || ss=='' || ss=='BOS' || ss=='BOŞ')
      {this.picklist[type]=false;}
      else
      {this.picklist[type]=true;}
    },
  },
  beforeMount() {
    this.getSilos();
    this.getraw();
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
  width: 50;
  height: 80;
}
.grestyle{
  background-color:red;
  border: 1px solid #000000;
  width: 50;
  height: 80;
}
</style>