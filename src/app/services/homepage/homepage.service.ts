import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomepageBanner } from '../../models/banner.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomepageService {
<<<<<<< HEAD

   private readonly apiUrl = `${environment.apiUrl}/api/homepage/banner`;
=======
    //local endpoint
   //private readonly apiUrl = 'http://localhost:8080/api/homepage/banner';
   //aws backend endpoint
     private apiUrl = 'http://ec2-44-192-116-114.compute-1.amazonaws.com:3030/homepage/banner';
>>>>>>> ea44efe56abb81482fb45ab79a6b302d8a2da318

  constructor(private http: HttpClient) {}

  /**
   * Returns the active banner displayed on the homepage.
   */
  getActiveBanner(): Observable<HomepageBanner> {
    return this.http.get<HomepageBanner>(this.apiUrl);
  }

  /**
   * Returns a banner by its id.
   */
  getBanner(id: number): Observable<HomepageBanner> {
    return this.http.get<HomepageBanner>(`${this.apiUrl}/${id}`);
  }

  /**
   * Returns all banners.
   */
  getAllBanners(): Observable<HomepageBanner[]> {
    return this.http.get<HomepageBanner[]>(`${this.apiUrl}/all`);
  }

  /**
   * Creates a new banner.
   */
  createBanner(
    banner: HomepageBanner,
    image?: File
  ): Observable<HomepageBanner> {

    const formData = new FormData();

    formData.append(
      'banner',
      new Blob(
        [JSON.stringify(banner)],
        {
          type: 'application/json'
        }
      )
    );

    if (image) {
      formData.append('image', image);
    }

    return this.http.post<HomepageBanner>(
      this.apiUrl,
      formData
    );

  }

  /**
   * Updates an existing banner.
   */
  updateBanner(
    id: number,
    banner: HomepageBanner,
    image?: File
  ): Observable<HomepageBanner> {

    const formData = new FormData();

    formData.append(
      'banner',
      new Blob(
        [JSON.stringify(banner)],
        {
          type: 'application/json'
        }
      )
    );

    if (image) {
      formData.append('image', image);
    }

    return this.http.put<HomepageBanner>(
      `${this.apiUrl}/${id}`,
      formData
    );

  }

  /**
   * Deletes a banner.
   */
  deleteBanner(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}
