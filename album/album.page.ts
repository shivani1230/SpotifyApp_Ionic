import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import albums from '../../assets/mockdata/albums';
import { Downloader,DownloadRequest,NotificationVisibility } from '@ionic-native/downloader/ngx';
@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
data=null;
  constructor(private activatedRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private downloader:Downloader) { }

  playlist = [
    {
      title: 'Ex:Re',
      img: 'tomm',
      name: 'Song1',
      path: '/assets/Teri_Naar_1.mp3'
    }
  ];
songs:any;

  ngOnInit() {
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    const decodedTitle = decodeURIComponent(title);
    this.data = albums[decodedTitle];
    console.log('this:', this.data);

    this.title = localStorage.getItem("token");
  }
  title:string;

add(){
  this.title ="Local Storage Testing",
  localStorage.setItem("token", this.title);
}



  dasherize(string){
    return string.replace(/[A-Z]/g, function (char, index){
      return (index !== 0 ? '-' : '') + char.toLowerCase();
    });
  };

  playmode(song){
    this.songs = new Audio(song);
    this.songs.load();
    this.songs.play();    
  }

  pausemode(){
    this.songs.pause();
  }
  async action(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass:'my-custom-class',
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Shared');
        }
      },
      {
        text: 'Save',
        icon: 'bookmark',
        handler: () => {
          console.log('Saved');
      }
     },
      {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          console.log('Deleted');
      }
    },
        {
          text: 'Favourite',
          icon: 'heart',
          handler: () => {
            console.log('Favourite');
        }
       },
       {
        text: 'Cancel',
        icon: 'close',
        handler: () => {
          console.log('Closed');
      }
     }]
    });
    await actionSheet.present();
  }

  download(){
    var downloadurl="C:/Users/Shivani/Music/NewDownloads";
    var request:DownloadRequest={
      uri:downloadurl,
      title:"MyDownloads",
      description:'Ionic Downloading',
      mimeType:'image/png',
      visibleInDownloadsUi:true,
      notificationVisibility:NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir:{
        dirType:'Downloads',
        subPath:'MyFile.png'
      }
    };
    this.downloader.download(request).then((location:string)=>{
      alert("File Downloaded at:"+location);
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }
}
