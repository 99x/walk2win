import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-individual',
	templateUrl: './individual.component.html',
	styleUrls: ['./individual.component.less']
})
export class IndividualComponent implements OnInit {
	@Input() player: any;
	@Input() playerName: string;

	@Output() backClicked: EventEmitter<any> = new EventEmitter();

	public getGmail(): string {
		if (localStorage.getItem('gmail')) {
			return localStorage.getItem('gmail');
		}
		return null;
	}

	constructor() { }

	ngOnInit() {
		console.log('player--', this.player);
	}

	navigateBack() {
		this.backClicked.emit(true);
	}

}
