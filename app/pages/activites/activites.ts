import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ActivityService } from '../../services/ActivityService';

@Component({
    templateUrl: 'build/pages/activites/activites.html'
})
export class Activites {
    public Activites: Array<any>;
    public searchQuery: string;
    public deleteActiviytCount;

    constructor(public nav: NavController) {
        this.Activites = [];
        ActivityService.getAllTodo().then((res: any) => {
            this.Activites = res;
            this.deleteActiviytCount = this.getDeletedCount();
        });
        this.searchQuery = '';
        this.nav = nav;
    }

    getItems(ev) {
        ActivityService.getAllTodo().then((res: any) => {
            this.Activites = res;
            let val = ev.target.value;

            if (val && val.trim() != '')
                this.Activites = this.Activites.filter(item => {
                    return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
                })
        });
    }

    getDeletedCount() {
        let count = 0;
        for (let i = 0; i < this.Activites.length; i++) {
            if (this.Activites[i].status == "0")
                count++;
        }
        return count;
    }

}