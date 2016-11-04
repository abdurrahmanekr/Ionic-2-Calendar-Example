import { Component } from '@angular/core';
import { Loading, NavController, Modal, Platform, NavParams, ViewController, ActionSheet, Alert, Toast } from 'ionic-angular';

import { ActivityService } from '../../services/ActivityService';

@Component({
  	templateUrl: 'build/pages/main/main.html'
})
export class Main {
	public Activites = null;

  	constructor(public nav: NavController) {
  		ActivityService.getAllTodo().then(response => {
  			this.Activites = response;
  		});
  	}

  	public addTodo(){
  		let profileModal = Modal.create(ModalsContentPage, { charNum: 0 });
  		profileModal.onDismiss(() => {
  			this.refleshList();
  		})
	   	this.nav.present(profileModal);
  	}

  	refleshList(){
  		ActivityService.getAllTodo().then(response => {
  			this.Activites = response;
  		});
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
								        	this.refleshList();
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
			        	let deleteOption = options.dismiss();
			        	deleteOption.then(() => {
				        	ActivityService.getUserList("id = ?", [val.id]).then((response: any) => {
				        		response = response[0];
					        	let updateAlert = Alert.create({
					        		title: 'Düzenle',
					        		inputs: [
					        			{
					        				type: 'date',
					        				name: 'date',
					        				placeholder: 'Tarih',
					        				value: response.date
					        			},
					        			{
					        				type: 'text',
						        			name: 'name',
					        				placeholder: 'Etkinliğin ismi',
					        				value: response.name
					        			},
					        			{
					        				type: 'text',
					        				name: 'description',
					        				placeholder: 'Açıklama',
					        				value: response.description
					        			},
					        			{
					        				type: 'text',
					        				name: 'tags',
					        				placeholder: 'Etiketler',
					        				value: response.tags
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
				        						data.id = response.id;
					        					ActivityService.updateTodo(data).then(() => {
					        						this.refleshList();
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
  			let alert = Toast.create({
				message: "Boş Bırakma Len ;)",
				duration: 1000,
				position: "top"
			});
			this.nav.present(alert);
  		} else {
			let alert = Loading.create({
				content: "Yükleniyor",
				spinner:"circles",
			});
			this.nav.present(alert);
	  		ActivityService.addTodo(this.newTodo).then(() => {
				let deleteAlert = alert.dismiss();
				deleteAlert.then(() =>  {
			    	this.viewCtrl.dismiss();
				});
	  		});
  		}
  	}
}