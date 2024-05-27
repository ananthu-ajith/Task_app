import { Component, } from '@angular/core';
import { DetailsService } from '../../Services/details.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink, RouterOutlet, } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import Swal from 'sweetalert2';
Chart.register(...registerables);





@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  // filter = document.getElementById('filter') as HTMLSelectElement;

  charthigh!: string
  chartmedium!: string
  chartlow!: string

  overduearr: any
  filtertype: string = 'Pending'
  pendingarr: any
  completedarr: any
  combined!: any[]
  currentDate = new Date();
  dueDate: any
  taskdetails: any
  cpmpletedform: any
  patchbody: any = {
    status: 'Completed'
  }
  recievedform: any

  curuser: any = localStorage.getItem('curuser')

  chartInstance: any
  sortchange: boolean = true


  constructor(private tasklist: DetailsService, private router: Router, private location: Location) { }

  ngOnInit() {



    this.renderPendingtask()


    setTimeout(() => {
      this.renderchart()
    }, 100)





  }

    // Cleanup chart instance when component is destroyed

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  rendertask() {
    this.tasklist.getdetails().subscribe(
      {
        next: (data: any) =>
          this.pendingarr = data.filter((task: any) => {
            return task.assignee == this.curuser || task.assignee == 'All'
          }
          ),
        error: error => Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })

      }
    )
    this.tasklist.getdetailscompleted().subscribe(
      {
        next: (data: any) =>
          this.completedarr = data.filter((task: any) => {
            return task.assignee == this.curuser || task.assignee == 'All'
          }
          ),
        error: error => Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })

      }
    )
    setTimeout(() => {
      this.combined = [...this.pendingarr, ...this.completedarr];
    }, 100)
  }

  renderPendingtask() {
    this.tasklist.getdetails().subscribe(
      {
        next: (data: any) =>
          this.pendingarr = data.filter((task: any) => {
            return task.assignee == this.curuser || task.assignee == 'All'
          }
          ),
        error: error => Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
      }
    )

    setTimeout(() => {
      this.combined = this.pendingarr;
    }, 120)
  }

  renderCompletedtask() {
    this.tasklist.getdetailscompleted().subscribe(

      {
        next: (data: any) =>
          this.completedarr = data.filter((task: any) => {
            return task.assignee == this.curuser || task.assignee == 'All'
          }
          ),
        error: error => Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
      }
    )

    setTimeout(() => {
      this.combined = this.completedarr;
    }, 100)

  }

  renderOverduetask() {
    this.tasklist.getdetails().subscribe(

      {
        next: (data: any) =>

          this.overduearr = data.filter((task: any) => {
            this.dueDate = new Date(task.due_date);
            return this.dueDate < this.currentDate && (task.assignee == this.curuser || task.assignee == 'All');

          }),

        error: error => Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
      }
    )



    setTimeout(() => {
      this.combined = this.overduearr;
    }, 100)
  }


  // Handle filter change

  filterchange() {
    if (this.filtertype == 'All') {
      this.rendertask()
    }
    else if (this.filtertype == 'Pending') { this.renderPendingtask() }
    else if (this.filtertype == 'Completed') {
      this.renderCompletedtask()
    }
    else {
      this.renderOverduetask()
    }

  }


  renderchart() {

    this.chartmedium = this.pendingarr.filter((task: any) => task.priority === 'Medium').length;
    this.charthigh = this.pendingarr.filter((task: any) => task.priority === 'High').length;
    this.chartlow = this.pendingarr.filter((task: any) => task.priority === 'Low').length;

        // Destroy existing chart instance if any


    if (this.chartInstance) {
      this.chartInstance.destroy();
    }



    this.chartInstance = new Chart('chrt', {
      type: 'pie',
      data: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
          label: '# of Votes',
          data: [this.charthigh, this.chartmedium, this.chartlow],
          borderWidth: 5,
          backgroundColor: ['red', 'blue', 'green'],


        }]
      },
      options: {

        responsive: true,

        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 20,
                weight: 'bold',
                family: 'Tahoma'
              }
            }
          },

          title: {
            display: true,
            text: 'Pending Tasks',
            color: 'black',
            font: {
              size: 22,
              family: 'Tahoma',
              weight: 'bold',

            }
          }

        },


      }
    });



  }

  create() {
    this.router.navigateByUrl('update')

  }
  profile() {
    this.router.navigateByUrl('profile')

  }






  show(id: any) {
    this.tasklist.getsingledetails(id).subscribe(


      {
        next: (data: any) =>
          this.taskdetails = data,
        error: error => Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })
      }
    )
    localStorage.setItem('taskid', id)
    setTimeout(() => {
      this.router.navigateByUrl('taskdetails')
    }, 200);

  }

  completed(id: any) {


    this.tasklist.patchdetails(id, this.patchbody).subscribe(



      {
        next: (response: any) =>
          this.cpmpletedform = response,
        error: error => Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })




      })


    setTimeout(() => {
      this.tasklist.adddetailscomp(this.cpmpletedform).subscribe(
        {
          error: error => Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not connected to the Server",
          })

        }
      )
    }, 100)

    setTimeout(() => {
      this.delete(id)
    }, 200);

  }

  delete(id: number) {
    this.tasklist.deletedetails(id).subscribe(

      {
        next: (data: any) =>
          this.recievedform = data,
        error: error => Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })

      }

    )



    setTimeout(() => {
      this.tasklist.getdetails().subscribe(
        {
          next: (data: any) =>
            this.pendingarr = data,
          error: error => Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not connected to the Server",
          })

        }
      );
    }, 100);
    setTimeout(() => {
      this.filterchange();
    }, 110);

    setTimeout(() => {
      this.renderchart();
    }, 200);




  }

  deletecompleted(id: any) {
    this.tasklist.deletecompdetails(id).subscribe(
      {
        next: (data: any) => {
          this.recievedform = data

        },
        error: error => Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not connected to the Server",
        })

      }
    )

    setTimeout(() => {
      this.filterchange();
    }, 100);
  }



  sortasc() {

    this.sortchange = !this.sortchange
    this.combined.sort((a: any, b: any) => {

      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);

      return dateA.getTime() - dateB.getTime();
    });

  }

  sortdesc() {
    this.sortchange = !this.sortchange

    this.combined.sort((a: any, b: any) => {


      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);

      return dateB.getTime() - dateA.getTime();
    });
  }


}
