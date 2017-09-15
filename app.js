Vue.component('gallery', {
         template: `<div id="videos-template">
                    <div v-if="CurrentVideo!=''" id="CurrentVideo"  :class="{'galbg1': isActive==1}">
                      <div  v-on:click="removeShowClass()" id="gallery_close" class='gallery_close'></div>
                      <iframe  id="player" v-bind:src="CurrentVideo" height="480" width="640"></iframe>
                    </div>
                    <ul>
                    <li v-for="video in videos">
                      <a>
                      <div  v-on:click="addShowClass($event)" v-bind:id="video.snippet.resourceId.videoId" >{{ video.snippet.title }}  /   {{ video.snippet.resourceId.videoId }} 
                      <img   v-on:click="addShowClass($event)" v-bind:id="video.snippet.resourceId.videoId" v-bind:src="video.snippet.thumbnails.medium.url" v-bind:alt="video.snippet.title" v-bind:title="video.snippet.title"/>
                      </div>
                      </a>
                    </li>
                  </ul> 
                </div>`,
         data: function(){
          return {
            isActive: 0,
            CurrentVideo: '',
            videos: [],
            MaxVideos: 6, 
          };
        },
        created: function() {
          this.fetchVideoList();
        },
        methods: {
          fetchVideoList: function(){
            this.isActive=0; 
             axios.get("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PL7EF3A886F63DF6FD&key=AIzaSyABnuXRuPyGTITs5975a10QX2hZcwY_cgc&fields=items&part=snippet&maxResults="+this.MaxVideos).then(response=>{this.videos = response.data.items});
              
          },
          addShowClass: function (event) {
            console.log(" ID  = " + event.target.getAttribute('id'))
              this.CurrentVideo = "https://www.youtube.com/embed/"+event.target.getAttribute('id');
              this.isActive = 1;
            },
            removeShowClass: function () {
              this.CurrentVideo ="";
              this.isActive=0;              
            },
        },
    });
     new Vue({
      el: '#container',
    });   
