import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from './map/map.service';
import { CellService } from './cell/cell.service';

@NgModule({
  imports: [CommonModule]
})
export class LocationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LocationModule,
      providers: [
      	MapService,
      	CellService
      ]
    };
  }
}