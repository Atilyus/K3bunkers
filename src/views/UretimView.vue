<template>
    <div class="uretim">
        <div v-if="!uretim">
        <h4 style="padding-top:5px">Hat Seçiniz.</h4>
        <hr>
        <button style="margin:5px" class="btn btn-secondary" @click="secilihat(1)">Döküm 1</button>
        <button style="margin:5px" class="btn btn-secondary" @click="secilihat(2)">Döküm 2</button>
        <button style="margin:5px" class="btn btn-secondary" @click="secilihat(3)">Döküm 3</button>
      </div>
      
      <div v-if="uretim">
        <br>
      <h3 style="text-align: center;">{{title}}</h3>
      <div style="background-color:yellowgreen;height: 35px;width:auto;max-width:100px;float:left">
        <h3 >Hat {{hatno}}</h3>
      </div>
      
      <button style="margin:5px;" class="btn btn-warning" @click="hatde()">Hat Değiştir</button>
      <div style="float:right">
        <button v-if="!isDisabled"  class="btn btn-info"  @click="Onayla()">Onayla</button>
        <h3 v-if="isDisabled" >Onaylı</h3>
      </div>
      
      <hr>
        <table class="table" id="table1">
        <thead>
        <tr>
          <th scope="col">Kod</th>
          <th scope="col">Tanım</th>
          <th scope="col">StokKod</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(qub,i) in quList" :key="i" :style="qub.sec===true ? 'background-color:yellow'  : ''">
          <td>{{qub.Kod}}</td>
          <td>{{qub.Tanım}}</td>
          <td>{{qub.stokkod}}</td>
          <td>
            <button @click="GetHams(this.hatno,qub.Kod)" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-danger btn-xs">Düzenle</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-if="!isDisabled">
        <button type="button" class="btn btn-primary" style="margin:5px" @click="AddBS()" >Kaydet</button>
        <button type="button" class="btn btn-secondary" style="margin:5px" @click="iptal()">İptal</button>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger" id="ModalLabel">Hammadde Seçimi</h5>
              <hr>
              
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
                <tr v-for="(qub,i) in hamList" :key="i" >
                  <td>{{qub.StokKod}}</td>
                  <td>{{qub.StokAd}}</td>
                  <td>
                    <button type="button" @click="PickRaw(qub.f_ID)" class="btn btn-secondary btn-xs" data-bs-dismiss="modal">Seç</button>
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
</template>

<script>
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import axios from 'axios'
import "bootstrap/dist/js/bootstrap.min.js";
export default ({
    setup() {
        
    },
    name:'app',
    data(){
        return {
            uretim:false,
            hatno:0,
            secili:null,
            yenikod:null,
            background: null,
            varm:false,
            title: "Üretim Hammadde İzleme / Değiştirme",
            quList: [{
            Kod: null,
            isDisabled:true,
            Tanım: null,
            stokkod: null,
            sec:false,
            EKod:null,
            hatisemri:null,
            }],
            hamList: [{
            f_ID: null,
            StokKod: null,
            StokAd: null
            }],
            resturl:"http://10.45.0.97:5000/",//10.45.0.97
            netsisurl:"http://10.50.0.60:4000/",
            User:cookies.get('username')
        }
    },
    methods:{
        async GetStat(hat){
          this.quList=null;
           await fetch(this.resturl+"hatdef/"+hat).then(response => response.json())
            .then(data => {
                this.quList = data
                if(hat==3)
            {
                for (const element of this.quList) {
                    let tt = element.Tanım.split(",");
                    if(tt.length>1){
                    element.Tanım=tt[1];
                    element.stokkod=tt[0];
                    }
                }
            }
            });
        },
        async GetHams(hat,kod){
          await  fetch(this.resturl+"hamstoklar/"+hat).then(response => response.json())
            .then(data => {
                this.hamList = data
                if(hat==3)
            {
                for (const element of this.hamList) {
                    let tt = element.StokAd.split(",");
                    if(tt.length>1){
                    element.StokAd=tt[1];
                    element.StokKod=tt[0];
                    }
                }
            }
            });
            this.secili=kod;
        },
       AddBS(){
        for (const element of this.quList) {
            if(element.sec===true)
            {
                this.Postet(element.Kod,element.EKod)
            }
        }
        this.GetStat(this.hatno)
        alert("Değişiklik Yapıldı.")
        },
        async Postet(ykod,ekod){
            await axios({
      method: "POST",
      url: this.resturl+"hamdeg/"+this.hatno+"/Bunelan/"+ykod+"/"+ekod,
      timeout: 1000 * 60, // Wait for 20 seconds
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(error => {
        alert("Hata Kayıt Yapılamadı !"+error);
    });
    },
    async Onaysor(isem) {
        await axios.get(this.resturl+'onaysor/'+isem).then(response=> {
        if(response.status == 200){
        this.hatisemri= response.data
        this.isDisabled=true
        }
        else{
          this.isDisabled=false
        }
      }).catch(error=>{
        console.log(error)
        this.isDisabled=false
    });
    },

    async Onayla(){
      if(this.User=="cem.german" || this.User=="kubra.kucukyilmaz" || this.User=="atila.kosova")
      {      await axios({
      method: "POST",
      url: this.resturl+"ieonayla/"+this.hatno+"/Takıl4gel/",
      timeout: 1000 * 60, // Wait for 20 seconds
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response=> {
        if(response.status == 200){
          alert("Kayıt Başarılı");
          this.Onaysor(this.hatno)
          this.hatisemri=null;
            this.GetStat(this.hatno);
            this.uretim=true;
        }
        else
          alert("Hata Kayıt Yapılamadı !");
      });
    }
    else{
      alert("Yetkiniz YOK !")
    }
      
        },
        async secilihat(no){
          await this.Onaysor(no);
          this.hatisemri=null;
            this.hatno=no;
            this.GetStat(no);
            this.uretim=true;
        },
        hatde(){
            this.uretim=false;
        },
        iptal(){
            this.hatno=0;
            this.hatde();
        },
        PickRaw(id){
            let tt = this.hamList.find(v=> v.f_ID==id);
            let ty = this.quList.find(x=> x.Kod==this.secili)
            ty.EKod=ty.Kod
            ty.Kod=id;
            ty.stokkod=tt.StokKod;
            ty.Tanım=tt.StokAd;
            ty.sec=true;
    },
    },
    updated(){
      
    },
    beforeMount(){
    }
})
</script>
