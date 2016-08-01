import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, SqlStorage } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Main } from './pages/main/main';
import { Activites } from './pages/activites/activites';
import { Statistic } from './pages/statistic/statistic';

@Component({
  	templateUrl: 'build/app.html'
})

class MyApp {

  	@ViewChild(Nav) nav: Nav;

  	rootPage: any = Main;

  	pages: Array<{title: string, component: any}>;

  	constructor(private platform: Platform) {
  		new Storage(SqlStorage).query("CREATE TABLE IF NOT EXISTS Todo (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), description VARCHAR(255), tags VARCHAR(255), date VARCHAR(20), statu VARCHAR(2))");

    	this.initializeApp();

    	// used for an example of ngFor and navigation
	    this.pages = [
	      	{ title: 'Anasayfa', component: Main },
	      	{ title: 'Tüm Etkinlikler', component: Activites },
	      	{ title: 'İstatistikler', component: Statistic }
	    ];

  	}

  	initializeApp() {
		this.platform.ready().then(() => {
	      	// Okay, so the platform is ready and our plugins are available.
	      	// Here you can do any higher level native things you might need.
	      	StatusBar.styleDefault();
	    });
  	}

  	openPage(page) {
	    // Reset the content nav to have just this page
	    // we wouldn't want the back button to show in this scenario
	    this.nav.setRoot(page.component);
  	}
}

ionicBootstrap(MyApp);
