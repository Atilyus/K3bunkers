<template>
  <div id="app">
    <div v-if="!auth">
      <div class="loginBox"> <img class="user" src="../src/assets/2.png" alt="" height="100" width="100">
      <h3>Lütfen Giriş Yapınız</h3>
      <form action="">
          <div class="inputBox"> <input id="uname" v-model="user.username" type="text" name="Username" placeholder="isim.soyisim"> <input v-model="user.password" id="pass" type="password" name="Password" placeholder="Şifre"> </div> <input @click="login()" type="button" name="" value="Login">
      </form> 
    </div>
    </div>

    <div v-if="auth" style="background-color: gainsboro;">

      <div style="margin:auto; width:99%; max-width:1300px;" >
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="padding-left: 5px">
      <ul class="nav mr-auto">

        <div v-if="userper"  class="dropdown-toggle">
       <!-- <a class="btn btn-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          | | |
        </a> -->
        <ul class="nav mr-auto"> <!-- class="dropdown-menu" style="padding:8px; background-color:dodgerblue;"-->
          <li class="nav-item"><router-link style="margin-right:10px;" :class="{active:menus.Hat4}" to="/manage">Robot Tanım </router-link></li>
          <li class="nav-item"><router-link style="margin-right:10px"  :class="{active:menus.Hat3}" to="/dokset">Döküm Tanım</router-link></li>
          <li class="nav-item"><router-link style="margin-right:10px"  :class="{active:menus.Bunrap}" to="/bunrap">Bunker Rapor</router-link></li>
          <li class="nav-item"><router-link style="margin-right:10px"  :class="{active:menus.Uretim}" to="/uretim">Üretim</router-link></li>
        </ul>
      </div>
            
       <li class="nav-item" >
         <router-link  style="margin-right:10px"  :class="{active:menus.Robot}" to="/">Robot </router-link>
       </li>
       
       <li class="nav-item" >
         <router-link  style="margin-right:10px"  :class="{active:menus.Dokum}" to="/dokum"> Döküm  </router-link>
         
       </li>
       <li class="nav-item" >
        <router-link  style="margin-right:10px"  :class="{active:menus.Recine}" to="/recine"> Reçine  </router-link>
       </li>

       <li class="nav-item" >
        <router-link  style="margin-right:10px"  :class="{active:menus.Hucre}" to="/hucre"> Hücre  </router-link>
       </li>
       
      </ul>
      <ul class="navbar-nav" style="float:right;padding-right: 5px;">
      <li v-if="userper" class="nav-item" style="padding-top:7px">
          <h5 style="color:blueviolet">{{LoggedUser}}</h5>
      </li>
      
    </ul>
          <button class="btn btn-danger" style="margin-top:5px;margin-right:10px" @click="logout()">Çıkış</button>
      
    </nav>
    
        <router-view/>
    </div>
  </div>
    </div>


    <!-- Modal -->
	<div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">Left Sidebar</h4>
				</div>

				<div class="modal-body">
					<p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
					</p>
				</div>

			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->
  </template>
  <script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import axios from 'axios'
  import { useCookies } from "vue3-cookies";
  export default {
    name: 'app',
    data() {
      return {
        menus:{
        Robot:false,
        Dokum:false,
        Hat3:false,
        Hat4:true,
        Uretim:false,
        Bunrap:true
        },
        user:{
          username: null,
          password: null
        },
        auth:false,
        userper:false,
        LoggedUser:this.cookies.get('username'),
      }
    },
    setup(){
      const { cookies } = useCookies();
      return { cookies };
    },
      created(){
        this.checkuser()
      },
    methods:{
      menuaktive(type){
        this.menus['Home']=false;
        this.menus['Robot']=false;
        this.menus['Dokum']=false;
        this.menus['Hat3']=false;
        this.menus['Hat4']=false;
        this.menus['Recine']=false;
        this.menus['Bunrap']=false;
        this.menus['Hucre']=false;
        this.menus[type]=true;
      },
    checkuser(){
        if(this.cookies.get('username')===null)
        {
          this.auth=false
        }
        else{
          this.auth=true
        }
        this.menush();
      },
      login(){
        axios.post("http://10.45.0.97:5000/login",this.user)
        .then(response=>{
          if(response.status == 200){
            this.auth=true
            this.cookies.set('username', this.user.username, { expire: 60 * 60 * 1 });
            this.LoggedUser=this.user.username;
          }
          else{
            alert("Hata Giriş Yapılamadıı !");
          }
        }).catch(()=>{
          alert("Hata Giriş Yapılamadı ! ");
          this.user.username=null
          this.user.password=null
        });
      },
    logout(){
        this.auth=false
        this.cookies.remove('username')
      },
      menush(){
        var tt = this.cookies.get('username');
        if(tt=="1001" || tt=="1002")
        {this.userper=false;}
        else{
          this.userper=true;
        }
      }
    },
      updated(){
        this.checkuser()
        const url = window.location.href;
        const lastParam = url.split("/").slice(-1)[0];
        this.menuaktive(lastParam);
      },
      refreshed()
      {
        
      }
    }
    
    </script>
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  nav {
    padding: 20px;
    border: solid 1px;
  box-shadow: 2px 0px 1px 1px rgb(71, 70, 70);
  }
  .navbar .navb{
    float: right;
  }
  nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  nav a.router-link-exact-active {
    color: #cfd5d1;
  }
  .nav-item{
    font-size: 20px  !important
  }
  
  body {
      margin: 0;
      padding: 0;
      
      height: 100vh;
      font-family: sans-serif;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
  }
  
  
  #particles-js {
      height: 100%
  }
  
  .loginBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      min-height: 200px;
      background: #000000;
      border-radius: 10px;
      padding: 40px;
      box-sizing: border-box
  }
  
  .user {
      margin: 0 auto;
      display: block;
      margin-bottom: 20px
  }
  
  h3 {
      margin: 0;
      padding: 0 0 20px;
      color: #59238F;
      text-align: center
  }
  
  .loginBox input {
      width: 100%;
      margin-bottom: 20px
  }
  
  .loginBox input[type="text"],
  .loginBox input[type="password"] {
      border: none;
      border-bottom: 2px solid #262626;
      outline: none;
      height: 40px;
      color: #fff;
      background: transparent;
      font-size: 16px;
      padding-left: 20px;
      box-sizing: border-box
  }
  
  .loginBox input[type="text"]:hover,
  .loginBox input[type="password"]:hover {
      color: #42F3FA;
      border: 1px solid #42F3FA;
      box-shadow: 0 0 5px rgba(0, 255, 0, .3), 0 0 10px rgba(0, 255, 0, .2), 0 0 15px rgba(0, 255, 0, .1), 0 2px 0 black
  }
  
  .loginBox input[type="text"]:focus,
  .loginBox input[type="password"]:focus {
      border-bottom: 2px solid #42F3FA
  }
  
  .inputBox {
      position: relative
  }
  
  .inputBox span {
      position: absolute;
      top: 10px;
      color: #262626
  }
  
  .loginBox input[type="submit"] {
      border: none;
      outline: none;
      height: 40px;
      font-size: 16px;
      background: #59238F;
      color: #fff;
      border-radius: 20px;
      cursor: pointer
  }
  
  .loginBox a {
      color: #262626;
      font-size: 14px;
      font-weight: bold;
      text-decoration: none;
      text-align: center;
      display: block
  }
  
  a:hover {
      color: #00ffff
  }
  
  p {
      color: #0000ff
  }


  </style>
  