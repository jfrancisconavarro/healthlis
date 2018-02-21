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
"dojo/on",
"dojo/domReady!"], function(declare,ContentPane,BorderContainer,Fieldset,dojo,ValidationTextBox,Button,DataGrid,i18n,Standby,ItemFileReadStore,request,on)
{
	//var privateValue = 0;
	return declare(null, 
	{
		padreResultados:null,
	   constructor: function()
	   {
	      padreResultados = this;	      
	   },
	   contenedor: function () 
	   {
			cp1 = new ContentPane({
        		region: "top",
        		id: "rescont",
        		content: "<div style='text-align: center;'><b>Acceso a Resultados</b></div><br>",
        		style: "padding: 10px;"
			},dojo.doc.createElement('div'));
			nodo=document.getElementById("cpescritorio");
	   	nodo.appendChild(cp1.domNode); 
		},
		efield: function () 
		{
		efieldsetfiltro = new Fieldset({
			title: "Filtro",
			style: "width:50%; padding: 10px; margin: auto auto auto 100px;"
		});
		
		/*	
		efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Nombre:"));
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));*/	
		cp1.addChild(efieldsetfiltro);	
		},
		sid: function () 
		{
			eanalisis = new ValidationTextBox({
		        type:"text",
		        name:"reseanalisis",
		        id:"reseanalisis",
		        required:"false",
		        size:"10",
		        missingMessage:"Falta Análisis"
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Análisis:"));
			efieldsetfiltro.domNode.appendChild(eanalisis.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
			//Eventos eanalisis
		   eanalisis.on("KeyUp", function(evt)
			{
				if(evt.keyCode==13)
       		{
     	  			 var store = null;
		          request.post("/sweb",{
    					handleAs: "json",
    					preventCache: true,
    					data : { 
    					 "c1" : dojo.cookie("c1"),
    					 "c2" : dojo.cookie("c2"),
    					 "c3" : "lstressid",
		             "edato" : eanalisis.get("value"),
		             "efiltro" : dojo.cookie("filtro")
		          }
    				}).then(function(datos){
    					store = new ItemFileReadStore({data: datos});
						if( tmonitor.get('store')=='' ) { tmonitor.store.close(); }
					   tmonitor.setStore(store);
					   tmonitor._lastScrollTop=tmonitor.scrollTop;
						tmonitor._refresh();
    				},
     				function(error)
     				{
    						console.log("Eror:"+error);
    				});				
       		}
			}, true);
		},
		pid: function () 
		{
			epid = new ValidationTextBox({
		        type:"text",
		        name:"resepid",
		        id:"resepid",
		        required:"false",
		        size:"10",
		        missingMessage:"Falta DNI"
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("D.N.I:"));
			efieldsetfiltro.domNode.appendChild(epid.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
			//Eventos epid
		   epid.on("KeyUp", function(evt)
			{
				if(evt.keyCode==13)
       		{
					 var store = null;
		          request.post("/sweb",{
    					handleAs: "json",
    					preventCache: true,
    					data : { 
    					 "c1" : dojo.cookie("c1"),
    					 "c2" : dojo.cookie("c2"),
    					 "c3" : "lstrespid",
		             "edato" : epid.get("value"),
		             "efiltro" : dojo.cookie("filtro")
		          }
    				}).then(function(datos){
    					store = new ItemFileReadStore({data: datos});
						if( tmonitor.get('store')=='' ) { tmonitor.store.close(); }
					   tmonitor.setStore(store);
					   tmonitor._lastScrollTop=tmonitor.scrollTop;
						tmonitor._refresh();
    				},
     				function(error)
     				{
    						console.log("Eror:"+error);
    				});
       		}
			}, true);
		},
		nombre: function () 
		{
			enombre = new ValidationTextBox({
		        type:"text",
		        name:"resenombre",
		        id:"resenombre",
		        required:"false",
		        size:"10",
		        missingMessage:"Falta Nombre"		        
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Nombre:"));
			efieldsetfiltro.domNode.appendChild(enombre.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
			//Eventos enombre
		   enombre.on("KeyUp", function(evt)
			{
				if(evt.keyCode==13)
       		{
						var store = null;
		          request.post("/sweb",{
    					handleAs: "json",
    					preventCache: true,
    					data : { 
    					 "c1" : dojo.cookie("c1"),
    					 "c2" : dojo.cookie("c2"),
    					 "c3" : "lstresname",
		             "edato" : enombre.get("value"),
		             "efiltro" : dojo.cookie("filtro")
		          }
    				}).then(function(datos){
    					//console.log(datos);
    					store = new ItemFileReadStore({data: datos });
						if( tmonitor.get('store')=='' ) { tmonitor.store.close(); }
					   tmonitor.setStore(store);
					   tmonitor._lastScrollTop=tmonitor.scrollTop;
						tmonitor._refresh();
    				},
     				function(error)
     				{
    						console.log("Eror:"+error);
    				});							
       		}
			}, true);
		},
		baceptar:function () 
		{
			aceptar = new Button({
				label: "Aceptar",
				type: "button"				
			});
			efieldsetfiltro.domNode.appendChild(aceptar.domNode);			
		},
		bcancelar:function () 
		{
			cancelar = new Button({
				label: "Cancelar",
				type: "reset"
			});
			efieldsetfiltro.domNode.appendChild(cancelar.domNode);
		},
		resultados: function () 
		{
			tmonitor = new DataGrid({
		     id:"restmonitor",
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
			

			tmonitor.on("RowDblClick", function(evt)
			{				
				var navegador = "";
				var idx = evt.rowIndex;
				console.log(idx);
				rowData = tmonitor.getItem(idx);
				//Detectar navegador
				var sAgent = window.navigator.userAgent;
  				var Idx = sAgent.indexOf("MSIE");
  				if (Idx > 0){ navegador="ie"; }
  				else if (!!navigator.userAgent.match(/Trident\/7\./)){ navegador="ie11"; }
  				else{ navegador="otro"; }
  				
  				
				request.post("/sweb",{
    					handleAs: "html",
    					data : { 
    					 "c1" : dojo.cookie("c1"),
    					 "c2" : dojo.cookie("c2"),
    					 "c3" : "vpdf",
		             "esid" : rowData.cc1,
		             "efecha" : rowData.cc2,
				       "efiltro" : dojo.cookie("filtro"),
				       "nav" : navegador
		          }
    				}).then(function(datos){

  						if( navegador == 'ie' || navegador == 'ie11' )
  						{
  							console.log("IEXPLORER");
							console.log(datos);  							
  							var shtml = "<html>\n";
							shtml += "<head>\n";
							shtml += "<title>"+ rowData.cc1 + " - " + rowData.cc2 + "</title>\n";
							shtml += "</head>\n";
							shtml += "<body>\n";							
							shtml += "</html>\n";
							//console.log(shtml);
  							var w = window.open(datos);
    						w.document.open();
    						w.document.write(shtml);
    						w.document.close(); 
  						}  						
  						else
  						{
  							console.log("otro");
  							var shtml = "<html>\n";
							shtml += "<head>\n";
							shtml += "<title>"+ rowData.cc1 + " - " + rowData.cc2 + "</title>\n";
							shtml += "</head>\n";
							shtml += "<body>\n";
							shtml += "<object>";
							shtml += "<embed src=\"";
							shtml += datos;
							shtml += "\" height=\"100%\" width=\"100%\"/>";
							shtml += "</object>";
							shtml += "</body>\n";
							shtml += "</html>\n";
							//console.log(shtml);
  							var w = window.open(datos);
    						w.document.open();
    						w.document.write(shtml);
    						w.document.close(); 
  						}    						
    				},
     				function(error)
     				{
    						console.log("Eror:"+error);
    				});
				
			}, true);

			cp1.addChild(tmonitor);
			tmonitor.startup();
		},
		leyenda: function () 
	   {
			cp2 = new ContentPane({
        		region: "top",
        		id: "resleyenda",
        		content: "<div><img class='imagno'/>Pendiente</div><div>Terminado<img class='imagok'/></div><div><img class='imagprn'/>Impreso</div></div>",
        		style: "padding: 5px;border-bottom: 2px solid ;"
			},dojo.doc.createElement('div'));
			cp1.domNode.appendChild(dojo.doc.createElement("p"));
			
			cp1.addChild(cp2);
		},
		inicio: function () 
		{
			//this.util();
			this.contenedor();
			this.efield();
			this.sid();
			this.pid();
			this.nombre();			
			this.resultados();
			this.leyenda();
			cp1.startup();
		}
	});
});