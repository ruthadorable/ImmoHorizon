import { MatPaginatorIntl } from '@angular/material/paginator';

export function frenchPaginator() {
  const paginator = new MatPaginatorIntl();

  paginator.itemsPerPageLabel = 'Éléments par page';
  paginator.nextPageLabel = 'Suivant';
  paginator.previousPageLabel = 'Précédent';
  paginator.firstPageLabel = 'Première page';
  paginator.lastPageLabel = 'Dernière page';

  return paginator;
}