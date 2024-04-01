// laptop-list.component.ts

import { Component, OnInit } from '@angular/core';
import { LaptopService } from '../laptop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laptop-list',
  templateUrl: './laptop-list.component.html',
  styleUrls: ['./laptop-list.component.css']
})
export class LaptopListComponent implements OnInit {
  laptops: any[] = [];

  constructor(private laptopService: LaptopService, private router: Router) { }

  ngOnInit(): void {
    this.loadLaptops();
  }

  loadLaptops(): void {
    this.laptopService.getLaptops().subscribe(
      (data) => {
        this.laptops = data;
      },
      (error) => {
        console.error('Error fetching laptops:', error);
      }
    );
  }

  deleteLaptop(id: string): void {
    if (confirm('Are you sure you want to delete this laptop?')) {
      this.laptopService.deleteLaptop(id).subscribe(
        () => {
          // Remove the deleted laptop from the list
          this.laptops = this.laptops.filter((laptop) => laptop._id !== id);
        },
        (error) => {
          console.error('Error deleting laptop:', error);
        }
      );
    }
  }

  updateLaptop(id: string) {
    this.router.navigate([`/laptops/update`, id]);
  }
}
