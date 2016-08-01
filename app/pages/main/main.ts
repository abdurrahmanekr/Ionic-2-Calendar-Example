import { Component } from '@angular/core';
import { Loading, NavController, Modal, Platform, NavParams, ViewController, ActionSheet, Alert } from 'ionic-angular';

import { ActivityService } from '../../services/ActivityService';

@Component({
  	templateUrl: 'build/pages/main/main.html'
})
export class Main {
	public Activites = [];
	public nav;
  	constructor(public navCtrl: NavController) {
  		ActivityService.getAllTodo().then(response => {
  			this.Activites = response.res.rows;
  		});
  		this.nav = navCtrl;
  	}

  	public addTodo(){
  		let profileModal = Modal.create(ModalsContentPage, { charNum: 0 });
	   	this.nav.present(profileModal);
  	}

  	optionTodo(val){
  		let options = ActionSheet.create({
  			title: 'İşlemler',
		    buttons: [
		      	{
			        text: 'Sil',
			        role: 'destructive',
			        handler: () => {
			        	let deleteOption = options.dismiss();
			        	deleteOption.then(() => {
				        	let deleteItem = Alert.create({
							    title: 'Siliniyor!',
							    message: 'Silmek istediğine emin misin ?',
							    cssClass: 'danger',
							    buttons: [
							      	{
								        text: 'Vazgeç',
								        role: 'cancel'
								    },
								    {
								        text: 'Evet',
								        handler: () => {
								        	ActivityService.deleteTodo(val.id);
								        	ActivityService.getAllTodo().then(response => {
									  			this.Activites = response.res.rows;
									  		});
								        }
							      	}
							    ]
						  	});
						  	this.nav.present(deleteItem);
			        	});
			        }
		      	},
		      	{
			        text: 'Düzenle',
			        handler: () => {
			        	let deleteOption = options	.dismiss();
			        	deleteOption.then(() => {
				        	ActivityService.getUserList("id = ?", [val.id]).then(response => {
					        	let updateAlert = Alert.create({
					        		title: 'Düzenle',
					        		inputs: [
					        			{
					        				type: 'date',
					        				name: 'date',
					        				placeholder: 'Tarih',
					        				value: response.res.rows[0].date
					        			},
					        			{
					        				type: 'text',
						        			name: 'name',
					        				placeholder: 'Etkinliğin ismi',
					        				value: response.res.rows[0].name
					        			},
					        			{
					        				type: 'text',
					        				name: 'description',
					        				placeholder: 'Açıklama',
					        				value: response.res.rows[0].description
					        			},
					        			{
					        				type: 'text',
					        				name: 'tags',
					        				placeholder: 'Etiketler',
					        				value: response.res.rows[0].tags
					        			}
					        		],
					        		buttons: [
					        			{
					        				text: 'Vazgeç',
					        				role: 'cancel'
					        			},
					        			{
					        				text: 'Kaydet',
					        				handler: data => {
				        						data.id = response.res.rows[0].id;
					        					ActivityService.updateTodo(data).then(() => {
					        						ActivityService.getAllTodo().then(response => {
											  			this.Activites = response.res.rows;
											  		});
					        					});
					        				}
					        			}
					        		]
					        	});
					        	this.nav.present(updateAlert);
			        		});
			        	});
			        }
		      	},
		      	{
			        text: 'Geri',
			        role: 'cancel'
		      	}
		    ]
  		});
  		this.nav.present(options);
  	}
}

@Component({
  templateUrl: 'build/modals/add-todo.html'
})
class ModalsContentPage {
  	character;
  	newTodo = {id: "", name: "", description: "", date: "", tags: ""};
  	public nav;

  	constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public navCtrl: NavController) {
  		this.nav = navCtrl;
 	}

  	dismiss() {
    	this.viewCtrl.dismiss();
  	}

  	addTodo() {
  		if (this.newTodo.name == "" || this.newTodo.date == "") {
  			return ;
  		} else {
			let alert = Loading.create({
				content: "Yükleniyor",
				spinner:"circles",
			});
			this.nav.present(alert);
	  		let result = ActivityService.addTodo(this.newTodo);
	  		if(result) {
				setTimeout(function () {
					alert.dismiss();
				}, 100);
	  		} else {
	  			
	  		}
  		}
  	}
}