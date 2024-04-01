// laptop-form.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LaptopService } from '../laptop.service';

@Component({
  selector: 'app-laptop-form',
  templateUrl: './laptop-form.component.html',
  styleUrls: ['./laptop-form.component.css']
})
export class LaptopFormComponent implements OnInit {
  laptopData: any = {};
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private laptopService: LaptopService
  ) { }

  ngOnInit(): void {
    const laptopId = this.route.snapshot.paramMap.get('id');
    if (laptopId) {
      // Editing mode: Fetch laptop data for editing
      this.isEditMode = true;
      this.loadLaptop(laptopId);
    }


    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        // Fetch the laptop data based on the ID
        this.isEditMode = true;
        this.fetchLaptopData(id);
      } else {
        // Add mode: Initialize empty laptop data
        this.isEditMode = false;
        this.laptopData = { name: '', brand: '', price: null };
      }
    });

  }


  fetchLaptopData(id: string) {
    this.laptopService.getLaptopById(id).subscribe(
      (data) => {
        this.laptopData = data;
        console.log("This is id data ",  this.laptopData);
      },
      (error) => {
        console.error('Error fetching laptop data:', error);
      }
    );
  }



  loadLaptop(id: string): void {
    this.laptopService.getLaptopById(id).subscribe(
      (data) => {
        this.laptopData = data;
      },
      (error) => {
        console.error('Error fetching laptop:', error);
      }
    );
  }

  saveLaptop(): void {
    if (this.isEditMode) {
      // Update existing laptop
      this.laptopService.updateLaptop(this.laptopData._id, this.laptopData).subscribe(
        () => {
          console.log('Laptop updated successfully');
          this.router.navigate(['/laptops']);
        },
        (error) => {
          console.error('Error updating laptop:', error);
        }
      );
    } else {
      // Add new laptop
      this.laptopService.addLaptop(this.laptopData).subscribe(
        () => {
          console.log('Laptop added successfully');
          this.router.navigate(['/laptops']);
        },
        (error) => {
          console.error('Error adding laptop:', error);
        }
      );
    }
  }
}
