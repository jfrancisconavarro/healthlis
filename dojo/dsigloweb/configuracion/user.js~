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
		padreConfUsr:null,
	   constructor: function()
	   {
	      padreConfUsr = this;	      
	   },
		contenedor: function ()
		{
			cp1 = new ContentPane({
	        region: "top",
	        style: "width: 90%; border: 0;",
	        id: "contconfusr",
	        content: "<div style='text-align: center;'><b>Configuración usuario</b></div>",
			},dojo.doc.createElement('div'));
			nodo=document.getElementById("cpescritorio");
	   	nodo.appendChild(cp1.domNode); 
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
		dialogo: function () {
			ddialog = new Dialog({
	         // Dialog title
	         title: "Advertencia",
	         style: "width:300px;"
        });
		},
		nombreusuario: function () 
		{
			enombre = new ComboBox({
	        type:"text",
	        name:"enombre",
	        id:"confusrenombre",
	        required:"true",
	        size:"30",
	        uppercase:true,
	        searchAttr:"name",
		  	  autocomplete:"true",
		  	  store: null,
	        missingMessage:"Falta Nombre"
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Nombre:"));
			efieldsetfiltro.domNode.appendChild(enombre.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
			//Eventos enombre
		   enombre.on("Change", function(evt)
			{
				if( enombre.get("value")>'' )
		  		{
				  	var store1 = null;    	
					request.post("/sweb",{
		 					handleAs: "json",
		 					data : { 
		 					 "c1" : dojo.cookie("c1"),
		 					 "c2" : dojo.cookie("c2"),
		 					 "c3" : "selusuariosdojonombre",
		 					 "enombre" : enombre.get("value")	             
			      	}
		 			}).then(function(datos){ 					
		 				/*store1 = new ItemFileReadStore({data: datos});
						if( tseguridad.get('store')=='' ) { tseguridad.store.close(); }
						tseguridad.set('store',store1);
						tseguridad._lastScrollTop=tseguridad.scrollTop;*/						
						if( datos.items.length>0 )
						{	
							edesc.set('value',datos.items[0].desc,false);
							egrupo.set('value',datos.items[0].grupo,false);
						}        							  
		 			},
		  			function(error)
		  			{
		 				console.log("Error grupo:"+error);
		 			});
		 		}	  
			}, true);
		},
		claveusuario: function () 
		{
				eclave = new ValidationTextBox({
		        type:"password",
		        name:"eclave",
		        id:"confusreclave",
		        required:"true",
		        size:"30",
		        missingMessage:"Falta Clave"
		   },dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Clave:"));
			efieldsetfiltro.domNode.appendChild(eclave.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
		},
		claveusuario2: function () 
		{
				eclave2 = new ValidationTextBox({
		        type:"password",
		        name:"eclave2",
		        id:"confusreclave2",
		        required:"true",
		        size:"30",
		        missingMessage:"Falta Clave"
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
		        id:"confusredesc",
		        required:"true",
		        size:"150",
		        style: "width:300px; border:1px solid #b7b7b7; background:#fff; margin:0 auto;",
		        missingMessage:"Falta Descripcion"
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Descripción:"));
			efieldsetfiltro.domNode.appendChild(edesc.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
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
				if( egrupo.get('store')=='' ) { egrupo.store.close(); }
				egrupo.set('store',store);
				egrupo._lastScrollTop=egrupo.scrollTop;		        					  
 			},
  			function(error)
  			{
 				console.log("Error demo2:"+error);
 			});
		},	
		listausuarios : function()
		{
			var store = null;    	
			request.post("/sweb",{
 					handleAs: "json",
 					data : { 
 					 "c1" : dojo.cookie("c1"),
 					 "c2" : dojo.cookie("c2"),
 					 "c3" : "selusuariosdojo"		             
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
		grupo: function () 
		{
			egrupo = new ComboBox({
		        name:"egrupo",
		        id:"confusregrupo",
		        searchAttr:"name",
	  			  autocomplete:"true",
	  			  store: null,
	  			  required:"true",
				  missingMessage:"Falta Grupo"
		   }, dojo.doc.createElement('select'));
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createTextNode("Grupo:"));
			efieldsetfiltro.domNode.appendChild(egrupo.domNode);
			efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
		},
		limpiar: function()
		{
			bcancelar = new Button({
				  type: "reset",
				  id: "confusrbcancelar",
		        label: "Limpiar",
		        onClick: function(){
		        	   
		        }
		   }, dojo.doc.createElement('input'));
			efieldsetfiltro.domNode.appendChild(bcancelar.domNode);			
		},	
		add: function()
		{
			badd = new Button({
				  type: "button",
				  id: "confusrbadd",
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
	    					 "c3" : "addusuario",
			             "enombre" : enombre.get("value"),
			             "eclave": eclave.get("value"),
			             "edesc" : edesc.get("value"),
							 "egrupo" : egrupo.get("value")
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
						  	egrupo.set('value','',false);
						  	padreConfUsr.listausuarios();
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
				  id: "confusrbdel",
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
	    					 "c3" : "delusuario",
			             "enombre" : enombre.get("value"),
			             "eclave": eclave.get("value"),
			             "edesc" : edesc.get("value"),
							 "egrupo" : egrupo.get("value")
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
						  	egrupo.set('value','',false);
						  	padreConfUsr.listausuarios();
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
			bpwd = new dijit.form.Button({
				  type: "button",
				  id: "confusrbpwd",
		        label: "Cambiar Clave"
		   }, dojo.doc.createElement('input'));
		   efieldsetfiltro.domNode.appendChild(bpwd.domNode);
		   efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("div"));
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
	    					 "c3" : "pwdusuario",
			             "enombre" : enombre.get("value"),
			             "eclave": eclave.get("value"),
			             "edesc" : edesc.get("value"),
							 "egrupo" : egrupo.get("value")
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
						  	egrupo.set('value','',false);
						  	padreConfUsr.listausuarios();
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
		inicio: function () 
		{
			this.contenedor();
			this.efield();
			this.nombreusuario();
			this.claveusuario();
			this.claveusuario2();
			this.descripcion();
			this.grupo();			
			this.limpiar();
			this.add();
			this.del();
			this.pwd();
			this.dialogo();
			this.listausuarios();
			this.listagrupos();
		}
	});
});