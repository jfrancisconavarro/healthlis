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
"dijit/form/ComboBox",
"dijit/Fieldset",
"dojox/widget/Dialog",
"dojo/on",
"dojo/domReady!"], function(declare,ContentPane,BorderContainer,Fieldset,dojo,ValidationTextBox,Button,DataGrid,i18n,Standby,ItemFileReadStore,request,ComboBox,Fieldset,Dialog,on)
{
	//var privateValue = 0;
	return declare(null, 
	{
		padreConfGrp:null,
		constructor: function()
	   {
	      padreConfGrp = this;	      
	   },
		contenedor: function ()
		{
			cp1 = new ContentPane({
	        region: "top",
	        style: "width: 90%; border: 0;",
	        id: "contconfgrp",
	        content: "<div style='text-align: center;'><b>Configuración Grupo</b></div>",
			},dojo.doc.createElement('div'));
			nodo=document.getElementById("cpescritorio");
	   	nodo.appendChild(cp1.domNode);		   		   
		},
		dialogo: function () {
			ddialog = new Dialog({
	         // Dialog title
	         title: "Advertencia",
	         style: "width:300px;"
        });
		},
		efield: function () 
		{
			efieldsetfiltro = new Fieldset({
				title: "Filtro",				
				style: "width:50%; padding: 10px; margin: auto auto auto 100px;",
				toggleable:false
			});
			cp1.addChild(efieldsetfiltro);	
		},
		listagrupos : function()
		{
			var store = null;    	
			request.post("/sweb",{
 					handleAs: "json",
 					data : { 
 					 "c1" : dojo.cookie("c1"),
 					 "c2" : dojo.cookie("c2"),
 					 "c3" : "selgruposdojo"		             
	      	}
 			}).then(function(datos){ 					
 				store = new ItemFileReadStore({data: datos});
				if( enombre.get('store')=='' ) { enombre.store.close(); }
				enombre.set('store',store);
				enombre._lastScrollTop=enombre.scrollTop;		        					  
 			},
  			function(error)
  			{
 				console.log("Error demo2:"+error);
 			});
		},		
		nombregrupo: function () 
		{   				       
			enombre = new ComboBox({
			  type:"text",
			  name:"enombre",
			  searchAttr:"name",
			  autocomplete:"true",
			  store: null,
			  id:"confgrpenombre",
			  required:"true",
			  size:"30",
			  uppercase:true,
			  missingMessage:"Falta Nombre Grupo"			  
			}, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Nombre:"));
			efieldsetfiltro.domNode.appendChild(enombre.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
			//Eventos enombre
		   enombre.on("Change", function(evt)
			{
				if( enombre.get("value")>'' )
		  		{
				  	 	
					request.post("/sweb",{
		 					handleAs: "json",
		 					data : { 
		 					 "c1" : dojo.cookie("c1"),
		 					 "c2" : dojo.cookie("c2"),
		 					 "c3" : "selgruposdojonombre",
		 					 "egrupo" : enombre.get("value")	             
			      	}
		 			}).then(function(datos){					
		 										
						if( datos.items.length>0 )
						{	
							 
							edesc.set('value',datos.items[0].desc,false);
							econd.set('value',datos.items[0].cond,false);
							request.post("/sweb",{
		 					handleAs: "json",
		 					data : { 
		 					 "c1" : dojo.cookie("c1"),
		 					 "c2" : dojo.cookie("c2"),
		 					 "c3" : "selsecgrupo",
		 					 "egrupo" : enombre.get("value")	             
			      		}
		 					}).then(function(datos2){
		 						
		 						var store1 = null;  
		 						store1 = new ItemFileReadStore({data: datos2});
								if( tseguridad.get('store')=='' ) { tseguridad.store.close(); }
								tseguridad.set('store',store1);									
								tseguridad._lastScrollTop=tseguridad.scrollTop;
								tseguridad._refresh();
		 					},
				  			function(error2)
				  			{
				 				console.log("Error grupo:"+error);
				 			});
						}        							  
		 			},
		  			function(error)
		  			{
		 				console.log("Error grupo:"+error);
		 			});
		 		}	  
			}, true);
		   
		},
		clavegrupo: function () 
		{
			eclave = new ValidationTextBox({
	        type:"password",
	        name:"eclave",
	        id:"confgrpeclave",
	        required:"true",
	        size:"30",
	        missingMessage:"Falta Clave Grupo"
		   },dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Clave:"));
			efieldsetfiltro.domNode.appendChild(eclave.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
		},
		clavegrupo2: function () 
		{
			eclave2 = new ValidationTextBox({
	        type:"password",
	        name:"eclave2",
	        id:"confgrpeclave2",
	        required:"true",
	        size:"30",
	        missingMessage:"Falta Clave Grupo"
		   },dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Clave:"));
			efieldsetfiltro.domNode.appendChild(eclave2.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
		},
		descripcion: function () 
		{
			edesc = new ValidationTextBox({
	        type:"text",
	        name:"edesc",
	        id:"confgrpedesc",
	        required:"true",
	        size:"150",
	        style: "width:300px; border:1px solid #b7b7b7; background:#fff; margin:0 auto;",
	        missingMessage:"Falta Descripcion Grupo"
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Descripción:"));
			efieldsetfiltro.domNode.appendChild(edesc.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
		},	
		condicion: function () 
		{
			econd = new ValidationTextBox({
	        type:"text",
	        name:"econd",
	        id:"confgrpecond",
	        size:"150",
	        style: "width:300px; border:1px solid #b7b7b7; background:#fff; margin:0 auto;",
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Condición:"));
			efieldsetfiltro.domNode.appendChild(econd.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
		},	
		add: function()
		{
			badd = new Button({
			  type: "button",
			  id: "confgrpbadd",
	        label: "Añadir"
		   }, dojo.doc.createElement('input'));
			efieldsetfiltro.domNode.appendChild(badd.domNode);
			//Eventos badd
		   badd.on("Click", function(evt)
			{
				if( eclave.validate() && eclave2.validate() && enombre.validate() && edesc.validate() )
        	   {
        	   	if( eclave.get("value")!=eclave2.get("value") )
        	   	{        	   			 
				        ddialog.set("content","Las claves no coinciden");
				        ddialog.show();
        	   	}
        	   	else
        	   	{
			          request.post("/sweb",{
	    					handleAs: "json",
	    					data : { 
	    					 "c1" : dojo.cookie("c1"),
	    					 "c2" : dojo.cookie("c2"),
	    					 "c3" : "addgruposec",
			             "egrupo" : enombre.get("value"),
			             "eclave": eclave.get("value"),
			             "edesc" : edesc.get("value"),
							 "econd" : econd.get("value")
			          }
	    				}).then(function(datos){
	    					
				        ddialog.set("content",datos.message);
				        ddialog.show();
						  if(datos.status=='si')
						  {
						  	enombre.set('value','',false);
						  	eclave.set('value','',false);
						  	eclave2.set('value','',false);
						  	edesc.set('value','',false);
						  	econd.set('value','',false);
						  	padreConfGrp.listagrupos();
						  }							  
	    				},
	     				function(error)
	     				{
	    					ddialog.set("content",error);
				         ddialog.show();
	    				});	  
				   }	            
	         } 
			}, true);
		},	
		del: function()
		{
			bdel = new Button({
			  type: "button",
			  id: "confgrpbdel",
	        label: "Eliminar"
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(bdel.domNode);
		   //Eventos bdel
		   bdel.on("Click", function(evt)
			{
				if( eclave.validate() && eclave2.validate() && enombre.validate() && edesc.validate() )
        	   {
        	   	if( eclave.get("value")!=eclave2.get("value") )
        	   	{
     	   			ddialog.set("content","Las claves no coinciden");
				      ddialog.show();
        	   	}
        	   	else
        	   	{
			          request.post("/sweb",{
	    					handleAs: "json",
	    					data : { 
	    					 "c1" : dojo.cookie("c1"),
	    					 "c2" : dojo.cookie("c2"),
	    					 "c3" : "delgruposec",
			             "egrupo" : enombre.get("value"),
			             "eclave": eclave.get("value")
			          }
	    				}).then(function(datos){
	    					ddialog.set("content",datos.message);
				         ddialog.show();
						  if(datos.status=='si')
						  {
						  	enombre.set('value','',false);
						  	eclave.set('value','',false);
						  	eclave2.set('value','',false);
						  	edesc.set('value','',false);
						  	econd.set('value','',false);
						  	padreConfGrp.listagrupos();
						  }							  
	    				},
	     				function(error)
	     				{
	    					ddialog.set("content",error);
				         ddialog.show();
	    				});	  
				   }	            
	         }
			}, true);
		},	
		pwd: function()
		{
			bpwd = new Button({
			  type: "button",
			  id: "confgrpbpwd",
	        label: "Cambiar Clave"
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(bpwd.domNode);
			//Eventos bpwd
		   bpwd.on("Click", function(evt)
			{
				if( eclave.validate() && eclave2.validate() && enombre.validate() && edesc.validate() )
        	   {
        	   	if( eclave.get("value")!=eclave2.get("value") )
        	   	{
     	   			ddialog.set("content","Las claves no coinciden");
				      ddialog.show();
        	   	}
        	   	else
        	   	{
			          request.post("/sweb",{
	    					handleAs: "json",
	    					data : { 
	    					 "c1" : dojo.cookie("c1"),
	    					 "c2" : dojo.cookie("c2"),
	    					 "c3" : "pwdgruposec",
			             "egrupo" : enombre.get("value"),
			             "eclave": eclave.get("value")
			          }
	    				}).then(function(datos){
	    					ddialog.set("content",datos.message);
				         ddialog.show();
						  if(datos.status=='si')
						  {
						  	enombre.set('value','',false);
						  	eclave.set('value','',false);
						  	eclave2.set('value','',false);
						  	edesc.set('value','',false);
						  	econd.set('value','',false);
						  }							  
	    				},
	     				function(error)
	     				{
	    					ddialog.set("content",error);
				         ddialog.show();
	    				});	  
				   }	            
	         }
			}, true);
		},	
		seguridad: function () 
		{	  		
		   tseguridad = new DataGrid({
		     id:"tseguridad",
			  style: "width: 45em; height: 15em;",
			  structure: [
			    { name: "Id", field: "cid", width: "5%", editable: true },
			    { name: "Etiqueta", field: "etiqueta", width: "25%", editable: true },
			    { name: "Propiedad", field: "propiedad", width: "25%", editable: true },
			    { name: "Valor", field: "valor", width: "25%", editable: true }
			  ],
			  rowSelector: '20px'
			},dojo.doc.createElement('div'));
			efieldsetfiltro.domNode.appendChild(tseguridad.domNode);
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
			tseguridad.startup();
		}, 
		limpiar: function()
		{
			bcancelar = new Button({
			  type: "reset",
			  id: "confgrpbcancelar",
	        label: "Limpiar",
	        onClick: function(){
	        	   enombre.set('value','',false);
				  	eclave.set('value','',false);
				  	eclave2.set('value','',false);
				  	edesc.set('value','',false);
				  	econd.set('value','',false);
	        }
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(bcancelar.domNode);
		},	
		inicio: function () 
		{
			this.contenedor();
			this.efield();
			this.nombregrupo();
			this.listagrupos();
			this.clavegrupo();
			this.clavegrupo2();
			this.descripcion();
			this.condicion();
			this.seguridad();
			this.add();
			this.del();
			this.pwd();
			this.limpiar();
			this.dialogo();		
		}
	});
});