import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, toArray } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private url = environment.path + "candidates"
  private imageUrl = environment.path + "getImage";

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getCandidates() {
    return this.http.get(this.url).pipe(
      concatMap((el: any) => el.dbCandidates),
      map((el: any) => { return { id: el._id, name: el.name, imageName: el.imageName } }),
      toArray()
    )
  }

  getImages(imageName: string): string {
    return this.imageUrl + "?imageName=" + imageName;
  }

  vote(candidate: any) {
    return this.http.post(this.url + "/vote", { document: this.userService.document, candidate: candidate.id })
  }

}
