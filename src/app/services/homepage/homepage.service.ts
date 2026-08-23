import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomepageBanner } from '../../models/banner.model';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

   private readonly apiUrl = 'http://localhost:8080/api/homepage/banner';

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
