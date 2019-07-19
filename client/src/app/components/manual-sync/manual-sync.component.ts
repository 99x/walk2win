import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-manual-sync',
	templateUrl: './manual-sync.component.html',
	styleUrls: ['./manual-sync.component.less']
})
export class ManualSyncComponent implements OnInit {

	constructor() { }

	model: any = {};

	ngOnInit() {
	}



	onSubmit() {
		alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4)); // TODO Call API
	}

}
