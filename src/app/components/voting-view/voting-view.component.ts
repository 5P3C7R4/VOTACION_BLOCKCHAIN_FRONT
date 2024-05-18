import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services/candidates.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voting-view.component.html',
  styleUrl: './voting-view.component.scss'
})
export class VotingViewComponent implements OnInit {

  public candidates: any;
  public preselectedCandidate: any = null;
  public showModal: boolean = false;

  constructor(
    public candidateService: CandidatesService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.candidateService.getCandidates().subscribe({
      next: (data) => this.candidates = data,
      error: (err) => console.log(err)
    })
  }

  preselectCandidate(candidate: any) {
    this.showModal = true;
    this.preselectedCandidate = candidate;
  }

  obtainImage(imageName: string): string {
    return this.candidateService.getImages(imageName);
  }

  vote(preselectCandidate: any) {
    this.candidateService.vote(preselectCandidate).subscribe({
      next: () => {
        this.toastr.success("Voto registrado con éxito");
        this.router.navigate(['scan']);
      },
      error: (err) => {
        this.toastr.error("Ha ocurrido un error");
        console.error(err)
      }
    });
  }
}
