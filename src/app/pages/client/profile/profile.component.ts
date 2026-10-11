import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
type ProfileTab = 'saved' | 'visits' | 'candidacies' | 'messages';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  activeTab: ProfileTab = 'saved';
  searchText = '';
  notificationCount = 3;
  userId?: number;
  route= inject(ActivatedRoute)
  userService=inject(UserService)
  user:User | undefined;

  // user = {
  //   name: 'Sarah Martin',
  //   email: 'sarah.martin@email.com',
  //   role: 'Client',
  //   location: 'Brussels, Belgium',
  //   memberSince: 'Jan 2024',
  //   description:
  //     "Passionate about real estate, I'm always looking for new opportunities to find my next home or investment user.",
  //   avatar:
  //     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=85'
  // };

  ngOnInit(){
  
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const userId = user.idUser;

        console.log('User ID:', userId);

        if (userId != null) {
              this.userService.getUserById(userId).subscribe( (data)=>{
              this.user=data;
              this.user.location='Brussels, Belgium',
              this.user.memberSince= 'Jan 2024',
              this.user.description=
                "Passionate about real estate, I'm always looking for new opportunities to find my next home or investment user.",
              this.user.avatar='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=85'
              console.log(data);
          })
        }
      } catch (error) {
        console.error('Could not parse stored user:', error);
      }
    }


 
  }
  
  properties = [
    {
      id: 1,
      title: 'Golden Leaf Residence',
      price: 750000,
      address: '1012 Oak Avenue',
      city: 'Manchester, M11 1AE, United Kingdom',
      beds: 3,
      baths: 2,
      area: 900,
      purpose: 'FOR SALE',
      saved: true,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85'
    },
    {
      id: 2,
      title: 'Oakview Residence',
      price: 600000,
      address: '4567 Lavender Way',
      city: 'Sydney, NSW 2000, Australia',
      beds: 3,
      baths: 2,
      area: 900,
      purpose: 'FOR RENT',
      saved: true,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85'
    },
    {
      id: 3,
      title: 'Golden Leaf Residence',
      price: 780000,
      address: '3456 Cedar Lane',
      city: 'Toronto, ON M4B 1B3, Canada',
      beds: 3,
      baths: 2,
      area: 900,
      purpose: 'FOR SALE',
      saved: true,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85'
    },
    {
      id: 4,
      title: 'Skygarden Living',
      price: 860000,
      address: '2345 Birch Road',
      city: 'Berlin, 10115, Germany',
      beds: 3,
      baths: 2,
      area: 900,
      purpose: 'FOR RENT',
      saved: true,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85'
    }
  ];

  visits = [
    {
      id: 1, title: 'Oakview Residence',
      date: '12 Apr 2025 · 10:30 AM',
      address: '4567 Lavender Way, Sydney',
      status: 'Confirmed', image: this.properties[1].image
    },
    {
      id: 2, title: 'Golden Leaf Residence',
      date: '15 Apr 2025 · 02:00 PM',
      address: '1012 Oak Avenue, Manchester',
      status: 'Pending', image: this.properties[2].image
    },
    {
      id: 3, title: 'Skygarden Living',
      date: '20 Apr 2025 · 11:00 AM',
      address: '2345 Birch Road, Berlin',
      status: 'Confirmed', image: this.properties[3].image
    }
  ];

  candidacies = [
    {
      id: 1, title: 'Villa De Luna',
      address: 'Chicago, IL, 60601, USA',
      date: 'Submitted on 08 Apr 2025',
      status: 'Under review', image: this.properties[0].image
    },
    {
      id: 2, title: 'Solaris Towers',
      address: 'New Orleans, LA, 70112, USA',
      date: 'Submitted on 02 Apr 2025',
      status: 'Accepted', image: this.properties[1].image
    },
    {
      id: 3, title: 'Skygarden Living',
      address: 'Berlin, 10115, Germany',
      date: 'Submitted on 28 Mar 2025',
      status: 'Rejected', image: this.properties[3].image
    }
  ];

  messages = [
    {
      id: 1, name: 'Emma Wilson', time: '10:24 AM',
      preview: 'Hi Sarah, the user is still available...',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2, name: 'Lucas Bernard', time: 'Yesterday',
      preview: "Thanks for your interest! I'll send you...",
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 3, name: 'Sophie Martin', time: 'Apr 8',
      preview: 'Could you please provide more details...',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 4, name: 'Daniel Garcia', time: 'Apr 6',
      preview: 'The visit is confirmed for tomorrow...',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 5, name: 'Admin', time: 'Apr 2',
      preview: 'Welcome to ImmoHorizon! If you have...',
      unread: 0,
      avatar: ''
    }
  ];

  get filteredProperties() {
    const query = this.searchText.trim().toLowerCase();

    return this.properties.filter(user =>
      user.saved &&
      (!query ||
        `${user.title} ${user.address} ${user.city}`
          .toLowerCase().includes(query))
    );
  }

  selectTab(tab: ProfileTab): void {
    this.activeTab = tab;
  }

  toggleSaved(user: (typeof this.properties)[number]): void {
    user.saved = !user.saved;
  }

  editProfile(): void {
    // Open your edit-profile dialog or navigate to your edit route.
  }

  openItem(section: string, id?: number): void {
    // Connect to Angular Router or your detail/message dialog.
    console.log('Open:', section, id);
  }
}