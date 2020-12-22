let arrayMunicipios = [];

class Municipios {
    constructor(nombre,imagen,habitantes){

        this.nombre = nombre;
        this.imagen = imagen;
        this.habitantes = habitantes;
    }
}

const trearDatos = () =>{

    axios.get("../data/municipis.json",{

        responseType: 'json'
    })
    .then(function(res){

        if (res.status == 200) {

            pintarDatos(res.data.elements);

        }

    })
    .catch(function(err) {

        console.log(err);
    })

}

const pintarDatos = (datos) =>{

    for(let data of datos){

        arrayMunicipios.push(new Municipios(data.municipi_nom,data.municipi_escut,data.nombre_habitants));
    }

    chartfunction(arrayMunicipios);
}
 
const chartfunction = (arrayMunicipios) =>{

    let chartsDatos = [];

    let objectMunicipio = {};

    for(let datos of arrayMunicipios){

        objectMunicipio= {
            country: datos.nombre,
            visits: datos.habitantes
        }

        chartsDatos.push(objectMunicipio);
    }

    console.log(chartsDatos);
    //chart.data = chartsDatos;

    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.scrollbarX = new am4core.Scrollbar();
        
        // Add data
        chart.data = chartsDatos;
        
        // Create axes
        
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 140;
        
        categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
          if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 20;
          }
          return dy;
        });
        
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "visits";
        series.dataFields.categoryX = "country";
        series.name = "Visits";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        
        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 1;
        columnTemplate.strokeOpacity = 1;
        
        }); // end am4core.ready()

}//fin const chartfunction


