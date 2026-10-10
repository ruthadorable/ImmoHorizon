import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { UsersService } from '../../../services/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../../../models/article.model';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatToolbarModule,
    MatSidenavModule, MatListModule,MatButtonModule,MatTableModule,MatIcon,
    MatIconModule,MatTooltipModule,TranslateModule,MatPaginatorModule,
    MatDialogModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
service=inject(UserService);
  @ViewChild(MatPaginator)
   paginator!: MatPaginator;

   
   router=inject(Router)
   route=inject(ActivatedRoute)
   users!:User[];
   dataSource:any;
   dialog= inject(MatDialog);
  ngOnInit(){
    this.loadUsers();

  }

  loadUsers(){
     this.service.getUsers().subscribe((data)=>{
      this.users=data;
      console.log(this.users);
       this.dataSource = new MatTableDataSource(this.users);
       if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    }
    )
  }
  
  displayedColumns = [
    'image',
    'title',
    'category',
    'url',
    'content',
    'actions'
  ];

   getImageUrl(url?: string): string {
     if (!url) {
    return './images/users/penthouse1.jpg';
  }
  return url;
  }

  createUser() {
    this.router.navigate(['create'],{
    relativeTo: this.route
    }
    );
  }

  viewUser(id: number) {
    this.router.navigate(['user',id],{
    relativeTo: this.route
  })
  }

  editUser(id: number) {
     this.router.navigate(['update',id],{
    relativeTo: this.route
  });
  }


 deleteUser(id: number): void {

//   const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
//     width: '400px',
//     disableClose: true,
//     data: {
//       title: 'Delete Property',
//       message: 'Are you sure you want to permanently delete this article?'
//     }
//   });

//   dialogRef.afterClosed().subscribe(result => {

//     if (result) {

//       this.service.deleteUser(id).subscribe({

//         next: () => {

//           this.loadusers();
//           console.log(`Article with ID ${id} deleted successfully.`);

//         },

//         error: (err) => console.error(err)

//       });

//     }

//   });

}
}
