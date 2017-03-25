import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MapService } from './map.service';
import { MapModel } from './map.model';

describe('Map Service', () => {
	let mapService: MapService;

	beforeEach(() => {
	  TestBed.configureTestingModule({
	    providers: [
	      MapService
	    ]
	  });
	});

	it('should return an Observable when get called', async(() => {
	  expect(TestBed.get(MapService).getCell()).toEqual(jasmine.any(Observable));
	}));
});
