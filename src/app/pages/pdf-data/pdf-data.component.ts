import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

import fakeData from '../../../assets/fake-data.json';
// TODO: VER EJEMPLOS DE CÓDIGO EN https://github.com/simonbengtsson/jsPDF-AutoTable/blob/master/examples/examples.js
// TODO: VER EJEMPLOS GRÁFICOS EN https://simonbengtsson.github.io/jsPDF-AutoTable/#

@Component({
  selector: 'vex-pdf-data',
  templateUrl: './pdf-data.component.html',
  styleUrls: ['./pdf-data.component.scss']
})
export class PdfDataComponent implements OnInit {
  dataPDF: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.dataPDF = fakeData;
    console.log("dataPDF", this.dataPDF);
  }

  exportToPDFFromHTML(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      html: '#htmltable', // CAPTURA ELEMENTO <table>
    });
    doc.save('table-from-html.pdf'); // CREAR PDF
  }

  exportToPDFWithCSS(): void {
    const doc = new jsPDF();
    doc.text('Tabla a PDF con estilos CSS', 14, 20); // AGREGANDO TITULO A PDF
    autoTable(doc, {
      startY: 30, // INICIO DE PÁGINA EN TAMAÑO VERTICAL (PARA NO SOLAPAR EL TITULO)
      html: '#htmltable', // CAPTURA ELEMENTO <table>
      useCss: true // APLICAR CSS DE HTML (ESTILOS BÀSICOS SOLAMENTE)
    });
    doc.save('table-css.pdf'); // CREAR PDF
  }

  exportToPDFWithGlobalProps(): void {
    const doc = new jsPDF();
    doc.text('Tabla a PDF con propiedades predeterminadas (plain, grid y striped)', 14, 20); // AGREGANDO TITULO A PDF
    autoTable(doc, {
      startY: 30, // INICIO DE PÁGINA EN TAMAÑO VERTICAL (PARA NO SOLAPAR EL TITULO)
      html: '#htmltable', // CAPTURA ELEMENTO <table>
      theme: 'plain' // TEMA/TIPO DE TABLA PRE-CONFIGURADO (plain, por defecto)
    });
    autoTable(doc, {
      html: '#htmltable', // CAPTURA ELEMENTO <table>
      theme: 'grid' // TEMA/TIPO DE TABLA PRE-CONFIGURADO (grid)
    });
    // AUTOMÁTICAMENTE DETECTA LA TABLA ANTERIOR Y SE AGREGA UN ESPACIO
    autoTable(doc, {
      html: '#htmltable', // CAPTURA ELEMENTO <table>
      theme: 'striped' // TEMA/TIPO DE TABLA PRE-CONFIGURADO (striped)
    });
    doc.save('table-with-global-props.pdf'); // CREAR PDF
  }

  exportToPDFFromDataSource(): void {
    const doc = new jsPDF();
    doc.text('Tabla a PDF a partir de un array', 14, 20); // AGREGANDO TITULO A PDF
    const headerDataSource = [Object.keys(this.dataPDF[0])]; // CABECERA DE TABLA (VER ESTRUCTURA EN DOCS; EJM: ['id', 'name'])
    console.log("headerDataSource", headerDataSource);
    const bodyDataSource = this.dataPDF.map(item => Object.values(item)); // CABECERA DE TABLA (VER ESTRUCTURA EN DOCS; EJM: [['1', 'pepe'], ['2', 'bob'], ['3', 'leo']])
    console.log("bodyDataSource", bodyDataSource);
    const totalPagesExp = '{total_pages_count_string}'; // EXPRESIÓN PROPIA DE LIBRERÍA PARA EL FOOTER, NO CAMBIAR
    autoTable(doc, {
      startY: 30, // INICIO DE PÁGINA EN TAMAÑO VERTICAL (PARA NO SOLAPAR EL TITULO)
      head: headerDataSource,
      body: bodyDataSource,
      didDrawPage: data => {
        // INICIO ARMADO FOOTER PDF
        let str = 'Página ' + doc.getNumberOfPages();
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' de ' + totalPagesExp;
        }

        doc.setFontSize(10); // DEFINIR TAMAÑO TEXTO DE FOOTER
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.right, pageHeight - 10); // AGREGAR TEXTO DE FOOTER A PDF CON MARGENES ESPECÍFICOS
        // FIN ARMADO FOOTER PDF
      }
    });

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp); // AGREGAR TEXTO DE FOOTER A TODAS LAS PÁGINAS
    }

    doc.save('table-from-datasource.pdf'); // CREAR PDF
  }
}
