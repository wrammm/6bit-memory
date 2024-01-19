import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {}
  cells = Array(64)
    .fill({})
    .map(() => ({ clicked: false }));
  selectedCellIndex: null | number = null;
  showAnswer = false;

  toggleCell(index: number) {
    this.cells[index].clicked = !this.cells[index].clicked;
  }

  randomize() {
    this.selectedCellIndex = null;
    this.showAnswer = false;
    this.cells = this.cells.map(() => {
      return { clicked: Math.random() > 0.5 };
    });
  }

  getCellColor(cell: any, index: number) {
    let color: null | string = null;
    color = cell.clicked ? 'blue' : 'white';
    if(this.showAnswer && index == this.selectedCellIndex) {
      color = 'red';
    }
    return color;
  }

  addRandomTrueToFalseValue() {
    const falseCells = this.cells.map((cell, index) => ({ index, clicked: cell.clicked }))
                                .filter(cell => !cell.clicked);

    if (falseCells.length > 0) {
      const randomCell = falseCells[Math.floor(Math.random() * falseCells.length)];
      this.cells[randomCell.index].clicked = true;
      this.selectedCellIndex = randomCell.index;
      console.log('this.selectedCellIndex: ', this.selectedCellIndex);
    }
  }
}
