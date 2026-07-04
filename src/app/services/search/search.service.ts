import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CriteresRecherche } from '../../models/criteresRecherche.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private criteriaSubject =
    new BehaviorSubject<CriteresRecherche | null>(null);

  criteria$ = this.criteriaSubject.asObservable();

  update(criteria: CriteresRecherche) {
    this.criteriaSubject.next(criteria);
  }
}
