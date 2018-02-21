define(["dojo/_base/declare",
"dijit/layout/ContentPane",
"dijit/layout/BorderContainer",
"dijit/Fieldset",
"dojo",
"dijit/form/ValidationTextBox",
"dijit/form/Button",
"dojox/grid/DataGrid",
"dojo/i18n!dsigloweb/nls/menu",
"dojox/widget/Standby",
"dojo/data/ItemFileReadStore",
"dojo/request",
"dojox/timing",
"dojo/on",
"dojo/domReady!"], function(declare,ContentPane,BorderContainer,Fieldset,dojo,ValidationTextBox,Button,DataGrid,i18n,Standby,ItemFileReadStore,request,timing,on)
{
	reloj = new timing.Timer();
	return declare(null, 
	{
		padreMonitor:null,
  		contenedor:function () 
		{
			padreMonitor = this;
			cp1 = new ContentPane({
        		region: "top",
        		id: "cpmon",
        		content: "<div style='text-align: center;'><b>Monitor</b></div>"
				},dojo.doc.createElement('div'));
			nodo=document.getElementById("cpescritorio");
	   	nodo.appendChild(cp1.domNode); 
		},
		tiempo:function ( p ) 
		{
			if( p=="" )
			{
				//reloj.setInterval(300000);												
				reloj.setInterval(5000);
			}
			else 
			{
				reloj.setInterval(p*60000);	
			}        
			reloj.onTick = function()
			{
 				padreMonitor.xhr();
			}
			reloj.onStart = function()
			{
 				padreMonitor.xhr();
			}				
		},
		bcomenzar:function () 
		{
			comenzar = new Button({
				label: "Comenzar",
				type: "button"
			});		
			cp1.addChild(comenzar);
			//Eventos mres
		   comenzar.on("Click", function(evt)
			{
				reloj.stop();
				padreMonitor.tiempo( eintervalo.get('value') );		
				reloj.start();	
			}, true);
		},
		bparar:function () 
		{
			cancelar = new Button({
				label: "Parar",
				type: "reset"
			});
			cp1.addChild(cancelar);
			//Eventos mres
		   cancelar.on("Click", function(evt)
			{
				reloj.stop(); 
			}, true);
		},
		intervalo:function () 
		{
			eintervalo = new ValidationTextBox({
		        type:"text",
		        name:"moneintervalo",
		        id:"moneintervalo",
		        required:"true",
		        size:"25",
		        style: "width:8em;",
		        missingMessage:"Falta Intervalo"
				  
		   }, dojo.doc.createElement('input'));
			cp1.addChild(eintervalo);
			dojo.place('<label for="eintervaloa">Refresco: </label>', dojo.byId('widget_moneintervalo'), 'before');
			dojo.place('<label for="eintervalod">Minutos</label>', dojo.byId('widget_moneintervalo'), 'after');			
		},
		monitor: function () 
		{
			tmonitor = new DataGrid({
		     id:"montmonitor",
			  //style: "width: 100%; height: 15em;",
			  escapeHTMLInData: false,
			  structure: [
			    { name: "Id", field: "cid", width: "5%" },
			    { name: "Tubo", field: "cc1", width: "15%" },
			    { name: "Fecha", field: "cc2", width: "10%" },
			    { name: "Nombre", field: "cc3", width: "50%" },			   
			    { name: "PDF", field: "cc4", width: "10%" },
			    { name: "Estado", field: "cc5", width: "10%" }
			  ],
			  rowSelector: '20px'
			});
			cp1.domNode.appendChild(dojo.doc.createElement("p"));
			
			cp1.addChild(tmonitor);
			//Eventos tmonitor
		   tmonitor.on("RowDblClick", function(evt)
			{
				var idx = evento.rowIndex;
				item = tmonitor.getItem(idx);
				//alert(this.store.getValue(item, "cc1"));
				request.post("/sweb",{
 					handleAs: "html",
 					data : { 
 					 "c1" : dojo.cookie("c1"),
 					 "c2" : dojo.cookie("c2"),
 					 "c3" : "vpdf",
	             "esid" : this.store.getValue(item, "cc1"),
	             "efecha" : this.store.getValue(item, "cc2"),
			       "efiltro" : dojo.cookie("filtro")
	          }
 				}).then(function(datos){
 					//console.log(datos);
					//window.open(datos);
					var w = window.open();
 					w.document.open();
 					w.document.write(datos);
 					w.document.close();
 				},
  				function(error)
  				{
 						console.log("Eror:"+error);
 				}); 
			}, true);
		},
		leyenda: function () 
	   {
			cp2 = new ContentPane({
        		region: "top",
        		id: "monleyenda",
        		content: "<div><img class='imagno'/>Pendiente</div><div>Terminado<img class='imagok'/></div><div><img class='imagprn'/>Impreso</div></div>",
        		style: "padding: 5px;border-bottom: 2px solid ;"
			},dojo.doc.createElement('div'));
			cp1.domNode.appendChild(dojo.doc.createElement("p"));
			
			cp1.addChild(cp2);
		},
		xhr: function () 
		{
			standby.show();
			request.post("/sweb",{
				handleAs: "html",
 				data : { 
 					"c1" : dojo.cookie("c1"),
 					"c2" : dojo.cookie("c2"),
 					"c3" : "pendientes",
		       	"efiltro" : dojo.cookie("filtro")
          		}
 			}).then(function(datos){
 				console.log("datos");
		    	store = new ItemFileReadStore({data: dojo.fromJson(datos) });
   			if( tmonitor.get('store')=='' ) { tmonitor.store.close(); }
				tmonitor.setStore(store);
				tmonitor._lastScrollTop=tmonitor.scrollTop;
				tmonitor._refresh();
 			},
  			function(error)
  			{
				console.log("Eror:"+error);
 			});
 			standby.hide();
		},
		espera: function()
		{
			standby = new Standby({
				target: "cp1sol",
	          color: "#333",
	          opacity: 0 
	        });			
		   document.body.appendChild(standby.domNode);
		   standby.startup();
		},
		inicio: function () 
		{
			this.contenedor();
			this.intervalo();
			this.bcomenzar();
			this.bparar();				
			this.monitor();
			this.leyenda();
			cp1.startup();
		}
	});
});