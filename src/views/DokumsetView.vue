<template>
  <div class="dokset">
    <div v-if="!dokum" style="padding-bottom:10px" class="container">
        <h4 style="padding-top:5px">Hat Seçiniz.</h4>
        <hr>
        <button style="margin:5px" class="btn-lg btn-secondary" @click="secilihat(1)">Döküm 1</button>
        <button style="margin:5px" class="btn-lg btn-secondary" @click="secilihat(2)">Döküm 2</button>
        <button style="margin:5px" class="btn-lg btn-secondary" @click="secilihat(3)">Döküm 3</button>
      </div>
    <div v-if="dokum"  class="container">
      <br>
      <h3 style="text-align: center;">{{title}}</h3>
      <button style="margin:5px" class="btn-lg btn-warning" @click="dokum=false">Hat Değiştir</button>
      <hr>
      
      <div style="float:right">
        
          <button type="button" class="btn btn-info" v-if="!seen" @click="showa">Tanımlama</button>
          <button type="button" class="btn btn-info" v-if="!seent" @click="showt">İzleme</button>
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
        <thead v-if="dhat!=1">
        <tr>
          <th scope="col">1.Silo</th>
          <th scope="col">2.Silo</th>
          <th scope="col">3.Silo</th>
          <th scope="col">4.Silo</th>
          <th scope="col">5.Silo</th>
          <th scope="col">6.Silo</th>
          <th scope="col">7.Silo</th>
          <th scope="col">8.Silo</th>
          <th v-if="dhat!=2" scope="col">9.Silo</th>
          <th scope="col">Filler</th>
        </tr>
        </thead>
        <thead v-if="dhat==1" >
        <tr>
          <th scope="col">9.Silo</th>
          <th scope="col">10.Silo</th>
          <th scope="col">11.Silo</th>
          <th scope="col">12.Silo</th>
          <th scope="col">13.Silo</th>
          <th scope="col">14.Silo</th>
          <th scope="col">15.Silo</th>
          <th scope="col">16.Silo</th>
          <th scope="col">Filler</th>
        </tr>
        </thead>
        <tbody>
        <tr >
          <td >
            <canvas v-if="picklist.s1" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s1" width=50 height=80 class="grestyle"></canvas>
          </td>
          <td>
            <canvas v-if="picklist.s2" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s2" width=50 height=80  class="grestyle"></canvas>
            </td>
          <td>
            <canvas v-if="picklist.s3" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s3"  width=50 height=80 class="grestyle"></canvas>
            </td>

            <td>
            <canvas v-if="picklist.s4" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s4"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td>
            <canvas v-if="picklist.s5" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s5"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td>
            <canvas v-if="picklist.s6" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s6"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td>
            <canvas v-if="picklist.s7" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s7" width=50 height=80  class="grestyle"></canvas>
            </td>
            <td>
            <canvas v-if="picklist.s8" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s8"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td v-if="dhat==3">
            <canvas v-if="picklist.s9" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s9"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td>
            <canvas v-if="picklist.filler" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.filler"  width=50 height=80 class="grestyle"></canvas>
            </td>
        </tr>
        <tr>
          <td>{{quDto.s1}}</td>
          <td>{{quDto.s2}}</td>
          <td>{{quDto.s3}}</td>
          <td>{{quDto.s4}}</td>
          <td>{{quDto.s5}}</td>
          <td>{{quDto.s6}}</td>
          <td>{{quDto.s7}}</td>
          <td>{{quDto.s8}}</td>
          <td v-if="dhat==3">{{quDto.s9}}</td>
          <td>{{quDto.filler}}</td>
        </tr>
        <tr>
            <td><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('s1')">Seç</button></td>
            <td><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('s2')">Seç</button></td>
            <td><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('s3')">Seç</button></td>
            <td><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('s4')">Seç</button></td>
            <td><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('s5')">Seç</button></td>
            <td><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('s6')">Seç</button></td>
            <td><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('s7')">Seç</button></td>
            <td><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('s8')">Seç</button></td>
            <td v-if="dhat==3"><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('s9')">Seç</button></td>
            <td><button class="btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pick('filler')">Seç</button></td>
        </tr>
        </tbody>
      </table>
      </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
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
                <table class="table table-striped" id="table2">
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
                    <button type="button" @click="PickRaw(qub.stoK_KODU)" class="btn-secondary btn-xs" data-bs-dismiss="modal">Seç</button>
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
        <table class="table" id="table3">
        <thead v-if="dhat!=1">
        <tr>
          <th scope="col">1.Silo</th>
          <th scope="col">2.Silo</th>
          <th scope="col">3.Silo</th>
          <th scope="col">4.Silo</th>
          <th scope="col">5.Silo</th>
          <th scope="col">6.Silo</th>
          <th scope="col">7.Silo</th>
          <th scope="col">8.Silo</th>
          <th v-if="dhat!=2" scope="col">9.Silo</th>
          <th scope="col">filler</th>
        </tr>
        </thead>
        <thead v-if="dhat==1" >
        <tr>
          <th scope="col">9.Silo</th>
          <th scope="col">10.Silo</th>
          <th scope="col">11.Silo</th>
          <th scope="col">12.Silo</th>
          <th scope="col">13.Silo</th>
          <th scope="col">14.Silo</th>
          <th scope="col">15.Silo</th>
          <th scope="col">16.Silo</th>
          <th scope="col">filler</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td >
            <canvas v-if="picklist.s1" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s1" width=50 height=80 class="grestyle"></canvas>
          </td>
          <td>
            <canvas v-if="picklist.s2" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s2" width=50 height=80  class="grestyle"></canvas>
            </td>
          <td>
            <canvas v-if="picklist.s3" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s3"  width=50 height=80 class="grestyle"></canvas>
            </td>

            <td>
            <canvas v-if="picklist.s4" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s4"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td>
            <canvas v-if="picklist.s5" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s5"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td>
            <canvas v-if="picklist.s6" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s6"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td>
            <canvas v-if="picklist.s7" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s7" width=50 height=80  class="grestyle"></canvas>
            </td>
            <td>
            <canvas v-if="picklist.s8" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s8"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td v-if="dhat==3">
            <canvas v-if="picklist.s9" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.s9"  width=50 height=80 class="grestyle"></canvas>
            </td>
            <td >
            <canvas v-if="picklist.filler" width=50 height=80 class="redstyle"></canvas>
            <canvas v-if="!picklist.filler"  width=50 height=80 class="grestyle"></canvas>
            </td>
        </tr>
        <tr>
            <td>{{quDto.s1}}</td>
            <td>{{quDto.s2}}</td>
            <td>{{quDto.s3}}</td>
            <td>{{quDto.s4}}</td>
            <td>{{quDto.s5}}</td>
            <td>{{quDto.s6}}</td>
            <td>{{quDto.s7}}</td>
            <td>{{quDto.s8}}</td>
            <td v-if="dhat==3">{{quDto.s9}}</td>
            <td >{{quDto.filler}}</td>

        </tr>
        </tbody>
      </table>
        </div>
      <button type="button" class="btn-primary" @click="AddBS()" v-if="seen">Kaydet</button>
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
      quDto: {
        id: null,
        line: null,
        order: null,
        time: null,
        s1: null,
        s2: null,
        s3: null,
        s4: null,
        s5: null,
        s6: null,
        s7: null,
        s8: null,
        s9: null,
        filler:null
      },
      quList: [{
        id: null,
        line: null,
        order: null,
        time: null,
        s1: null,
        s2: null,
        s3: null,
        s4: null,
        s5: null,
        s6: null,
        s7: null,
        s8: null,
        s9: null,
        filler:null
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
        s1:null,
        s2:null,
        s3:null,
        s4:null,
        s5:null,
        s6:null,
        s7:null,
        s8:null,
        s9:null,
        filler:false
      },
      buttonType: false,
      ReadOnly:false,
      title: "Döküm Bunker Silo İzleme",
      divShowHide:true,
      isemri:null,
      seen:false,
      seent:true,
      onfocus:false,
      modalShow: false,
      search: '',
      picked:null,
      dhat:0,
      dokum:false,
      resturl:"http://10.45.0.97:5000/",
      netsisurl:"http://10.50.60:4000/"
    }
  },
  methods: {
    async getSilos() {
      const response = await fetch(this.resturl+"bunker/"+this.dhat);
      const data = await response.json();
      this.quDto=data;
      this.silosecim();
    this.geties();
    },
    async geties(){
       await fetch(this.resturl+"isemri/"+this.dhat).then(response => response.json())
    .then(data => {this.isemrilist = data});
    },
    async getraw(){
    const response=  await  fetch(this.resturl+"hamkods");
    const data = await response.json();
    //data.unshift({stoK_KODU:'BOŞ',stoK_ADI:'BOŞ'});
    this.rawlist = data
    this.rawpush();
    
    },
    silosecim(){
    this.SiloRenk(this.quDto.s1,'s1')
    this.SiloRenk(this.quDto.s2,'s2')
    this.SiloRenk(this.quDto.s3,'s3')
    this.SiloRenk(this.quDto.s4,'s4')
    this.SiloRenk(this.quDto.s5,'s5')
    this.SiloRenk(this.quDto.s6,'s6')
    this.SiloRenk(this.quDto.s7,'s7')
    this.SiloRenk(this.quDto.s8,'s8')
    this.SiloRenk(this.quDto.s9,'s9')
    this.SiloRenk(this.quDto.filler,'filler')
    
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
      this.title="Döküm "+this.dhat+" Bunker Silo Tanımlama"
    },
    showt(){
      if(confirm("Seçimler kaybolacak ! Devam Edilsinmi ?")){
      this.getSilos()
      this.seen=false
      this.seent=true
      this.title="Döküm "+this.dhat+" Bunker Silo İzleme"}
    },
    findname(id){
        return this.rawlist.find(x=> x.stoK_ADI==id).stoK_ADI
    },
    secilihat(id){
      this.dhat=id
      this.dokum=true
      this.title="Döküm "+this.dhat+" Bunker Silo İzleme"
      this.seen=false
      this.seent=true
      this.getSilos();
      this.geties();
    this.getraw();
    },
    PickRaw(stok){
      if(stok=="BOŞ" || stok=='BOS' || stok=='')
      {stok=null;}
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

      if(this.picked==="s4"){
      this.quDto.s4=stok;
      this.SiloRenk(stok,'s4')
      }
      if(this.picked==="s5"){
      this.quDto.s5=stok;
      this.SiloRenk(stok,'s5')
      }
      if(this.picked==="s6"){
      this.quDto.s6=stok;
      this.SiloRenk(stok,'s6')
      }
      if(this.picked==="s7"){
      this.quDto.s7=stok;
      this.SiloRenk(stok,'s7')
      }
      if(this.picked==="s8"){
      this.quDto.s8=stok;
      this.SiloRenk(stok,'s8')
      }
      if(this.picked==="s9"){
      this.quDto.s9=stok;
      this.SiloRenk(stok,'s9')
      }
      if(this.picked==="filler"){
      this.quDto.filler=stok;
      this.SiloRenk(stok,'filler')
      }
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
    //this.getSilos();
    //this.getraw();
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