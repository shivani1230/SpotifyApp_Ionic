import { Component } from '@angular/core';
import recentlyPlayed from '../../assets/mockdata/recentlyPlayed.json';
import heavyRotation from '../../assets/mockdata/heavyRotation.json';
import jumpBackIn from '../../assets/mockdata/jumpBackIn.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  data=[
    {
      title: 'Recently Played',
      albums: recentlyPlayed
    },
  {
    title: 'Heavy Rotation',
    albums: heavyRotation
  },
  {
    title: 'Jump Back In',
    albums: jumpBackIn
  }
  ];

  opts = {
    slidesPerView: 2.4,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true
  }


  constructor(private router: Router) {}

  openAlbum(album){
    const titleEscaped = encodeURIComponent(album.title);
    console.log('titleEscaped:', titleEscaped);
    this.router.navigateByUrl(`/tab1/tab2/${titleEscaped}`);
  }

    dasherize(string){
      return string.replace(/[A-Z]/g, function (char, index){
        return (index !== 0 ? '-' : '') + char.toLowerCase();
      });
    };


}
